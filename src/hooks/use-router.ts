import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

type NavigateOptions = object;

interface Router {
  /**
   * Navigate to the previous history entry.
   */
  back(): void;

  /**
   * Navigate to the next history entry.
   */
  forward(): void;

  /**
   * Refresh the current page.
   */
  refresh(): void;

  /**
   * Navigate to the provided href.
   * Pushes a new history entry.
   */
  push(href: string, options?: NavigateOptions): void;

  /**
   * Navigate to the provided href.
   * Replaces the current history entry.
   */
  replace(href: string, options?: NavigateOptions): void;

  /**
   * Prefetch the provided href.
   */
  prefetch(href: string): void;
}

/**
 * This is a wrapper over `react-router/useNavigate` hook.
 * We use this to help us maintain consistency between CRA and Next.js
 */
export const useRouter = (): Router => {
  const navigate = useNavigate();

  return useMemo(() => {
    return {
      back: () => navigate(-1),
      forward: () => navigate(1),
      refresh: () => navigate(0),
      push: (href: string, options?: NavigateOptions) => navigate(href),
      replace: (href: string, options?: NavigateOptions) => navigate(href, { replace: true }),
      prefetch: (href: string) => {},
    };
  }, [navigate]);
};
