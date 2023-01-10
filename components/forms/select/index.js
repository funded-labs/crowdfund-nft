export default function Select(props) {
  return (
    <select
      {...{ ...props, options: undefined }}
      className={`
                block w-full rounded-xl border bg-white py-3 px-3
                text-gray-700 focus:outline-none sm:text-sm
            `}
    >
      {props.options &&
        props.options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled ? true : false}
          >
            {option.label}
          </option>
        ))}
    </select>
  )
}
