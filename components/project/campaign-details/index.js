import AuthorProfile from "./author-profile";
import Menu from "./menu";
import Story from "./story";

export default function CampaignDetails() {
    return (
        <div className="w-full bg-red-100">
            <div className="w-full max-w-5xl mx-auto px-4 flex flex-row py-4 space-x-4">
                <div className="w-3/12 flex flex-col space-y-4">
                    <Menu />
                    <AuthorProfile />
                </div>

                <div className="w-9/12 flex flex-col">
                    <Story />
                </div>
            </div>
        </div>
    )
}