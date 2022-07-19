import Hero from "@/components/manage-project/hero";
import ActivityTable from "../activity-table";
import NftRewardsTracking from "../nft-rewards-tracking";

export default function MyProject() {
    return (
        <div className="w-full flex flex-col space-y-4">
            <div className='w-full rounded-2xl shadow bg-white overflow-hidden'>
                <Hero />
            </div>

            <div className='w-full rounded-2xl shadow bg-white overflow-hidden'>
                <ActivityTable />
            </div>
        </div>
    )
}