import { Actor, HttpAgent } from '@dfinity/agent'
import { useQuery } from 'react-query'
import { Principal } from '@dfinity/principal'

export const idlFactory = ({ IDL }) => {
    const TokenIdentifier = IDL.Text
    const ProjectId = IDL.Nat
    const CanisterId = IDL.Principal
    const Rewards = IDL.Vec(IDL.Text)
    const RewardIndex = IDL.Nat
    const RewardValue = IDL.Bool
    const CommonError_1 = IDL.Variant({
        'InvalidToken' : TokenIdentifier,
        'Other' : IDL.Text,
    });
    const Result_1 = IDL.Variant({ 'ok' : IDL.Text, 'err' : CommonError_1 });
    const TokenIndex = IDL.Nat32
    const Time = IDL.Int
    const Listing = IDL.Record({
        locked: IDL.Opt(Time),
        seller: IDL.Principal,
        price: IDL.Nat64,
    })
    const Metadata = IDL.Variant({
        fungible: IDL.Record({
            decimals: IDL.Nat8,
            metadata: IDL.Opt(IDL.Vec(IDL.Nat8)),
            name: IDL.Text,
            symbol: IDL.Text,
        }),
        nonfungible: IDL.Record({ metadata: IDL.Opt(IDL.Vec(IDL.Nat8)) }),
    })
    return IDL.Service({
        listings: IDL.Func(
            [],
            [IDL.Vec(IDL.Tuple(TokenIndex, Listing, Metadata))],
            ['query']
        ),
        stats: IDL.Func(
            [],
            [
                ...Array.from({ length: 4 }, () => IDL.Nat64),
                ...Array.from({ length: 3 }, () => IDL.Nat),
            ],
            ['query']
        ),
        getTokens: IDL.Func(
            [],
            [IDL.Vec(IDL.Tuple(TokenIndex, Metadata))],
            ['query']
        ),
        getRewards: IDL.Func(
            [],
            [Rewards],
            ['query']
        ),
        getProjectNFTCanisterPrincipal: IDL.Func(
            [ProjectId],
            [IDL.Opt(CanisterId)],
            ['query']
        ),
        setRewardRedeemed: IDL.Func([TokenIdentifier, RewardIndex, RewardValue], [Result_1], []),
    })
}

export const createActor = (canisterId) => {
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

export function useProjectStats(canister) {
    const defaultReturn = {
        volume: 0,
        high: 0,
        low: 0,
        floor: 0,
        listings: 0,
        registry: 0,
        transactions: 0,
    }

    const actor = createActor(
        process.env.NODE_ENV !== 'production'
            ? 'qjdve-lqaaa-aaaaa-aaaeq-cai' // local test nft canister
            : canister
    )
    return useQuery(
        ['project-stats', canister],
        async () => {
            if (!canister) return defaultReturn
            const stats = await actor.stats()
            return {
                volume: Math.round(Number(stats[0]) / 100_000_000),
                high: Math.round(Number(stats[1]) / 100_000_000),
                low: Math.round(Number(stats[2]) / 100_000_000),
                floor: Math.round(Number(stats[3]) / 100_000_000),
                listings: Number(stats[4]),
                registry: Number(stats[5]),
                transactions: Number(stats[6]),
            }
        },
        {
            placeholderData: defaultReturn,
        }
    )
}

export function useProjectListings(canister) {
    const defaultReturn = []
    const actor = createActor(
        process.env.NODE_ENV !== 'production'
            ? 'qjdve-lqaaa-aaaaa-aaaeq-cai' // local test nft canister
            : canister
    )
    return useQuery(
        ['project-listings', canister],
        async () => {
            if (!canister) return defaultReturn
            return await actor.listings()
        },
        {
            placeholderData: defaultReturn,
        }
    )
}

export function useProjectTokens(canister) {
    const defaultReturn = []
    let actor = ''
    try {
        actor = createActor(
            process.env.NODE_ENV !== 'production'
                ? 'qjdve-lqaaa-aaaaa-aaaeq-cai' // local test nft canister
                : canister
        )
    } catch {}
    return useQuery(
        ['project-tokens', canister],
        async () => {
            if (!canister) return defaultReturn
            return await actor.getTokens()
        },
        {
            placeholderData: defaultReturn,
            refetchInterval: 500
        }
    )
}

export function useProjectRewards(canister) {
    const defaultReturn = []

    let actor = ''
    try {
        actor = createActor(
            process.env.NODE_ENV !== 'production'
                ? 'qjdve-lqaaa-aaaaa-aaaeq-cai' // local test nft canister
                : canister
        )
    } catch {}
    return useQuery(
        ['project-rewards', canister],
        async () => {
            if (!canister) return defaultReturn
            return await actor.getRewards()
        },
        {
            placeholderData: defaultReturn,
            refetchOnWindowFocus: false,
            refetchIntervalInBackground: false,
        }
    )
}

export function useProjectNFTCanister(projectId) {
    const defaultReturn = ''

    const actor = createActor(
        process.env.NODE_ENV !== 'production'
            ? 'rdmx6-jaaaa-aaaaa-aaadq-cai' // local nft manager canister
            : 'q4qsw-gyaaa-aaaak-aaixq-cai'
    )

    return useQuery(
        ['project-canister'],
        async () => {
            if (!projectId) return defaultReturn
            return actor.getProjectNFTCanisterPrincipal(parseInt(projectId)).then(principal => {
                return Principal.fromUint8Array(principal[0]._arr).toText()
            })
        },
        {
            refetchOnWindowFocus: false,
            refetchIntervalInBackground: false,
            placeholderData: defaultReturn,
        }
    )
}