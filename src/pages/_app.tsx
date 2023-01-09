import GlobalLayout from '@/components/layouts/GlobalLayout';
import RouteGuard from '@/components/utilities/RouteGuard';
import '@/styles/globals.css';
import createEmotionCache from '@/utils/createEmotionCache';
import theme from '@/utils/theme';
import { CacheProvider, EmotionCache } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import type { AppProps } from 'next/app';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { NextPageWithLayout } from './page';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface IAppProps extends AppProps {
  Component: NextPageWithLayout;
  emotionCache?: EmotionCache;
}

export default function App({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: IAppProps) {
  const [queryClient] = useState(() => new QueryClient());
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <GlobalLayout>
            {getLayout(
              <RouteGuard>
                <Component {...pageProps} />
              </RouteGuard>
            )}
          </GlobalLayout>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
