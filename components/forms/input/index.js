export default function Input(props) {
  const { endItem: EndItem } = props

  return (
    <div className='mb-3'>
      {props.label && (
        <label htmlFor={props.name} className='mb-4 text-sm text-neutral-600'>
          {props.label}
        </label>
      )}
      <div className='border-1 relative mt-2 rounded-xl border border-neutral-300 bg-white py-3 px-3'>
        <input
          {...props}
          className={`
                        font-regular w-full appearance-none
                        rounded-none bg-white text-base  text-neutral-900 placeholder-neutral-500
                        focus:outline-none sm:text-sm
                    `}
        />
        {EndItem && (
          <div className='absolute top-0 right-0 flex h-full flex-col justify-center pr-4'>
            <EndItem />
          </div>
        )}
      </div>
    </div>
  )
}
