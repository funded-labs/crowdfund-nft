import AuthorProfile from './author-profile'
import Menu from './menu'
import Story from './story'
import Rewards from './rewards'

export default function CampaignDetails({ isLoading, project, author }) {
  if (isLoading) {
    return (
      <div className='w-full'>
        <div className='mx-auto flex w-full max-w-7xl flex-col space-y-4 px-4 py-4 md:flex-row md:space-y-0 md:space-x-4'>
          <div className='flex w-full flex-col'>
            <Story isLoading={true} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='w-full'>
      <div className='mx-auto flex w-full max-w-7xl flex-col space-y-4 px-4 py-4 md:flex-row md:space-y-0 md:space-x-4'>
        <div className='flex w-full flex-col space-y-4 md:w-3/12'>
          <Menu />
          <AuthorProfile author={author} />
        </div>

        <div className='flex w-full flex-col space-y-8 md:w-9/12'>
          <Story project={project} />
          <Rewards project={project} />
        </div>
      </div>
    </div>
  )
}
