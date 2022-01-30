import { createContext, useContext, useState, useEffect } from 'react'
import {
    makeBackendActor,
    makeBackendActorWithIdentity,
} from '@/ui/service/actor-locator'

import { AuthClient } from '@dfinity/auth-client'

const INITIAL_STATE = {
    backend: null,
    backendWithAuth: null,
    isLoading: true,
    setBackend: () => {},
}

export const BackendContext = createContext(INITIAL_STATE)

export function BackendProvider({ children, backend, backendWithAuth }) {
    const [_backend, setBackend] = useState(backend || INITIAL_STATE.backend)
    const [_backendWithAuth, setBackendWithAuth] = useState(
        backendWithAuth || INITIAL_STATE.backendWithAuth
    )

    useEffect(() => {
        if (backend) return

        const _backend = makeBackendActor()
        setBackend(_backend)
    }, [])

    const login = async () => {
        const environmentName = process.env.NEXT_PUBLIC_ENVIRONMENT

        let backendWithAuth

        if (environmentName === 'development') {
            backendWithAuth = makeBackendActor()
        }

        if (environmentName !== 'development') {
            backendWithAuth = await authClientLogin()
        }

        setBackendWithAuth(backendWithAuth)
    }

    const authClientLogin = async () => {
        const authClient = await AuthClient.create()

        return new Promise((resolve, reject) => {
            authClient.login({
                onSuccess: async () => {
                    const identity = authClient.getIdentity()

                    if (!identity) {
                        return reject(new Error('identity is null'))
                    }

                    const backend = makeBackendActorWithIdentity(identity)

                    resolve(backend)
                },
            })
        })
    }

    const value = {
        backend: _backend,
        backendWithAuth: _backendWithAuth,
        login,
    }

    return (
        <BackendContext.Provider value={value}>
            {children}
        </BackendContext.Provider>
    )
}

export function useBackend() {
    const context = useContext(BackendContext)
    return context
}
