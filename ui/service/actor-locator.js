import {
    createActor as createBackendActor,
    canisterId as backendCanisterId,
} from '../declarations/backend'

export const makeActor = (canisterId, createActor) => {
    return createActor(canisterId, {
        agentOptions: {
            host: process.env.NEXT_PUBLIC_IC_HOST,
        },
    })
}

export function makeBackendActor() {
    return makeActor(backendCanisterId, createBackendActor)
}
