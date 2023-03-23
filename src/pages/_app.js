import React from "react";
import "@/styles/global.css";

import { AuthContexProvider } from "@/context/authContext";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }) {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthContexProvider>
          <Component {...pageProps} />
        </AuthContexProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
}
