import classNames from "classnames"

export default function ProgressBar({ step }) {
    return (
        <div className="w-full grid grid-cols-7 gap-x-2">
            <div
                className={classNames(
                    "h-1 w-full bg-blue-600 "
                )}
            />
            <div
                className={classNames(
                    "h-1 w-full w-full",
                    step > 1 ? "bg-blue-600" : "bg-neutral-300"
                )}
            />
            <div
                className={classNames(
                    "h-1 w-full w-full",
                    step > 2 ? "bg-blue-600" : "bg-neutral-300"
                )}
            />
            <div
                className={classNames(
                    "h-1 w-full w-full",
                    step > 3 ? "bg-blue-600" : "bg-neutral-300"
                )}
            />
            <div
                className={classNames(
                    "h-1 w-full w-full",
                    step > 4 ? "bg-blue-600" : "bg-neutral-300"
                )}
            />
            <div
                className={classNames(
                    "h-1 w-full w-full",
                    step > 5 ? "bg-blue-600" : "bg-neutral-300"
                )}
            />
            <div
                className={classNames(
                    "h-1 w-full w-full",
                    step > 6 ? "bg-blue-600" : "bg-neutral-300"
                )}
            />
        </div>
    )
}