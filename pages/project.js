import Hero from '@/components/project/hero'
import Steps from '@/components/project/steps'
import Navbar from '@/components/shared/navbar'
import TabBar from '@/components/project/tab-bar'
import { useState } from 'react'
import CampaignDetails from '@/components/project/campaign-details'
import NFTCollection from '@/components/project/nft-collection'
import Footer from '@/components/shared/footer'
import { useRouter } from 'next/router'
import Faqs from '@/components/project/faqs'
import Head from 'next/head'
import Activity from '@/components/project/activity'
import { useProjectDetails } from 'hooks/use-project/useProjectDetails'

export default function ProjectDetails() {
    const [selectedTab, setTab] = useState('campaign-details')
    const router = useRouter()
    const { projectId } = router.query

    const {
        data: project,
        isLoading,
        isError,
        isFetching,
    } = useProjectDetails(projectId)

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
