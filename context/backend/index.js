import { createContext, useContext, useState } from "react";

const INITIAL_STATE = {
    backend: null,
    isLoading: true,
    setBackend: () => {}
};

export const BackendContext = createContext(INITIAL_STATE);

export function BackendProvider({ children, backend }) {
    const [_backend, setBackend] = useState(backend || INITIAL_STATE.backend);

    const value = { backend: _backend, setBackend };

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