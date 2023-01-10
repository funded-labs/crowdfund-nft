import Link from 'next/link'

export default function GuideItem({ guide }) {
  const { name, type, link } = guide

  if (type === 'external-link') {
    return (
      <a
        className='flex cursor-pointer flex-row items-center rounded-lg border bg-white py-3 px-6 font-medium shadow hover:text-blue-600'
        href={link}
        target='_blank'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='mr-3 h-6 w-6'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={2}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
          />
        </svg>
        <span>{name}</span>
      </a>
    )
  }

  return (
    <Link href={link} as={`${link}.html`}>
      <div className='flex cursor-pointer flex-row items-center rounded-lg border bg-white py-3 px-6 font-medium shadow hover:text-blue-600'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='mr-3 h-6 w-6'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={2}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
          />
        </svg>
        <span>{name}</span>
      </div>
    </Link>
  )
}
