import Hero from "@/components/project/hero";
import { useProjectDetails } from "hooks/use-project/useProjectDetails";
import Link from "next/link";
import { useRouter } from "next/router";
import ActivityTable from "../activity-table";

export default function MyProject() {
    const { query } = useRouter()
    const { projectId } = query

    const {
        data: project,
        isLoading,
        isError,
        isFetching,
    } = useProjectDetails(projectId)

    const renderButton = (title, href, as, primary) => (
        <Link href={href} as={as}>
            <button
                className={`
                    flex flex-row justify-center w-full bg-blue-${primary ? '800' : '500'} text-white py-3 
                    px-4 mx-2 font-medium text-base tracking-wider rounded-xl
                    shadow-xl hover:bg-blue-700`
                }
            >
                {title}
            </button>
        </Link>
    )

    return (
        <div className="w-full flex flex-col space-y-4">
            <div className='w-full rounded-2xl shadow bg-white overflow-hidden'>
                <Hero isLoading={isLoading} project={project} adminView/>
                <div className="flex flex-row p-3">
                    {renderButton('View project page', `/project?projectId=${projectId}`, `/project.html?projectId=${projectId}`, true)}
                    {renderButton('Edit project', `/edit-project?projectId=${projectId}`, `/edit-project.html?projectId=${projectId}`)}
                </div>
            </div>
        </div>
    )
}
