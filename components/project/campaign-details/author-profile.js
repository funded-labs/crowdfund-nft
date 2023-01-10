import Link from 'next/link'
import { imgInt8ArrayToDataURL } from '@/helpers/imageHelper'

export default function AuthorProfile({ isLoading, author }) {
  if (isLoading) {
    return <div className='h-64 w-full animate-pulse rounded-2xl bg-gray-200' />
  }

  const { firstName, lastName, bio } = author

  return (
    <div className='flex  w-full flex-col  items-start rounded-2xl p-4'>
      <figure className='h-14 w-14 overflow-hidden rounded-full bg-gray-300'>
        {author.img && author.img !== '' && <img src={author.img} />}
      </figure>
      <div className='mt-4 flex w-full flex-col items-start'>
        <p className='text-lg font-semibold text-black'>
          {firstName} {lastName}
        </p>
        {/* <p className='font-medium text-black text-sm mb-3'>
                    1 project created
                </p> */}
        <div
          className='whitespace-pre-line whitespace-pre-wrap text-xs text-gray-500'
          dangerouslySetInnerHTML={{ __html: bio }}
        />
        {/* <Link href="/author/placeholder">
                    <a className="font-bold text-blue-500 text-xs mt-1 py-1 px-2 hover:bg-gray-100 rounded">
                        See more
                    </a>
                </Link> */}
      </div>
    </div>
  )
}
