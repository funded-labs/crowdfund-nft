import Link from 'next/link'
import { imgInt8ArrayToDataURL } from '@/helpers/imageHelper'

export default function AuthorProfile({ isLoading, author }) {
    if (isLoading) {
        return (
            <div className='w-full animate-pulse rounded-2xl bg-gray-200 h-64' />
        )
    }

    const { firstName, lastName, bio } = author

    return (
        <div className='w-full shadow p-4 rounded-2xl bg-white flex flex-col items-center'>
            <figure className='rounded-full w-14 h-14 bg-gray-300 overflow-hidden'>
                {author.img && author.img !== '' && <img src={author.img} />}
            </figure>
            <div className='flex flex-col items-start w-full mt-4'>
                <p className='font-semibold text-black text-lg'>
                    {firstName} {lastName}
                </p>
                {/* <p className='font-medium text-black text-sm mb-3'>
                    1 project created
                </p> */}
                <div className='text-gray-500 text-xs whitespace-pre-line whitespace-pre-wrap' dangerouslySetInnerHTML={{ __html: bio }}/>
                {/* <Link href="/author/placeholder">
                    <a className="font-bold text-blue-500 text-xs mt-1 py-1 px-2 hover:bg-gray-100 rounded">
                        See more
                    </a>
                </Link> */}
            </div>
        </div>
    )
}
