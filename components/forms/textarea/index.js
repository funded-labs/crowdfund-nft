export default function Textarea(props) {
    return (
        <div className="w-full">
            {props.label && (
                <label htmlFor={props.name} className="text-xs text-gray-400">
                    {props.label}
                </label>
            )}
            <textarea
                {...props}
                className={`
                    appearance-none rounded-xl sm:text-sm border w-full py-3 px-3 bg-white
                    text-gray-700 placeholder-gray-400 text-base focus:outline-none
                    focus:bg-gray-100
                `}
            />
        </div>
    );
}