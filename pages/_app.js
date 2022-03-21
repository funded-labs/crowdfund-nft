import { BackendProvider } from 'context/backend'
import { QueryClient, QueryClientProvider } from 'react-query'
import Head from 'next/head'
import '../styles/global.css'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }) {
    return (
        <QueryClientProvider client={queryClient}>
            <BackendProvider>
                <Head>
                    <title>CrowdFund NFT</title>
                </Head>
                <Component {...pageProps} />
            </BackendProvider>
        </QueryClientProvider>
    )
}
