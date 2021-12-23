import Hero from "@/components/project/hero";
import Steps from "@/components/project/steps";
import Navbar from "@/components/shared/navbar";
import Tabs from "@/components/project/tabs";
import { useState } from "react";

export default function ProjectDetails() {
    const [selectedTab, setTab] = useState("campaign-details");

    return (
        <div className="w-full">
            <Navbar />

            <Hero />

            <Steps />
            
            <Tabs selected={selectedTab} onSelect={setTab} />

        </div>
    )
}