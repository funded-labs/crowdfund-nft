import { Actor, HttpAgent } from '@dfinity/agent'

export const createActor = (canisterId, idlFactory) => {
  const agent = new HttpAgent({
    host:
      process.env.NODE_ENV === 'production'
        ? 'https://ic0.app'
        : 'http://127.0.0.1:8000/',
  })

  // Fetch root key for certificate validation during development
  if (process.env.NODE_ENV !== 'production') {
    agent.fetchRootKey().catch((err) => {
      console.warn(
        'Unable to fetch root key. Check to ensure that your local replica is running',
      )
      console.error(err)
    })
  }

  // Creates an actor with using the candid interface and the HttpAgent
  return Actor.createActor(idlFactory, {
    agent,
    canisterId,
  })
}
