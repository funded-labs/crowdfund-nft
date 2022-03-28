import GuideItem from "./guide-item";
import guides from "./guides";

export default function UserGuides() {
    return (
        <section className="w-full py-10 bg-white text-gray-700">
            <div className="w-full max-w-5xl mx-auto flex flex-col px-4">
                <div className="font-semibold text-3xl w-full text-left py-3">
                    Guides
                </div>
                <p className="w-full text-left text-sm">
                    Detailed guides on becoming a project creator on CrowdFund NFT
                </p>
                <div className="w-full py-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12">
                    {guides.map((guide, index) => (
                        <GuideItem key={index} guide={guide} />
                    ))}
                </div>
            </div>
        </section>
    );
}