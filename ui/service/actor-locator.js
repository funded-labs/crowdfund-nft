import {
    createActor as createBackendActor,
    canisterId as backendCanisterId,
} from '../declarations/backend'
import {
    createActor as createImagesActor,
    canisterId as imagesCanisterId,
} from '../declarations/images'

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
    return createActor(canisterId, options)
}

export const makeBackendActorWithIdentity = (identity) =>
    makeActorWithPrincipal(backendCanisterId, createBackendActor, identity)

export const makeBackendActor = () =>
    makeActorWithPrincipal(backendCanisterId, createBackendActor)

export const makeImagesActor = () =>
    makeActorWithPrincipal(imagesCanisterId, createImagesActor)

export const getImageURL = (imageId) =>
    process.env.NEXT_PUBLIC_ENVIRONMENT === 'production'
        ? 'https://' + imagesCanisterId + '.raw.ic0.app/id=' + imageId
        : 'http://127.0.0.1:8000/?canisterId=' +
          imagesCanisterId +
          '&id=' +
          imageId
