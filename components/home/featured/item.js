import classNames from 'classnames'
import Link from 'next/link'
import { imgInt8ArrayToDataURL } from '../../../helpers/imageHelper'

export default function Item({ item, isLoading = false }) {
    if (isLoading === true) {
        return (
            <a className='group w-full flex flex-col cursor-pointer'>
                <figure
                    className={classNames(
                        'h-32 w-full lg:rounded-lg animate-pulse overflow-hidden',
                        'bg-gray-200'
                    )}
                />
                <div className='w-full flex flex-row justify-between text-sm mt-2'>
                    <div className='h-5 bg-gray-200 w-32 rounded-lg animate-pulse' />
                    <div className='h-5 bg-gray-200 w-10 rounded-lg animate-pulse' />
                </div>
                <div className='h-3 w-20 rounded-lg bg-gray-200 animate-pulse my-1' />
                <div className='h-3 w-20 rounded-lg bg-gray-200 animate-pulse my-1' />
            </a>
        )
    }

    return (
        <Link href={`/project/${item.project.id}`} passHref={true}>
            <a className='group w-full flex flex-col cursor-pointer'>
                <figure
                    className={classNames(
                        'h-32 w-full lg:rounded-lg group-hover:scale-105 duration-200 overflow-hidden',
                        'bg-blue-100'
                    )}>
                    <img
                        src={
                            item.project.coverImg.length > 0
                                ? imgInt8ArrayToDataURL(item.project.coverImg)
                                : item.project.coverImgUrl
                        }
                        className='w-full h-full object-cover'
                    />
                </figure>
                <div className='w-full flex flex-row justify-between text-sm mt-2'>
                    <p className='font-semibold'>{item.project.title}</p>
                    <p className='text-indigo-500'>{item.project.goal} ICP goal</p>
                </div>
                <p className='text-sm text-indigo-500'>{Math.floor(item.project.goal*0.42)} ICP pledged</p>
                <p className='text-gray-400 text-sm'>
                    by {`${item.owner.firstName} ${item.owner.lastName}`}
                </p>
            </a>
        </Link>
    )
}
