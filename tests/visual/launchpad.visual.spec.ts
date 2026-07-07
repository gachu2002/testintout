import type { Locator, Page } from '@playwright/test';
import { expect, test } from '@playwright/test';

import type {
  VisualAction,
  VisualAttributeExpectation,
  VisualLinkExpectation,
  VisualLocatorTextExpectation,
} from './visualTargets';
import { visualTargets } from './visualTargets';

const strictScreenshots = process.env.VISUAL_STRICT === '1';

for (const target of visualTargets) {
  test(target.trackerRow, async ({ browser, page }, testInfo) => {
    if (target.timeout) {
      testInfo.setTimeout(target.timeout);
    }

    const reactRequests = collectApiRequests(page);

    await page.goto(target.route);
    await page.waitForLoadState('networkidle');

    for (const action of target.reactActions ?? []) {
      await runReactAction(page, action);
    }

    const reactSection = page.locator(target.reactSelector);
    await expect(reactSection, `${target.name} should render in React`).toBeVisible();

    for (const text of target.expectedReactText) {
      await expect(reactSection).toContainText(text);
    }

    await expectLocatorText(reactSection, target.expectedReactLocatorText ?? []);
    await expectLinks(reactSection, target.expectedReactLinks ?? []);
    await expectAttributes(reactSection, target.expectedReactAttributes ?? []);

    await reactSection.screenshot({
      animations: 'disabled',
      path: testInfo.outputPath(`${target.slug}-react.png`),
    });

    if (target.reactDetailSelector) {
      for (const action of target.reactDetailActions ?? []) {
        await runReactAction(page, action);
      }

      const reactDetail = page.locator(target.reactDetailSelector).first();
      await expect(reactDetail, `${target.name} detail should render in React`).toBeVisible();

      for (const text of target.expectedReactDetailText ?? []) {
        await expect(reactDetail).toContainText(text);
      }

      await reactDetail.screenshot({
        animations: 'disabled',
        path: testInfo.outputPath(`${target.slug}-react-detail.png`),
      });
    }

    expectRequests(reactRequests, target.expectedReactRequests ?? [], target.name, 'React');

    const referenceContext = await browser.newContext({ viewport: { height: 1000, width: 1440 } });
    const referencePage = await referenceContext.newPage();
    const referenceRequests = collectApiRequests(referencePage);

    try {
      await referencePage.goto(target.referenceUrl);
      await referencePage.waitForLoadState('networkidle');

      for (const action of target.referenceActions ?? []) {
        await runReferenceAction(referencePage, action);
      }

      const referenceSection = referencePage.locator(target.referenceSelector).first();
      await expect(referenceSection, `${target.name} should render in reference`).toBeVisible();

      for (const text of target.expectedReferenceText) {
        await expect(referenceSection).toContainText(text);
      }

      await expectLocatorText(referenceSection, target.expectedReferenceLocatorText ?? []);
      await expectLinks(referenceSection, target.expectedReferenceLinks ?? []);
      await expectAttributes(referenceSection, target.expectedReferenceAttributes ?? []);

      await referenceSection.screenshot({
        animations: 'disabled',
        path: testInfo.outputPath(`${target.slug}-reference.png`),
      });

      if (target.referenceDetailSelector) {
        for (const action of target.referenceDetailActions ?? []) {
          await runReferenceAction(referencePage, action);
        }

        const referenceDetail = referencePage.locator(target.referenceDetailSelector).first();
        await expect(
          referenceDetail,
          `${target.name} detail should render in reference`,
        ).toBeVisible();

        for (const text of target.expectedReferenceDetailText ?? []) {
          await expect(referenceDetail).toContainText(text);
        }

        await referenceDetail.screenshot({
          animations: 'disabled',
          path: testInfo.outputPath(`${target.slug}-reference-detail.png`),
        });
      }

      expectRequests(
        referenceRequests,
        target.expectedReferenceRequests ?? [],
        target.name,
        'reference',
      );
    } finally {
      await referenceContext.close();
    }

    if (strictScreenshots) {
      await expect(reactSection).toHaveScreenshot(`${target.slug}-react.png`);
    }
  });
}

