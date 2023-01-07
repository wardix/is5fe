import { isAuthenticatedAtom } from '@/store/AuthStore';
import { runInterceptors } from '@/utils/httpCommon';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export interface IGlobalLayout extends React.ComponentPropsWithoutRef<'div'> {}

const GlobalLayout: React.FC<IGlobalLayout> = ({ children }) => {
  const router = useRouter();
  const [, setAuthenticated] = useAtom(isAuthenticatedAtom);
  useEffect(() => {
    runInterceptors({ router, store: { setAuthenticated } });
  }, [router, setAuthenticated]);
  return (
    <>
      <main>{children}</main>
    </>
  );
};

export default GlobalLayout;
