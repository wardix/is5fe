import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { isAuthenticatedAtom } from '../../store/AuthStore';
import { runInterceptors } from '../../utils/httpCommon';

export interface IGlobalLayout extends React.ComponentPropsWithoutRef<'div'> {}

const GlobalLayout: React.FC<IGlobalLayout> = ({ children }) => {
  const router = useRouter();
  const [isAuthenticated, setAuthenticated] = useAtom(isAuthenticatedAtom);
  useEffect(() => {
    runInterceptors({ router, store: { setAuthenticated } });
  }, [runInterceptors]);
  return (
    <>
      <main>{children}</main>
    </>
  );
};

export default GlobalLayout;
