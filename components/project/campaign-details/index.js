import AuthorProfile from "./author-profile";
import Menu from "./menu";
import Story from "./story";

export default function CampaignDetails({ isLoading, project }) {
    if (isLoading) {
        return (
            <div className="w-full">
                <div className="w-full max-w-5xl mx-auto px-4 flex flex-row py-4 space-x-4">
                    <div className="w-3/12 flex flex-col space-y-4">
                        <Menu isLoading={isLoading} />
                        <AuthorProfile isLoading={isLoading} />
                    </div>
    
                    <div className="w-9/12 flex flex-col">
                        <Story isLoading={true} />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="w-full max-w-5xl mx-auto px-4 flex flex-row py-4 space-x-4">
                <div className="w-3/12 flex flex-col space-y-4">
                    <Menu />
                    <AuthorProfile />
                </div>

                <div className="w-9/12 flex flex-col">
                    <Story project={project} />
                </div>
            </div>
        </div>
    )
}