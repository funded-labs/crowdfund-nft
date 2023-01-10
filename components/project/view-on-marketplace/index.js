export default function ViewOnMarketplace({ project }) {
  const { marketplace } = project

  if (
    !project?.status?.[0]?.hasOwnProperty('fully_funded') ||
    !Array.isArray(marketplace) ||
    !marketplace.some((e) => e.hasOwnProperty('entrepot'))
  )
    return <></>

  const link = marketplace.find((e) => e.hasOwnProperty('entrepot')).entrepot
  return (
    <div className='flex w-full flex-col space-y-2'>
      <a
        href={link}
        target='_blank'
        className='mx-1 flex h-12 cursor-pointer flex-row justify-center overflow-hidden rounded-lg border-2 border-emerald-300 bg-transparent py-1 px-2 text-sm font-bold leading-10 text-emerald-400 hover:opacity-75'
      >
        Trade on
        <img
          src='/assets/entrepot-logo.png'
          className='ml-2 h-full object-contain py-1'
        />
      </a>
    </div>
  )
}
