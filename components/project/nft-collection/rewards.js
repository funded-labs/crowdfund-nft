export default function Rewards({ isLoading, project }) {
  if (isLoading) {
    return (
      <div className='flex w-full flex-col items-start space-y-2 rounded-2xl bg-white p-8 shadow'>
        <div className='h-6 w-16 animate-pulse rounded bg-gray-200' />

        <div className='h-4 w-full animate-pulse rounded bg-gray-200' />
        <div className='h-4 w-full animate-pulse rounded bg-gray-200' />
        <div className='h-4 w-full animate-pulse rounded bg-gray-200' />
        <div className='h-4 w-7/12 animate-pulse rounded bg-gray-200' />

        <div className='py-5' />

        <div className='h-4 w-full animate-pulse rounded bg-gray-200' />
        <div className='h-4 w-full animate-pulse rounded bg-gray-200' />
        <div className='h-4 w-4/12 animate-pulse rounded bg-gray-200' />
      </div>
    )
  }

  const { rewards } = project

  return (
    <div className='flex w-full flex-col items-start rounded-2xl bg-white p-8 shadow'>
      <p className='text-2xl font-bold text-black'>Rewards</p>

      <div
        className='font-regular my-4 whitespace-pre-line whitespace-pre-wrap text-neutral-600'
        dangerouslySetInnerHTML={{ __html: rewards }}
      />
    </div>
  )
}
