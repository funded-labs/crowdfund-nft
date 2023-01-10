export default function StaticPageHeader({ title, description }) {
  return (
    <header className='relative flex w-full flex-col md:h-96 lg:flex-row lg:space-x-5 lg:bg-gray-100 lg:bg-opacity-100'>
      <img src='/assets/radiant-gradient.svg' className='w-full object-cover' />
      <div className='absolute top-0 left-0 flex h-full w-full flex-col justify-center px-4 py-10 text-white'>
        <div className='mx-auto w-full max-w-prose'>
          <h1 className='mb-5 text-3xl font-bold lg:text-5xl'>{title}</h1>

          <p className='mb-10 font-light text-gray-200 md:text-xl'>
            {description}
          </p>
        </div>
      </div>
    </header>
  )
}
