import {
    createActor as createBackendActor,
    canisterId as backendCanisterId,
} from '../declarations/backend'

export const makeActorWithPrincipal = (
    canisterId,
    createActor,
    identity = null
) => {
    const options = {
        agentOptions: {
            host: process.env.NEXT_PUBLIC_IC_HOST,
            ...(identity ? { identity } : {}),
        },
    }
    console.log(options)
    return createActor(canisterId, options)
}

export const makeActor = (canisterId, createActor) =>
    makeActorWithPrincipal(canisterId, createActor)

export const makeBackendActorWithIdentity = (identity) =>
    makeActorWithPrincipal(backendCanisterId, createBackendActor, identity)

export const makeBackendActor = () =>
    makeActor(backendCanisterId, createBackendActor)
