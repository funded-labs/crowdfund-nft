import Grid from './grid'
import { useQuery } from 'react-query'
import { useBackend } from '@/context/backend'
import { makeEscrowActor } from '@/ui/service/actor-locator'

export default function ProjectList({
  searchTerm,
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
    [queryName, backend, categories, searchTerm],
    async () => {
      if (!backend) return []

      let newData = {}

      const projects = await backend.listProjects(
        statuses
          ? statuses.map((s) => (s === null ? [] : [{ [s]: null }]))
          : [],
        searchTerm || '',
        categories || [],
      )

      newData.projects = projects.filter(
        (p) =>
          p.project.status.length === 0 ||
          !p.project.status[0].hasOwnProperty('submitted'),
      )

      let stats = {}
      projects.forEach(async (project) => {
        try {
          const newStats = await escrow.getProjectStats(
            parseInt(project.project.id),
          )
          stats[project.project.id] = newStats
        } catch (e) {
          //console.error(e)
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
    },
  )

  return (
    <section className='w-full py-5'>
      <div className='mx-auto mb-2 w-full max-w-5xl px-4 text-sm font-semibold uppercase text-gray-400'>
        {header}
      </div>
      {!isLoading &&
      (!projectData?.projects || projectData?.projects?.length === 0) ? (
        <div className='mx-auto w-full max-w-5xl px-4'>
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
