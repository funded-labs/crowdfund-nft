import { createContext, useContext, useEffect, useState } from "react";
import { makeBackendActor, makeBackendActorWithIdentity } from "@/ui/service/actor-locator";

const INITIAL_STATE = {
    backend: null,
    isLoading: true,
    setBackend: () => {}
};

export const BackendContext = createContext(INITIAL_STATE);

export function BackendProvider({ children, backend }) {
    const [_backend, setBackend] = useState(backend || INITIAL_STATE.backend);

    useEffect(() => {
        if (backend) return;

        const _backend = makeBackendActor();
        setBackend(backend);
    }, []);

    const login = async () => {
        const environmentName = process.env.NEXT_PUBLIC_ENVIRONMENT;

        let backend;

        if (environmentName === "development") {
            backend = makeBackendActor();
        }

        if (environmentName !== "development") {
            backend = await authClientLogin();
        }

        setBackend(backend);
    }

    const authClientLogin = async () => {
        const authClient = await AuthClient.create();

        return new Promise((resolve, reject) => {
            authClient.login({
                onSuccess: async () => {
                    const identity = authClient.getIdentity();

                    if (!identity) {
                        return reject(new Error("identity is null"));
                    }

                    const backend = makeBackendActorWithIdentity(identity);

                    resolve(backend)
                }
            })
        });
    }

    const value = { backend: _backend, login };

    return (
        <BackendContext.Provider value={value}>
            {children}
        </BackendContext.Provider>
    )
}

export function useBackend() {
    const context = useContext(BackendContext);
    return context;
}