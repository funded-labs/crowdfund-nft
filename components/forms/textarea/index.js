export default function Textarea(props) {
  return (
    <div className='w-full'>
      {props.label && (
        <label htmlFor={props.name} className='text-xs text-gray-400'>
          {props.label}
        </label>
      )}
      <textarea
        {...props}
        className={`
                    w-full appearance-none rounded-xl border bg-white py-3 px-3 text-base
                    text-gray-700 placeholder-gray-400 focus:bg-gray-100 focus:outline-none
                    sm:text-sm
                `}
      />
    </div>
  )
}
