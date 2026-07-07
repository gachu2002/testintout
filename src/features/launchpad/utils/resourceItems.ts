import { routes } from '@/config/routes';
import type {
  BucketResource,
  ConsoleResource,
  DatabaseResource,
  DomainResource,
} from '@/features/launchpad/types';

export type ResourceRailItem = {
  href: string;
  iconBackground: string;
  iconName: string;
  id: string;
  meta: string;
  status: string;
  title: string;
};

type BuildResourceItemsInput = {
  buckets: BucketResource[];
  consoles: ConsoleResource[];
  databases: DatabaseResource[];
  domains: DomainResource[];
};

export function buildResourceItems({
  buckets,
  consoles,
  databases,
  domains,
}: BuildResourceItemsInput): ResourceRailItem[] {
  const databaseItems = databases.map((item) => ({
    href: routes.databases,
    iconBackground: 'linear-gradient(135deg,#2563eb,#06b6d4)',
    iconName: 'storage',
    id: `database-${item.id}`,
    meta: `${item.engine || 'DB'} · ${item.status || '-'}`,
    status: item.health.label,
    title: item.name,
  }));

  const bucketItems = buckets.map((item) => ({
    href: routes.buckets,
    iconBackground: 'linear-gradient(135deg,#0f766e,#2dd4bf)',
    iconName: 'bucket',
    id: `bucket-${item.id}`,
    meta: `${item.type || 'Bucket'} · ${item.status || '-'}`,
    status: item.status,
    title: item.name,
  }));

  const domainItems = domains.map((item) => ({
    href: routes.domains,
    iconBackground: 'linear-gradient(135deg,#4f46e5,#60a5fa)',
    iconName: 'domain',
    id: `domain-${item.id}`,
    meta: `${item.kind || 'Domain'} · ${item.status || '-'}`,
    status: item.status,
    title: item.name,
  }));

  const consoleItems = consoles.map((item) => ({
    href: routes.consoles,
    iconBackground: 'linear-gradient(135deg,#f97316,#fb923c)',
    iconName: 'console',
    id: `console-${item.id}`,
    meta: `${item.typeLabel || item.type || 'Console'} · ${item.statusLabel || item.status || '-'}`,
    status: item.statusLabel,
    title: item.name,
  }));

  return [...databaseItems, ...bucketItems, ...domainItems, ...consoleItems];
}
