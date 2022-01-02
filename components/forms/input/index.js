export default function Input(props) {
    return (
        <div className="mb-3">
            {props.label && (
                <label htmlFor={props.name} className="text-xs text-gray-400">
                    {props.label}
                </label>
            )}
            <input
                {...props}
                className={`
                    appearance-none sm:text-sm border rounded-xl
                    w-full py-3 px-3 bg-white text-gray-700 placeholder-gray-400
                    text-base focus:outline-none focus:bg-gray-100
                `}
            />
        </div>
    )
}