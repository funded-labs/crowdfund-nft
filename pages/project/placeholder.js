import Hero from "@/components/project/hero";
import Steps from "@/components/project/steps";
import Navbar from "@/components/shared/navbar";
import TabBar from "@/components/project/tab-bar";
import { useState } from "react";
import CampaignDetails from "@/components/project/campaign-details";

export default function ProjectDetails() {
    const [selectedTab, setTab] = useState("campaign-details");

    return (
        <div className="w-full">
            <Navbar />

            <Hero />

            <Steps />
            
            <TabBar selected={selectedTab} onSelect={setTab} />

            <CampaignDetails />
        </div>
    )
}