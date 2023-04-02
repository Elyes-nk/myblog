import React from "react";
import "@/styles/global.css";
import { SkeletonTheme } from "react-loading-skeleton";

import { AuthContexProvider } from "@/context/authContext";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <React.StrictMode>
      <SkeletonTheme baseColor="#eeeeee" highlightColor="#b0b0b0">
        <QueryClientProvider client={queryClient}>
          <AuthContexProvider>
            <Component {...pageProps} />
          </AuthContexProvider>
        </QueryClientProvider>
      </SkeletonTheme>
    </React.StrictMode>
  );
}
