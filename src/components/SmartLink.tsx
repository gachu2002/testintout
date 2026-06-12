import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { resolveSafeHref } from '@/config/routes';

type SmartLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  children?: ReactNode;
  href: string;
};

export const SmartLink = forwardRef<HTMLAnchorElement, SmartLinkProps>(function SmartLink(
  { children, href, rel, target, ...props },
  ref,
) {
  const resolvedHref = resolveSafeHref(href);

  if (!resolvedHref) {
    return (
      <a
        ref={ref}
        {...props}
        aria-disabled="true"
        href="about:blank"
        tabIndex={-1}
        onClick={(event) => {
          event.preventDefault();
          props.onClick?.(event);
        }}
      >
        {children}
      </a>
    );
  }

  if (resolvedHref.isInternal) {
    return (
      <RouterLink ref={ref} to={resolvedHref.href} {...props}>
        {children}
      </RouterLink>
    );
  }

  const resolvedTarget = target ?? '_blank';
  const resolvedRel = rel ?? (resolvedTarget === '_blank' ? 'noopener noreferrer' : undefined);

  return (
    <a href={resolvedHref.href} ref={ref} rel={resolvedRel} target={resolvedTarget} {...props}>
      {children}
    </a>
  );
});
