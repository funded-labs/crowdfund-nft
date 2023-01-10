import Hero from '@/components/project/hero'
import { useProjectDetails } from 'hooks/use-project/useProjectDetails'
import Link from 'next/link'
import { useRouter } from 'next/router'
import ActivityTable from '../activity-table'

export default function MyProject() {
  const { query } = useRouter()
  const { projectId } = query

  const { data: project, isLoading } = useProjectDetails(projectId)

  const renderButton = (title, href, as, primary) => (
    <Link href={href} as={as}>
      <button
        className={`
                    flex w-full flex-row justify-center bg-blue-${
                      primary ? '700' : '500'
                    } mx-2 rounded-xl 
                    py-3 px-4 text-base font-medium tracking-wider text-white
                    shadow-xl hover:bg-blue-700`}
      >
        {title}
      </button>
    </Link>
  )

  return (
    <div className='flex w-full flex-col space-y-4'>
      <div className='w-full overflow-hidden rounded-2xl bg-white shadow'>
        <Hero isLoading={isLoading} project={project} adminView />
        <div className='flex flex-row p-3'>
          {renderButton(
            'View project page',
            `/project?projectId=${projectId}`,
            `/project.html?projectId=${projectId}`,
            true,
          )}
          {renderButton(
            'Edit project',
            `/edit-project?projectId=${projectId}`,
            `/edit-project.html?projectId=${projectId}`,
          )}
        </div>
      </div>
    </div>
  )
}
