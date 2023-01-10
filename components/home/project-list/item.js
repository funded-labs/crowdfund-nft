import classNames from 'classnames'
import Link from 'next/link'
import { imgInt8ArrayToDataURL } from '@/helpers/imageHelper'

export default function Item({
  item,
  stats,
  isLoading = false,
  isLoadingStats = false,
}) {
  if (isLoading === true) {
    return (
      <a className='group flex w-full cursor-pointer flex-col'>
        <figure
          className={classNames(
            'h-32 w-full animate-pulse overflow-hidden lg:rounded-lg',
            'bg-gray-200',
          )}
        />
        <div className='mt-2 flex w-full flex-row justify-between text-sm'>
          <div className='h-5 w-32 animate-pulse rounded-lg bg-gray-200' />
          <div className='h-5 w-10 animate-pulse rounded-lg bg-gray-200' />
        </div>
        <div className='my-1 h-3 w-20 animate-pulse rounded-lg bg-gray-200' />
        <div className='my-1 h-3 w-20 animate-pulse rounded-lg bg-gray-200' />
      </a>
    )
  }

  const status = Object.keys(item.project?.status?.[0] || { archived: null })[0]

  const currency =
    Object.keys(
      item.project?.fundingType?.[0]?.[0] || {},
    )?.[0]?.toUpperCase() || 'ICP'

  return (
    <Link
      href={`/project?projectId=${item.project.id}`}
      passHref={true}
      as={`/project.html?projectId=${item.project.id}`}
    >
      <a className='group flex w-full cursor-pointer flex-col'>
        <figure
          className={classNames(
            'h-32 w-full overflow-hidden duration-200 group-hover:scale-105 lg:rounded-lg',
            'bg-blue-100',
          )}
        >
          <img
            src={item.project.cover}
            className='h-full w-full object-cover'
          />
        </figure>
        <div className='mt-2 flex w-full flex-row justify-between text-sm'>
          <p className='font-semibold'>{item.project.title}</p>
          <p className='text-indigo-500'>
            <img src='/assets/IClogo.png' className='inline-block h-2' />{' '}
            {item.project.goal} {currency} goal
          </p>
        </div>
        <p className='text-sm text-indigo-500'>
          {/* {isLoadingStats ||
                    stats?.[item.project.id]?.nftsSold === undefined ||
                    stats?.[item.project.id]?.nftPriceE8S === undefined
                        ? '- '
                        : stats[item.project.id].nftsSold *
                              stats[item.project.id].nftPriceE8S +
                          ' '}
                    ICP pledged */}
          <StatusText status={status} />
        </p>
        <p className='text-sm text-gray-400'>
          by {`${item.owner.firstName} ${item.owner.lastName}`}
        </p>
      </a>
    </Link>
  )
}

const StatusText = (props) => {
  switch (props.status) {
    case 'submitted':
      return 'Not yet approved'
    case 'approved':
      return 'Going live soon'
    case 'whitelist':
      return 'Open to whitelist'
    case 'live':
      return 'Live now'
    case 'fully_funded':
      return 'Fully funded!'
    case 'archived':
      return 'Archived'
    default:
      return '- '
  }
}
