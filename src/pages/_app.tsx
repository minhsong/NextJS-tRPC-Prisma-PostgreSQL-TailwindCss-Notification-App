import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Theme } from "@radix-ui/themes";
import Layout from "@/components/layout";
import { NotificationProvider } from "@/context/NotificationContext";
import { trpc } from "@/utils/trpc";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <NotificationProvider>
        <Head>
          <title>Song Truong: Notifications App</title>
          <meta
            name="description"
            content="Song Truong interview notification NextJS app"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Theme>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Theme>
      </NotificationProvider>
    </QueryClientProvider>
  );
}

export default trpc.withTRPC(App);
