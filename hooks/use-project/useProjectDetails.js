import { useBackend } from "@/context/backend"
import { makeEscrowActor } from "@/ui/service/actor-locator"
import { Actor, HttpAgent } from "@dfinity/agent"
import { useQuery } from "react-query"

export const oldIdlFactory = ({ IDL }) => {
  const Stats = IDL.Record({
      nftNumber: IDL.Nat,
      endTime: IDL.Int,
      nftPriceE8S: IDL.Nat,
      openSubaccounts: IDL.Nat,
      nftsSold: IDL.Nat,
  })
  return IDL.Service({
      getAccountsInfo: IDL.Func([], [IDL.Text], ['query']),
      getLogs: IDL.Func([], [IDL.Text], ['query']),
      getStats: IDL.Func([], [Stats], ['query']),
  })
}

export const idlFactory = ({ IDL }) => {
  const NFTStats = IDL.Record({
      sold: IDL.Nat,
      openSubaccounts: IDL.Nat,
      number: IDL.Nat,
      priceE8S: IDL.Nat,
      oversellNumber: IDL.Int,
  })
  const EscrowStats = IDL.Record({
      endTime: IDL.Int,
      nftStats: IDL.Vec(NFTStats),
  })
  return IDL.Service({
      getAccountsInfo: IDL.Func([], [IDL.Text], ['query']),
      getLogs: IDL.Func([], [IDL.Text], ['query']),
      getStats: IDL.Func([], [EscrowStats], ['query']),
  })
}

export const idlBTCFactory = ({ IDL }) => {
  const NFTStats = IDL.Record({
      sold: IDL.Nat,
      openSubaccounts: IDL.Nat,
      number: IDL.Nat,
      priceE8S: IDL.Nat,
      priceSatoshi: IDL.Nat
  })
  const EscrowStats = IDL.Record({
      endTime: IDL.Int,
      nftStats: IDL.Vec(NFTStats),
  })
  return IDL.Service({
      getAccountsInfo: IDL.Func([], [IDL.Text], ['query']),
      getLogs: IDL.Func([], [IDL.Text], ['query']),
      getStats: IDL.Func([], [EscrowStats], ['query']),
  })
}

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
              'Unable to fetch root key. Check to ensure that your local replica is running'
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

export const useProjectDetails = (projectId) => {
  const { backend } = useBackend()
  const escrowManagerActor = makeEscrowActor()
  
  
  return useQuery(
      ['project-details', projectId, backend, escrowManagerActor],
      async () => {
          if (!backend) return null
          if (!projectId) return null
          if (!escrowManagerActor) return null

          const { project, owner, marketplaceLinks } =
              await backend.getProjectWithOwnerAndMarketplace(projectId)

          let stats = {
              endTime: 0,
              nftStats: [
                  {
                      number: Number(project.nftVolume),
                      priceE8S:
                          (project?.goal / Number(project?.nftVolume)) *
                          100_000_000,
                      priceSatoshi:
                          (project?.goal / Number(project?.nftVolume)) *
                          100_000_000,
                      sold: 0,
                      openSubaccounts: 0,
                      oversellNumber: Number(project.oversellNumber),
                  },
              ],
          }

          let escrowActor
          const escrowCanister = await escrowManagerActor.getProjectEscrowCanisterPrincipal(+project.id)

          if (!Array.isArray(escrowCanister) || escrowCanister.length < 1)
              return { ...project, escrowActor, stats, owner }

          let isNewEscrow = true
          let isNewBTCEscrow = false
          let newStats
          try {
              escrowActor = createActor(escrowCanister[0], idlBTCFactory)
              newStats = await escrowActor.getStats()
              isNewEscrow = false
              isNewBTCEscrow = true
          } catch (e) {
              try {
                  escrowActor = createActor(escrowCanister[0], idlFactory)
                  newStats = await escrowActor.getStats()
              } catch (e1) {
                  console.error(e1)
                  isNewEscrow = false
                  try {
                      escrowActor = createActor(
                          escrowCanister[0],
                          oldIdlFactory
                      )
                      newStats = await escrowActor.getStats()
                  } catch (e2) {
                      console.error(e2)
                      return {...project, escrowActor, stats, owner}
                  }
              }
          }

          if (newStats === undefined)
              return { ...project, escrowActor, stats, owner }

          if (!(isNewEscrow || isNewBTCEscrow) && newStats?.nftNumber > 0) {
              stats = {
                  endTime: Number(newStats.endTime),
                  nftStats: [
                      {
                          number: Number(newStats.nftNumber),
                          priceE8S: Number(newStats.nftPriceE8S),
                          sold: Number(newStats.nftsSold),
                          openSubaccounts: Number(
                              newStats.openSubaccounts
                          ),
                          oversellNumber: Number(newStats.oversellNumber),
                      },
                  ],
              }
          } else if (
              isNewEscrow &&
              newStats?.nftStats &&
              Array.isArray(newStats.nftStats) &&
              newStats.nftStats.length > 0
          ) {
              stats = {
                  endTime: Number(newStats.endTime),
                  nftStats: newStats.nftStats.map((nft) => ({
                      number: Number(nft.number),
                      priceE8S: Number(nft.priceE8S),
                      sold: Number(nft.sold),
                      openSubaccounts: Number(nft.openSubaccounts),
                      oversellNumber: Number(nft.oversellNumber),
                  })),
              }
          } else if (
              isNewBTCEscrow &&
              newStats?.nftStats &&
              Array.isArray(newStats.nftStats) &&
              newStats.nftStats.length > 0
          ) {
              stats = {
                  endTime: Number(newStats.endTime),
                  nftStats: newStats.nftStats.map((nft) => ({
                      number: Number(nft.number),
                      priceE8S: Number(nft.priceE8S),
                      priceSatoshi: Number(nft.priceSatoshi),
                      sold: Number(nft.sold),
                      openSubaccounts: Number(nft.openSubaccounts),
                      oversellNumber: Number(nft.oversellNumber),
                  })),
              }
          }

          if (Object.keys(project?.status?.[0] || { submitted: null })[0] === 'fully_funded') {
              stats['endTime'] = 0
          }

          return {
              ...project,
              escrowActor,
              stats,
              owner,
              marketplace: marketplaceLinks,
          }
      },
      {
          refetchOnWindowFocus: false,
      }
  )
}
