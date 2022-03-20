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

export default function ProjectDetails() {
    const [selectedTab, setTab] = useState('campaign-details')
    const router = useRouter()
    const { projectId } = router.query
    const { backend } = useBackend();
    const escrowActor = makeEscrowActor()

    const {
        data: project,
        isLoading,
        isError,
        isFetching,
    } = useQuery(
        ['project-details', projectId, backend, escrowActor],
        async () => {
            if (!backend) return null
            if (!projectId) return null
            if (!escrowActor) return null

            const { project, owner } = await backend.getProjectWithOwner(
                projectId
            );
            
            const newStats = await escrowActor.getProjectStats(+project.id)
        
            let stats = {}

            if (newStats?.nftNumber > 0) {
                stats = {
                    nftNumber: +newStats.nftNumber,
                    nftPriceE8S: +newStats.nftPriceE8S,
                    endTime: +newStats.endTime,
                    nftsSold: + newStats.nftsSold,
                    openSubaccounts: +newStats.openSubaccounts
                }
            }
            else {
                stats = {
                    nftNumber: +project.nftVolume,
                    nftPriceE8S:
                    Number(BigInt(project?.goal) / project?.nftVolume) *
                    100_000_000,
                    endTime: 0,
                    nftsSold: 0,
                    openSubaccounts: 0,
                }
            }

            return {
                ...project,
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

            <Footer />
        </div>
    )
}
