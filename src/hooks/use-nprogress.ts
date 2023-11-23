import { useEffect, useState } from 'react';
import nProgress from 'nprogress';
import { useMounted } from '@src/hooks/use-mounted';
import { usePathname } from '@src/hooks/use-pathname';
import { useLocation } from 'react-router-dom';

export function useNprogress() {
  const isMounted = useMounted();
  const pathname = usePathname();
  const location = useLocation(); // Add useLocation hook from react-router-dom
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    if (!visible) {
      nProgress.start();
      setVisible(true);
    }

    if (visible) {
      nProgress.done();
      setVisible(false);
    }

    if (!visible && isMounted()) {
      setVisible(false);
      nProgress.done();
    }

    return () => {
      nProgress.done();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, location, isMounted]); // Include location in the dependencies

  return null;
}