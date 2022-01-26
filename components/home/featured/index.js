import Grid from './grid'
import { useQuery } from 'react-query'
import { useBackend } from '@/context/backend'

export default function Featured() {
    const { backend } = useBackend();

    const {
        data: projects,
        isLoading,
        isError,
        isFetching,
    } = useQuery(
        ['featured-projects', backend],
        async () => {
            if (!backend) return []

            const projects = await backend.listProjects([])
            console.log({ projects })
            return projects
        },
        {
            placeholderData: [],
            refetchOnWindowFocus: false,
        }
    )

    return (
        <section className='w-full py-10'>
            <div className='px-4 w-full max-w-5xl mx-auto text-gray-400 uppercase font-semibold text-sm mb-2'>
                Featured Projects
            </div>
            <Grid items={projects} isLoading={isLoading} />
        </section>
    )
}
