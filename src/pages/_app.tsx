import "@/styles/globals.css";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";

import Layout from "@/layouts/Layout";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false
			}
		}
	});

	return (
		<>
			<QueryClientProvider client={queryClient}>
				<Head>
					<title>Fika - Home</title>
					<meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
				</Head>

				<Component {...pageProps} />
				<Toaster
					position="bottom-center"
					toastOptions={{
						success: {
							style: {
								background: "#22e225"
							}
						},
						error: {
							style: {
								background: "#e60000"
							}
						},
						iconTheme: {
							primary: "#000",
							secondary: "#fff"
						}
					}}
				/>
			</QueryClientProvider>
		</>
	);
}
