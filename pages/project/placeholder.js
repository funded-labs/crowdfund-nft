import Hero from "@/components/project/hero";
import Steps from "@/components/project/steps";
import Navbar from "@/components/shared/navbar";
import TabBar from "@/components/project/tab-bar";
import { useState } from "react";
import CampaignDetails from "@/components/project/campaign-details";
import NFTCollection from "@/components/project/nft-collection";
import Footer from "@/components/shared/footer";

export default function ProjectDetails() {
    const [selectedTab, setTab] = useState("campaign-details");

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
    );
}