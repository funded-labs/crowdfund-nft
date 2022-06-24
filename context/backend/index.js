import { createContext, useContext, useState, useEffect } from 'react'
import {
    makeBackendActor,
    makeBackendActorWithIdentity,
} from '@/ui/service/actor-locator'
import { AuthClient } from '@dfinity/auth-client'
import { Principal } from '@dfinity/principal'
import { handleConnect } from '@/helpers/plugwallet'

const INITIAL_STATE = {
    backend: makeBackendActor(),
    backendWithAuth: null,
    isLoading: true,
    plugPrincipal: null,
    setBackend: () => {},
}

export const BackendContext = createContext(INITIAL_STATE)

export function BackendProvider({
    children,
    backend,
    backendWithAuth,
    plugPrincipal,
}) {
    const [_backend, setBackend] = useState(backend || INITIAL_STATE.backend)
    const [_backendWithAuth, setBackendWithAuth] = useState(
        backendWithAuth || INITIAL_STATE.backendWithAuth
    )
    const [_plugPrincipal, setPlugPrincipal] = useState(
        plugPrincipal || INITIAL_STATE.plugPrincipal
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
        } else {
            backendWithAuth = await authClientLogin()
        }

        setBackendWithAuth(backendWithAuth)
        return backendWithAuth
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

    const getPlugPrincipal = async () => {
        if (_plugPrincipal) return _plugPrincipal
        if (!window?.ic?.plug)
            return alert('Plug is not installed in your browser')
        if (
            await handleConnect()
                .then(() => true)
                .catch(() => false)
        ) {
            return window.ic.plug
                .createAgent()
                .then(() => {
                    return window.ic.plug.agent.getPrincipal()
                })
                .then((principal) => {
                    setPlugPrincipal(principal)
                    return principal
                })
                .catch((e) => {
                    console.error(e)
                    return _plugPrincipal
                })
        } else {
            return _plugPrincipal
        }
    }

    const value = {
        backend: _backend,
        backendWithAuth: _backendWithAuth,
        getPlugPrincipal,
        login,
        plugPrincipal: _plugPrincipal,
        plugPrincipalText: _plugPrincipal
            ? Principal.from(_plugPrincipal).toText()
            : null,
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
