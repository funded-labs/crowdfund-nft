import Grid from './grid'
import { useQuery } from 'react-query'
import { useBackend } from '@/context/backend'
import { makeEscrowActor } from '@/ui/service/actor-locator'

export default function ProjectList({
    categories,
    header,
    queryName,
    statuses,
}) {
    // e.g. "Fully funded projects", ["fully_funded"]
    const { backend } = useBackend()
    const escrow = makeEscrowActor()

    const {
        data: projectData,
        isLoading,
        isError,
        isFetching,
    } = useQuery(
        [queryName, backend],
        async () => {
            if (!backend) return []

            let newData = {}

            const projects = (
                await backend.listProjects(
                    statuses
                        ? statuses.map((s) =>
                              s === null ? [] : [{ [s]: null }]
                          )
                        : []
                )
            )
                .filter(
                    (p) =>
                        categories === undefined ||
                        (Array.isArray(categories) &&
                            categories.includes(p.project.category))
                )
                .filter(
                    (p) =>
                        Object.keys(
                            p.project?.status?.[0] || { submitted: null }
                        )[0] !== 'submitted'
                )
            console.log(projects)
            newData.projects = projects

            let stats = {}
            projects.forEach(async (project) => {
                try {
                    const newStats = await escrow.getProjectStats(
                        parseInt(project.project.id)
                    )
                    stats[project.project.id] = newStats
                } catch (e) {
                    console.error(e)
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
        <section className='w-full py-5'>
            <div className='px-4 w-full max-w-5xl mx-auto text-gray-400 uppercase font-semibold text-sm mb-2'>
                {header}
            </div>
            {!isLoading &&
            (!projectData?.projects || projectData?.projects?.length === 0) ? (
                <div className='px-4 w-full max-w-5xl mx-auto'>
                    No projects in this section
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
