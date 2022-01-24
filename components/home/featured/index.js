import { useEffect, useState } from 'react'
import Grid from './grid'
import { makeBackendActor } from '@/ui/service/actor-locator'
import { useQuery } from 'react-query'

export default function Featured() {
    const [backend, setBackend] = useState(null)

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

    useEffect(() => {
        setBackend(makeBackendActor())
    }, [])

    return (
        <section className='w-full py-10'>
            <div className='px-4 w-full max-w-5xl mx-auto text-gray-400 uppercase font-semibold text-sm mb-2'>
                Featured Projects
            </div>
            <Grid items={projects} isLoading={isLoading} />
        </section>
    )
}
