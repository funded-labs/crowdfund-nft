import Grid from './grid'
import { useQuery } from 'react-query'
import { useBackend } from '@/context/backend'

export default function LiveSoon() {
    const { backend } = useBackend()

    const {
        data: projectData,
        isLoading,
        isError,
        isFetching,
    } = useQuery(
        ['live-soon-projects', backend],
        async () => {
            if (!backend) return []

            let newData = {}

            const projects = await backend.listProjects([[{ approved: null }]])
            newData.projects = projects

            console.log(projects)

            let stats = {}
            projects.forEach(async (project) => {
                console.log(project.project.id)
                try {
                    const newStats = await escrow.getProjectStats(
                        parseInt(project.project.id)
                    )
                    stats[project.project.id] = newStats
                } catch (e) {
                    stats[project.project.id] = {
                        nftsSold: 0,
                        nftPriceE8S: 0,
                    }
                }
            })
            newData.stats = stats

            return newData
        },
        {
            placeholderData: { projects: [], stats: {} },
            refetchOnWindowFocus: false,
        }
    )

    return (
        <section className='w-full py-5 mb-10'>
            <div className='px-4 w-full max-w-5xl mx-auto text-gray-400 uppercase font-semibold text-sm mb-2'>
                Projects Going Live Soon
            </div>
            {!isLoading &&
            (!projectData?.projects || projectData?.projects.length === 0) ? (
                <div className='px-4 w-full max-w-5xl mx-auto'>
                    No projects going live soon
                </div>
            ) : (
                <Grid
                    items={projectData.projects}
                    stats={projectData.stats}
                    isLoading={isLoading}
                />
            )}
        </section>
    )
}
