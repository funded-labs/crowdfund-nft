import { useBackend } from '@/context/backend'
import { data } from 'autoprefixer'
import useDebouncedState from 'hooks/useDebouncedState'
import Link from 'next/link'
import { useMemo } from "react"
import { useRouter } from "next/router"
import { useQuery } from 'react-query'

const VISIBLE_SEARCH_ITEMS = 5

const Search = () => {
    const [debouncedSearchTerm, setSearchTerm, searchTerm] = useDebouncedState(
        null,
        300
    )
    const { backend } = useBackend()
    const router = useRouter()

    const allStatuses = useMemo(() => {
        return ['whitelist', 'live', 'approved', 'fully_funded'].map((s) => s === null ? [] : [{ [s]: null }])
      }, [])

    const { data: foundProjects } = useQuery(
        ['find-projects-with-owner', debouncedSearchTerm, backend],
        async () => {
            if (!debouncedSearchTerm || !backend) return []

            const projects = await backend.listProjects(allStatuses, debouncedSearchTerm, [])
            return projects
        }
    )

    const renderSearchResults = () => {
        if (!foundProjects || foundProjects.length === 0) return

        return (
            <div className='origin-top-right absolute right-0 mt-2 w-80 p-3 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5'>
                <div>
                    {foundProjects
                        ?.slice(0, VISIBLE_SEARCH_ITEMS)
                        .map(({ project: { title, cover, id }, owner }) => {
                            return (
                                <Link
                                    href={`/project?projectId=${id}`}
                                    passHref={true}
                                    as={`/project.html?projectId=${id}`}
                                    key={id}>
                                    <a className='flex flex-row items-center rounded py-2 hover:bg-slate-100'>
                                        <img
                                            src={cover}
                                            className='w-12 h-12 ml-2 rounded-md object-cover'
                                        />
                                        <div className='ml-3'>
                                            <p className='text-gray-700 text-sm'>
                                                {title}
                                            </p>
                                            <p className='text-gray-400 text-sm'>
                                                by{' '}
                                                {`${owner.firstName} ${owner.lastName}`}
                                            </p>
                                        </div>
                                    </a>
                                </Link>
                            )
                        })}
                </div>
            </div>
        )
    }

    return (
        <div className='hidden md:block relative text-gray-600 ml-3'>
            <input
                className='border border-gray-100 bg-gray-100 h-8 px-2 rounded-lg text-sm focus:outline-none'
                type='search'
                name='search'
                placeholder='Search projects'
                value={searchTerm ?? ''}
                onChange={({ target: { value } }) => setSearchTerm(value)}
                onKeyDown={({ key }) => {
                    if (key === 'Enter') {
                        router.push(`/search?search=${searchTerm}`)
                        setSearchTerm()
                    }
                }}
            />
            {renderSearchResults()}
        </div>
    )
}

export default Search
