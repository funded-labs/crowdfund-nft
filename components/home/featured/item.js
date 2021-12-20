import classNames from "classnames";

export default function Item({ item }) {
    return (
        <div className="w-full flex flex-col">
            <figure
                className={classNames(
                    "h-32 w-full rounded-lg",
                    item.color
                )}
            >

            </figure>
            <div className="w-full flex flex-row justify-between text-sm mt-2">
                <p className="font-semibold">Comic Book Reboot</p>
                <p className="text-indigo-500">£5,000 goal</p>
            </div>
            <p className="text-sm text-indigo-500">
                67% Funded
            </p>
            <p className="text-gray-400 text-sm">
                by Alan Grey
            </p>
        </div>
    );
}