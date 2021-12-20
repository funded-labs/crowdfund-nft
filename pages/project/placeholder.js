import Hero from "@/components/project/hero";
import Steps from "@/components/project/steps";
import Navbar from "@/components/shared/navbar";

export default function ProjectDetails() {
    return (
        <div className="w-full">
            <Navbar />

            <Hero />

            <Steps />

        </div>
    )
}