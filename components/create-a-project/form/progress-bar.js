import classNames from "classnames"

export default function ProgressBar({ step }) {
    return (
        <div className="w-full grid grid-cols-5 gap-x-2">
            <div
                className={classNames(
                    "h-1 w-full bg-gray-300 w-full",
                    step === 1 ? "bg-blue-600" : null,
                    step === 2 ? "bg-blue-600" : null,
                    step === 3 ? "bg-blue-600" : null,
                    step === 4 ? "bg-blue-600" : null,
                    step === 5 ? "bg-blue-600" : null
                )}
            />
            <div
                className={classNames(
                    "h-1 w-full bg-gray-300 w-full",
                    step === 2 ? "bg-blue-600" : null,
                    step === 3 ? "bg-blue-600" : null,
                    step === 4 ? "bg-blue-600" : null,
                    step === 5 ? "bg-blue-600" : null
                )}
            />
            <div
                className={classNames(
                    "h-1 w-full bg-gray-300 w-full",
                    step === 3 ? "bg-blue-600" : null,
                    step === 4 ? "bg-blue-600" : null,
                    step === 5 ? "bg-blue-600" : null
                )}
            />
            <div
                className={classNames(
                    "h-1 w-full bg-gray-300 w-full",
                    step === 4 ? "bg-blue-600" : null,
                    step === 5 ? "bg-blue-600" : null
                )}
            />
            <div
                className={classNames(
                    "h-1 w-full bg-gray-300 w-full",
                    step === 5 ? "bg-blue-600" : null
                )}
            />
        </div>
    )
}