function collectApiRequests(page: Page) {
  const requests = new Set<string>();

  page.on('request', (request) => {
    try {
      const url = new URL(request.url());
      if (!url.pathname.startsWith('/api/')) return;

      requests.add(`${request.method()} ${url.pathname}`);
      requests.add(`${request.method()} ${url.pathname}${url.search}`);
    } catch {
      // Ignore non-standard browser request URLs.
    }
  });

  return requests;
}

function expectRequests(
  requests: Set<string>,
  expectedRequests: string[],
  targetName: string,
  surface: string,
) {
  const actualRequests = Array.from(requests).sort();

  for (const expectedRequest of expectedRequests) {
    expect(
      actualRequests,
      `${targetName} should request ${expectedRequest} in ${surface}`,
    ).toContain(expectedRequest);
  }
}

async function expectAttributes(section: Locator, attributes: VisualAttributeExpectation[]) {
  for (const attributeExpectation of attributes) {
    const element = section.locator(attributeExpectation.selector).first();

    await expect(element, `${attributeExpectation.label} should render`).toBeVisible();
    await expect(element, `${attributeExpectation.label} should match`).toHaveAttribute(
      attributeExpectation.attribute,
      attributeExpectation.value,
    );
  }
}

async function expectLocatorText(section: Locator, locators: VisualLocatorTextExpectation[]) {
  for (const locatorExpectation of locators) {
    const element = section.locator(locatorExpectation.selector).first();

    await expect(element, `${locatorExpectation.label} should render`).toBeVisible();
    await expect(element, `${locatorExpectation.label} should match`).toHaveText(
      locatorExpectation.text,
    );
  }
}

async function expectLinks(section: Locator, links: VisualLinkExpectation[]) {
  for (const linkExpectation of links) {
    const sectionHref = await section.getAttribute('href');
    const sectionAriaLabel = await section.getAttribute('aria-label');
    const sectionText = await section.textContent();
    const isSectionLink = Boolean(
      sectionHref &&
      (sectionAriaLabel === linkExpectation.label ||
        sectionText?.includes(linkExpectation.label) === true),
    );
    const link = isSectionLink
      ? section
      : section.getByRole('link', { name: linkExpectation.label }).first();

    await expect(link, `${linkExpectation.label} link should render`).toBeVisible();
    await expect(link).toHaveAttribute('href', linkExpectation.href);

    if (linkExpectation.target) {
      await expect(link).toHaveAttribute('target', linkExpectation.target);
    }

    if (linkExpectation.rel) {
      await expect(link).toHaveAttribute('rel', linkExpectation.rel);
    }
  }
}

