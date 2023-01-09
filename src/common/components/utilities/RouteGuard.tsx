import { userProfileAtom } from '@/store/AuthStore';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export interface IRouteGuard extends React.ComponentPropsWithoutRef<'div'> {}

const RouteGuard: React.FC<IRouteGuard> = ({ children }) => {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [userProfile, setUserProfile] = useAtom(userProfileAtom);

  useEffect(() => {
    // on initial load - run auth check
    authCheck(router.asPath);

    // on route change start - hide page content by setting authorized to false
    const hideContent = () => setAuthorized(false);
    router.events.on('routeChangeStart', hideContent);

    // on route change complete - run auth check
    router.events.on('routeChangeComplete', authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off('routeChangeStart', hideContent);
      router.events.off('routeChangeComplete', authCheck);
    };
  }, []);

  function authCheck(url: string) {
    const token =
      (typeof window !== 'undefined' && localStorage.getItem('token')) || '';
    // redirect to login page if accessing a private page and not logged in
    const publicPaths = ['/login'];
    const path = url.split('?')[0];
    if ((!userProfile || !token) && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.push({
        pathname: '/login',
        query: { returnUrl: router.asPath },
      });
    } else {
      setAuthorized(true);
    }
  }

  return <>{authorized && children}</>;
};

export default RouteGuard;
