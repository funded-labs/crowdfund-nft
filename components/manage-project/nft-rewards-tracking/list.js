import classNames from "classnames";

export function List({ items = [] }) {
    return (
        <div className="w-full flex flex-col space-y-4">
            {items.map(item => (
                <article key={item.id} className="w-full flex flex-row space-x-4">
                    <div className="w-60 h-60 shrink-0 rounded bg-gray-300 overflow-hidden rounded">
                        <img className="object-cover h-full w-full" src={item.thumbUrl} />
                    </div>
                    <div className="w-full flex flex-col">
                        <p className="font-semibold text-lg">
                            Rewards
                        </p>
                        <div className="w-full grid grid-cols-1 gap-2">
                            {item.rewards.map(reward => (
                                <div
                                    className={classNames(
                                        "flex flex-row justify-between py-2 items-center",
                                        reward.redeemedAt !== null ? "" : null
                                    )}
                                >
                                    <span>
                                        {reward.title}
                                    </span>
                                    <button
                                        className={classNames(
                                            "text-xs px-2 py-1 uppercase rounded-lg",
                                            "focus:outline-none border border-transparent",
                                            reward.redeemedAt !== null ? "bg-blue-600 text-white font-semibold" : "text-gray-500",
                                            reward.redeemedAt === null ? "hover:border-gray-300" : ""
                                        )}
                                        disabled={reward.redeemedAt !== null}
                                        type="button"
                                    >
                                        {reward.redeemedAt !== null ? `Redeemed` : `Mark as redeemed`}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </article>
            ))}
        </div>
    )
}