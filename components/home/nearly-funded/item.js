import classNames from "classnames";
import Link from "next/link";

export default function Item({ item }) {
    return (
        <Link href="/project/placeholder" passHref={true}>
            <a className="group w-full flex flex-col">
                <figure
                    className={classNames(
                        "h-32 w-full lg:rounded-lg group-hover:scale-105 duration-200",
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
            </a>
        </Link>
    );
}