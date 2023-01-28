import Input from '@/components/forms/input'
import classNames from 'classnames'
import { XIcon } from '@heroicons/react/outline'

export default function TierCard({
  tier,
  index,
  fundingType,
  error,
  removeTier,
  changeTier,
  handleBlur,
}) {
  return (
    <div className='col-span-6 flow-root rounded-lg bg-slate-200 py-4 px-4 shadow-md shadow-gray-300 hover:cursor-pointer xl:col-span-3 2xl:col-span-2'>
      <div className='flex w-full'>
        <div className='mb-2 flex w-3/5 text-2xl font-bold text-neutral-900'>
          Tier {index + 1}
        </div>
        <div className='flex w-2/5 justify-end'>
          <XIcon
            onClick={removeTier}
            className='h-7 text-gray-400 hover:text-gray-500'
          />
        </div>
      </div>

      <p className='pt-2 font-sans text-sm font-normal text-neutral-700'>
        NFT price:
      </p>
      <div className='flex w-full flex-wrap'>
        <Input
          name='tiers'
          value={tier.price}
          onChange={changeTier('price')}
          onBlur={handleBlur}
          placeholder='Enter target amount'
          type='number'
        />
        <div className='my-auto ml-2 flex'>
          <img
            src={`assets/${fundingType}.svg`}
            className={classNames(
              'my-auto mr-2',
              fundingType === 'eth' ? 'h-7' : 'h-5',
            )}
          />
          <p className='text-lg font-bold text-neutral-900'>
            {fundingType.toUpperCase()}
          </p>
        </div>

        {error && error.length > 0 && (
          <div className='flex w-full flex-row items-center text-xs text-red-500'>
            {error[index] && error[index].price && <p>{error[index].price}</p>}
          </div>
        )}
      </div>

      <p className='pt-2 font-sans text-sm font-normal text-neutral-700'>
        Number of NFTs:
      </p>
      <Input
        name='tiers'
        value={tier.count}
        onChange={changeTier('count')}
        onBlur={handleBlur}
        placeholder='Enter target amount'
        type='number'
      />

      {error && error.length > 0 && (
        <div className='flex w-full flex-row items-center text-xs text-red-500'>
          {error[index] && error[index].count && <p>{error[index].count}</p>}
        </div>
      )}
    </div>
  )
}
