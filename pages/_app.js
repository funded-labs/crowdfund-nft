import { BackendProvider } from 'context/backend'
import { QueryClient, QueryClientProvider } from 'react-query'
import Head from 'next/head'
import '../styles/global.css'
import { Container as ModalContainer } from 'react-modal-promise'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }) {
    return (
        <QueryClientProvider client={queryClient}>
            <BackendProvider>
                <Head>
                    <title>CrowdFund NFT</title>
                </Head>
                <Component {...pageProps} />
                <ModalContainer />
            </BackendProvider>
        </QueryClientProvider>
    )
}
