import React from 'react';
import { forwardRef } from 'react';
import type { LinkProps } from 'react-router-dom';
import { Link } from 'react-router-dom';

interface RouterLinkProps extends Omit<LinkProps, 'to'> {
  href: string;
}

/**
 * This is an adapted for `react-router-dom/link` component.
 * We use this to help us maintain consistency between CRA and Next.js
 */
export const RouterLink = forwardRef(function RouterLink(props: RouterLinkProps, ref: any) {
  const { href, ...other } = props;

  return (
    <Link
      ref={ref}
      to={href}
      {...other}
    />
  );
});
