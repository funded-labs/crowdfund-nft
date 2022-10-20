import { createContext, useContext, useState, useEffect } from 'react'
import {
    makeBackendActor,
    makeBackendActorWithIdentity,
} from '@/ui/service/actor-locator'
import { AuthClient } from '@dfinity/auth-client'
import { Principal } from '@dfinity/principal'
import { handlePlugConnect, handleInfinityConnect, handleStoicConnect } from '@/helpers/wallets'
import _ from 'lodash'

const INITIAL_STATE = {
    backend: makeBackendActor(),
    backendWithAuth: null,
    isLoading: true,
    wallets: {
        'plug': {
            'principal': null,
        },
        'infinity': {
            'principal': null
        },
        'stoic': {
            'principal': null
        }
    },
    setBackend: () => {},
}

export const BackendContext = createContext(INITIAL_STATE)

export function BackendProvider({
    children,
    backend,
    backendWithAuth,
    wallets,
}) {
    const [_backend, setBackend] = useState(backend || INITIAL_STATE.backend)
    const [_backendWithAuth, setBackendWithAuth] = useState(
        backendWithAuth || INITIAL_STATE.backendWithAuth
    )

    let [_wallets, setWallets] = useState(
        wallets || _.merge(INITIAL_STATE.wallets, {
            'plug': {
                'getPrincipal': () => {return getPlugPrincipal()}
            },
            'infinity': {
                'getPrincipal': () => {return getInfinityPrincipal()}
            },
            'stoic': {
                'getPrincipal': () => getStoicPrincipal()
            }
        })
    )

    const getPlugPrincipal = async () => {
        let newWallets = _wallets
        if (_wallets['plug']['principal']) return _wallets['plug']['principal']
        if (!window?.ic?.plug)
            return alert('Plug is not installed in your browser')
        if (
            await handlePlugConnect()
                .then(() => true)
                .catch(() => false)
        ) {
            return window.ic.plug
                .createAgent()
                .then(() => {
                    return window.ic.plug.agent.getPrincipal()
                })
                .then((principal) => {
                    const newPrincipal = Principal.from(principal).toText()
                    newWallets['plug']['principal'] = newPrincipal
                    setWallets({...newWallets})
                    return newPrincipal
                })
                .catch((e) => {
                    console.error(e)
                    return _wallets['plug']['principal']
                })
        } else {
            return _wallets['plug']['principal']
        }
    }
    const getInfinityPrincipal = async () => {
        let newWallets = _wallets
        if (_wallets['infinity']['principal']) return _wallets['infinity']['principal']
        if (!window?.ic?.infinityWallet)
            return alert('Infinity is not installed in your browser')
        if (
            await handleInfinityConnect()
                .then(() => true)
                .catch(() => false)
        ) {
            return window.ic.infinityWallet.getPrincipal()
                .then((principal) => {
                    const newPrincipal = Principal.from(principal).toText()
                    newWallets['infinity']['principal'] = newPrincipal
                    setWallets({...newWallets})
                    return newPrincipal
                })
                .catch((e) => {
                    console.error(e)
                    return _wallets['infinity']['principal']
                })
        } else {
            return _wallets['infinity']['principal']
        }
    }
    const getStoicPrincipal = () => {
        let newWallets = _wallets
        if (_wallets['stoic']['principal']) return _wallets['stoic']['principal']
        return handleStoicConnect().then((identity) => {
            const principal = identity.getPrincipal().toText()
            newWallets['stoic']['principal'] = principal
            setWallets({...newWallets})
            return principal
        }).catch((e) => {
            console.error(e)
            return _wallets['stoic']['principal']
        })
    }

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

    const value = {
        backend: _backend,
        backendWithAuth: _backendWithAuth,
        wallets: _wallets,
        login
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
