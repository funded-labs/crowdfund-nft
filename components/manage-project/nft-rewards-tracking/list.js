import classNames from "classnames";
import {tokenIdentifierFromIndex} from "@/helpers/tokenid";
import {createActor} from '../../../hooks/use-project';

export function List({ rewards = [], tokens=[], selectedToken='', nftCanister }) {
    if (rewards.length === 0 && tokens.length === 0) {
        return <></>
    }

    function setRewardRedeemed(tokenIndex, rewardIndex, value) {
        const actor = createActor(
           process.env.NODE_ENV !== 'production'
                ? 'qjdve-lqaaa-aaaaa-aaaeq-cai' // local test nft canister
                : nftCanister
        )
        const tokenIdentifier = tokenIdentifierFromIndex(nftCanister, tokenIndex)
        console.log(tokenIdentifier)
        return actor.setRewardRedeemed(tokenIdentifier, rewardIndex, value).catch((err) => {
            console.log("set reward error: ", err)
        })
    }

    return (
        <div className="w-full flex flex-col space-y-4">
            {tokens.map((item, index) => ((selectedToken === '' || parseInt(selectedToken) === index) &&
                <article key={item[0]} className="w-full flex flex-row space-x-4">
                    <div className="w-60 h-60 shrink-0 rounded bg-gray-300 overflow-hidden rounded">
                        <img className="object-cover h-full w-full" src={"https://" + nftCanister + ".raw.ic0.app/?asset=" + index.toString()} />
                    </div>
                    <div className="w-full flex flex-col">
                        <p className="font-semibold text-lg">
                            Rewards
                        </p>
                        <div className="w-full grid grid-cols-1 gap-2">
                            {item[1].nonfungible.metadata[0].slice(4).map((reward, idx) => (
                                <div
                                    key={idx}
                                    className={classNames(
                                        "flex flex-row justify-between py-2 items-center",
                                        reward > 0 ? "" : null
                                    )}
                                >
                                    <span>
                                        {rewards[idx]}
                                    </span>
                                    {reward === 0 ? (
                                        <button
                                            className={classNames(
                                                "text-xs px-2 py-1 uppercase rounded-lg",
                                                "focus:outline-none border border-transparent",
                                                "text-gray-500",
                                                "hover:border-gray-300"
                                            )}
                                            type="button"
                                            onClick={() => setRewardRedeemed(item[0], idx, true)}
                                        >
                                            Mark as redeemed
                                        </button>
                                    ) : (
                                        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'column', alignItems: 'center'}}>
                                            <div className={classNames(
                                                    "text-xs px-2 py-1 uppercase rounded-lg",
                                                    "focus:outline-none border border-transparent",
                                                    "bg-blue-600 text-white font-semibold"
                                            )}>
                                               <p>Redeemed</p>
                                            </div>
                                            <button
                                                className={classNames(
                                                    "text-xs px-2 py-1 uppercase rounded-lg",
                                                    "focus:outline-none border border-transparent",
                                                    "text-gray-500", "hover:border-gray-300"
                                                )}
                                                type="button"
                                                onClick={() => setRewardRedeemed(item[0], idx, false)}
                                            >
                                                Undo
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </article>
            ))}
        </div>
    )
}