import Input from '@/components/forms/input'
import classNames from 'classnames'
import { XIcon } from '@heroicons/react/outline'

export default function TierCard(props) {
  return (
    <div className='mt-4 grid w-full grid-cols-6 gap-4'>
      {props.values.tiers.map((tier, index) => (
        <div
          key={`tier-${index}`}
          className='col-span-6 flow-root rounded-lg bg-slate-200 py-4 px-4 shadow-md shadow-gray-300 hover:cursor-pointer xl:col-span-3 2xl:col-span-2'
        >
          <div className='flex w-full'>
            <div className='mb-2 flex w-3/5 text-2xl font-bold text-neutral-900'>
              Tier {index + 1}
            </div>
            <div className='flex w-2/5 justify-end'>
              <XIcon
                onClick={() => {
                  const tiers = [...props.values.tiers]
                  tiers.splice(index, 1)
                  props.setFieldValue('tiers', tiers)
                }}
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
              onChange={(e) => {
                const tiers = [...props.values.tiers]
                tiers[index].price = e.currentTarget.value
                props.setFieldValue('tiers', tiers)
              }}
              onBlur={props.handleBlur}
              placeholder='Enter target amount'
              type='number'
            />
            <div className='my-auto ml-2 flex'>
              <img
                src={`assets/${props.project.fundingType}.svg`}
                className={classNames(
                  'my-auto mr-2',
                  props.project.fundingType === 'eth' ? 'h-7' : 'h-5',
                )}
              />
              <p className='text-lg font-bold text-neutral-900'>
                {props.project.fundingType.toUpperCase()}
              </p>
            </div>

            {props.errors.tiers && props.errors.tiers.length > 0 && (
              <div className='flex w-full flex-row items-center text-xs text-red-500'>
                {props.errors.tiers[index] &&
                  props.errors.tiers[index].price && (
                    <p>{props.errors.tiers[index].price}</p>
                  )}
              </div>
            )}
          </div>

          <p className='pt-2 font-sans text-sm font-normal text-neutral-700'>
            Number of NFTs:
          </p>
          <Input
            name='tiers'
            value={tier.count}
            onChange={(e) => {
              const tiers = [...props.values.tiers]
              tiers[index].count = e.currentTarget.value
              props.setFieldValue('tiers', tiers)
            }}
            onBlur={props.handleBlur}
            placeholder='Enter target amount'
            type='number'
          />

          {props.errors.tiers && props.errors.tiers.length > 0 && (
            <div className='flex w-full flex-row items-center text-xs text-red-500'>
              {props.errors.tiers[index] && props.errors.tiers[index].count && (
                <p>{props.errors.tiers[index].count}</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
