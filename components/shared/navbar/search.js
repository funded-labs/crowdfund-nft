import { useBackend } from '@/context/backend'
import { data } from 'autoprefixer'
import useDebouncedState from 'hooks/useDebouncedState'
import Link from 'next/link'
import { useMemo } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

const VISIBLE_SEARCH_ITEMS = 5

const Search = () => {
  const [debouncedSearchTerm, setSearchTerm, searchTerm] = useDebouncedState(
    null,
    300,
  )
  const { backend } = useBackend()
  const router = useRouter()

  const allStatuses = useMemo(() => {
    return ['whitelist', 'live', 'approved', 'fully_funded'].map((s) =>
      s === null ? [] : [{ [s]: null }],
    )
  }, [])

  const { data: foundProjects } = useQuery(
    ['find-projects-with-owner', debouncedSearchTerm, backend],
    async () => {
      if (!debouncedSearchTerm || !backend) return []

      const projects = await backend.listProjects(
        allStatuses,
        debouncedSearchTerm,
        [],
      )
      return projects
    },
  )

  const renderSearchResults = () => {
    if (!foundProjects || foundProjects.length === 0) return

    return (
      <div className='absolute right-0 mt-2 w-80 origin-top-right rounded-md bg-white p-3 shadow-lg ring-1 ring-black ring-opacity-5'>
        <div>
          {foundProjects
            ?.slice(0, VISIBLE_SEARCH_ITEMS)
            .map(({ project: { title, cover, id }, owner }) => {
              return (
                <Link
                  href={`/project?projectId=${id}`}
                  passHref={true}
                  as={`/project.html?projectId=${id}`}
                  key={id}
                >
                  <a className='flex flex-row items-center rounded py-2 hover:bg-slate-100'>
                    <img
                      src={cover}
                      className='ml-2 h-12 w-12 rounded-md object-cover'
                    />
                    <div className='ml-3'>
                      <p className='text-sm text-gray-700'>{title}</p>
                      <p className='text-sm text-gray-400'>
                        by {`${owner.firstName} ${owner.lastName}`}
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
    <div className='relative ml-3 hidden text-gray-600 md:block'>
      <input
        className='h-8 rounded-lg border border-gray-100 bg-gray-100 px-2 text-sm focus:outline-none'
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
