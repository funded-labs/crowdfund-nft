import { BackendProvider } from "context/backend";
import { QueryClient, QueryClientProvider } from "react-query"
import "../styles/global.css"

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {

    if (typeof window === "undefined") {
        return null;
    }

    return (
        <QueryClientProvider client={queryClient}>
            <BackendProvider>
                <Component {...pageProps} />
            </BackendProvider>
        </QueryClientProvider>
    );
}
