import { Actor, HttpAgent } from '@dfinity/agent'
import Hero from '@/components/project/hero'
import Steps from '@/components/project/steps'
import Navbar from '@/components/shared/navbar'
import TabBar from '@/components/project/tab-bar'
import { useState } from 'react'
import CampaignDetails from '@/components/project/campaign-details'
import NFTCollection from '@/components/project/nft-collection'
import Footer from '@/components/shared/footer'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import { useBackend } from '@/context/backend'
import Faqs from '@/components/project/faqs'
import Head from 'next/head'
import { makeEscrowActor } from '@/ui/service/actor-locator'
import Activity from '@/components/project/activity'

export const idlFactory = ({ IDL }) => {
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

const createActor = (canisterId) => {
    const agent = new HttpAgent({
        host:
            process.env.NODE_ENV === 'production'
                ? 'https://ic0.app'
                : 'http://127.0.0.1:8000/',
    })

    // Fetch root key for certificate validation during development
    if (process.env.NODE_ENV !== 'production') {
        console.log('here')
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

export default function ProjectDetails() {
    const [selectedTab, setTab] = useState('campaign-details')
    const router = useRouter()
    const { projectId } = router.query
    const { backend } = useBackend()
    const escrowManagerActor = makeEscrowActor()

    const {
        data: project,
        isLoading,
        isError,
        isFetching,
    } = useQuery(
        ['project-details', projectId, backend, escrowManagerActor],
        async () => {
            if (!backend) return null
            if (!projectId) return null
            if (!escrowManagerActor) return null

            const { project, owner } = await backend.getProjectWithOwner(
                projectId
            )

            let stats = {
                nftNumber: Number(project.nftVolume),
                nftPriceE8S:
                    (project?.goal / Number(project?.nftVolume)) * 100_000_000,
                endTime: 0,
                nftsSold: 0,
                openSubaccounts: 0,
            }

            let escrowActor

            if (
                Object.keys(project?.status?.[0] || { submitted: null })[0] !==
                'fully_funded'
            ) {
                const escrowCanister =
                    await escrowManagerActor.getProjectEscrowCanisterPrincipal(
                        +project.id
                    )

                if (!Array.isArray(escrowCanister) || escrowCanister.length < 1)
                    return { ...project, escrowActor, stats, owner }

                escrowActor = createActor(escrowCanister[0])
                const newStats = await escrowActor.getStats()

                if (newStats?.nftNumber > 0) {
                    stats = {
                        nftNumber: Number(newStats.nftNumber),
                        nftPriceE8S: Number(newStats.nftPriceE8S),
                        endTime: Number(newStats.endTime),
                        nftsSold: Number(newStats.nftsSold),
                        openSubaccounts: Number(newStats.openSubaccounts),
                    }
                }
            }

            return {
                ...project,
                escrowActor,
                stats,
                owner,
            }
        },
        {
            refetchOnWindowFocus: false,
        }
    )

    if (isLoading || isError || isFetching || !project) {
        return (
            <div className='w-full bg-gray-50'>
                <Navbar />

                <Hero isLoading={true} />

                <Steps />

                <TabBar
                    selected={selectedTab}
                    onSelect={setTab}
                    isLoading={true}
                />

                {selectedTab === 'campaign-details' && (
                    <CampaignDetails isLoading={true} />
                )}
                {selectedTab === 'nft-collection' && <NFTCollection />}

                <Footer />
            </div>
        )
    }

    return (
        <div className='w-full bg-gray-50'>
            <Head>
                <title>{project.title} on CrowdFund NFT</title>
            </Head>
            <Navbar />

            <Hero project={project} />

            <Steps />

            <TabBar selected={selectedTab} onSelect={setTab} />

            {selectedTab === 'campaign-details' && (
                <CampaignDetails project={project} author={project.owner} />
            )}
            {selectedTab === 'nft-collection' && (
                <NFTCollection project={project} />
            )}
            {selectedTab === 'faqs' && <Faqs project={project} />}

            {selectedTab === 'activity' && (
                <Activity project={project} escrowActor={project.escrowActor} />
            )}

            <Footer />
        </div>
    )
}
