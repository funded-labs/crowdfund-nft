export default function Select(props) {
    return (
        <select
            {...{ ...props, options: undefined }}
            className={`
                block w-full text-gray-700 py-3 px-3 border rounded-xl
                bg-white focus:outline-none sm:text-sm
            `}
        >
            {props.options && props.options.map(option => (
                <option key={option.value} value={option.value} disabled={option.disabled ? true : false}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}