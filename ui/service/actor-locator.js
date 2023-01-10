import { Actor, HttpAgent } from '@dfinity/agent'
// import {idlFactory as backendIdl} from 'ui/declarations/backend/backend.did.js'
import {
  createActor as createBackendActor,
  canisterId as backendCanisterId,
} from '../declarations/backend'
import {
  createActor as createImagesActor,
  canisterId as imagesCanisterId,
} from '../declarations/images'
import {
  createActor as createEscrowActor,
  canisterId as escrowCanisterId,
} from '../declarations/escrow_manager'

export const makeActorWithPrincipal = (canisterId, createActor, identity) => {
  const options = {
    agentOptions: {
      host: process.env.NEXT_PUBLIC_IC_HOST,
      identity: identity ?? undefined,
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

export const makeEscrowActor = () =>
  makeActorWithPrincipal(escrowCanisterId, createEscrowActor)

export const getImageURL = (imageId) =>
  process.env.NEXT_PUBLIC_ENVIRONMENT === 'development'
    ? 'http://127.0.0.1:8000/?canisterId=' + imagesCanisterId + '&id=' + imageId
    : 'https://' + imagesCanisterId + '.raw.ic0.app/id=' + imageId