async function runReactAction(page: Page, action: VisualAction) {
  if (action === 'open-app-gallery-collection-detail') {
    const collectionsPanel = page
      .locator(
        "xpath=//*[normalize-space()='Collections']/ancestor::*[contains(@class,'MuiPaper-root')][1]",
      )
      .first();
    const detailButton = collectionsPanel
      .getByRole('button', { name: /sirius-ide-sample/ })
      .first();

    await expect(collectionsPanel).toBeVisible();
    await expect(detailButton).toBeVisible();
    await detailButton.click();
    await expect(page.getByRole('dialog').first()).toBeVisible();
    return;
  }

  if (action === 'open-app-gallery-featured-detail') {
    const detailButton = page.getByRole('button', { name: /상세 계약 보기|상세 보기/ }).first();

    await expect(detailButton).toBeVisible();
    await detailButton.click();
    await expect(page.getByRole('dialog').first()).toBeVisible();
    return;
  }

  if (action === 'open-app-gallery-registered-detail') {
    const registeredPanel = page
      .locator(
        "xpath=//*[normalize-space()='Recommended Apps']/ancestor::*[contains(@class,'MuiPaper-root')][1]",
      )
      .first();
    const detailButton = registeredPanel.getByRole('button', { name: '상세 보기' }).first();

    await expect(registeredPanel).toBeVisible();
    await expect(detailButton).toBeVisible();
    await detailButton.click();
    await expect(page.getByRole('dialog').first()).toBeVisible();
    return;
  }

  if (action === 'submit-app-gallery-install') {
    const dialog = page.getByRole('dialog').first();
    const projectInput = dialog.getByLabel('projectId');
    const installButton = dialog.getByRole('button', { name: '설치 요청' });

    await expect(dialog).toBeVisible();
    await expect(projectInput).toBeVisible();
    await projectInput.fill('visual-project-001');
    await expect(installButton).toBeEnabled();
    await installButton.click();
    await expect(dialog).toContainText('Install job queued: 6a3a02a5dc684c9fde7e52e1');
    return;
  }

  if (action === 'open-database-create-dialog') {
    const createButton = page.getByRole('button', { name: '새 데이터베이스 생성' }).first();

    await expect(createButton).toBeVisible();
    await createButton.click();
    await expect(page.getByRole('dialog').first()).toBeVisible();
    return;
  }

  if (action === 'open-domain-create-dialog') {
    const createButton = page.getByRole('button', { name: '새 도메인 생성' }).first();

    await expect(createButton).toBeVisible();
    await createButton.click();
    await expect(page.getByRole('dialog').first()).toBeVisible();
    return;
  }

  if (action === 'open-service-menu') {
    await page.locator('[data-ref="service-menu-trigger"]').click();
    await expect(page.locator('[data-ref="service-menu-panel"]')).toBeVisible();
    return;
  }

  if (action === 'open-notifications') {
    await page.locator('[data-ref="header-notifications-button"]').click();
    await expect(page.locator('[data-ref="header-notifications-popover"]')).toBeVisible();
  }
}

async function runReferenceAction(page: Page, action: VisualAction) {
  if (action === 'open-app-gallery-collection-detail') {
    const detailButton = page.locator('[data-collections] [data-app-detail]').first();

    await expect(detailButton).toBeVisible();
    await detailButton.click();
    await expect(page.locator('#appDetailDialog')).toBeVisible();
    return;
  }

  if (action === 'open-app-gallery-featured-detail') {
    const detailButton = page.locator('[data-featured-main] [data-app-detail]').first();

    await expect(detailButton).toBeVisible();
    await detailButton.click();
    await expect(page.locator('#appDetailDialog')).toBeVisible();
    return;
  }

  if (action === 'open-app-gallery-registered-detail') {
    const detailButton = page.locator('[data-app-grid] [data-app-detail]').first();

    await expect(detailButton).toBeVisible();
    await detailButton.click();
    await expect(page.locator('#appDetailDialog')).toBeVisible();
    return;
  }

  if (action === 'submit-app-gallery-install') {
    return;
  }

  if (action === 'open-database-create-dialog') {
    const createButton = page
      .locator('.create-btn')
      .filter({ hasText: '새 데이터베이스 생성' })
      .first();

    await expect(createButton).toBeVisible();
    await createButton.click();
    await expect(page.locator('#databaseCreateModal')).toBeVisible();
    return;
  }

  if (action === 'open-domain-create-dialog') {
    const createButton = page.locator('.create-btn').filter({ hasText: '새 도메인 생성' }).first();

    await expect(createButton).toBeVisible();
    await createButton.click();
    await expect(page.locator('#domainCreateModal')).toBeVisible();
    return;
  }

  if (action !== 'open-service-menu') return;

  const menuButton = page.locator('#serviceMenuButton, .menu-trigger').first();
  const servicePopover = page.locator('.service-popover').first();

  await menuButton.click();

  if (!(await servicePopover.isVisible())) {
    await page.evaluate(
      "document.querySelector('.logo-menu')?.classList.add('is-open'); document.querySelector('.service-popover')?.removeAttribute('hidden');",
    );
  }

  await expect(servicePopover).toBeVisible();
}
