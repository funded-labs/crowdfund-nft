import Hero from "@/components/project/hero";
import Steps from "@/components/project/steps";
import Navbar from "@/components/shared/navbar";
import TabBar from "@/components/project/tab-bar";
import { useState } from "react";
import CampaignDetails from "@/components/project/campaign-details";
import NFTCollection from "@/components/project/nft-collection";
import Footer from "@/components/shared/footer";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { useBackend } from "@/context/backend";

export default function ProjectDetails() {
    const [selectedTab, setTab] = useState("campaign-details");
    const router = useRouter();
    const { projectId } = router.query;
    const { backend } = useBackend();

    const {
        data: project,
        isLoading,
        isError,
        isFetching,
    } = useQuery(
        ['featured-projects', projectId, backend],
        async () => {
            if (!backend) return null;
            if (!projectId) return null;

            return null;

            const projects = await backend.listProjects([])
            console.log({ projects })
            return projects[0].project;
        },
        {
            refetchOnWindowFocus: false,
        }
    );

    if (isLoading || isError || isFetching || !project) {
        return (
            <div className="w-full bg-gray-50">
                <Navbar />
    
                <Hero isLoading={true} />
    
                <Steps />
                
                <TabBar selected={selectedTab} onSelect={setTab} isLoading={true} />
    
                {selectedTab === "campaign-details" && (<CampaignDetails isLoading={true} />)}
                {selectedTab === "nft-collection" && (<NFTCollection />)}
    
                <Footer />
            </div>
        )
    }

    return (
        <div className="w-full bg-gray-50">
            <Navbar />

            <Hero />

            <Steps />
            
            <TabBar selected={selectedTab} onSelect={setTab} />

            {selectedTab === "campaign-details" && (<CampaignDetails />)}
            {selectedTab === "nft-collection" && (<NFTCollection />)}

            <Footer />
        </div>
    );
}