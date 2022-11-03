export default function Input(props) {
    const { endItem: EndItem } = props;

    return (
        <div className="mb-3">
            {props.label && (
                <label htmlFor={props.name} className="text-xs text-neutral-600">
                    {props.label}
                </label>
            )}
            <div className="relative border border-neutral-500 border-1 rounded-xl py-3 px-3 bg-white">
                <input
                    {...props}
                    className={`
                        appearance-none sm:text-sm rounded-none
                        w-full text-neutral-700 font-semibold bg-white placeholder-neutral-500
                        text-base focus:outline-none
                    `}
                />
                {EndItem && (
                    <div className="absolute top-0 right-0 h-full flex flex-col justify-center pr-4">
                        <EndItem />
                    </div>
                )}
            </div>
        </div>
    )
}