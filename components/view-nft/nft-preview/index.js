import QRCode from "qrcode.react";
import { useEffect, useState } from "react";

export default function NftPreview() {
    const [url, setUrl] = useState("");

    useEffect(() => {
        if (!location) return;

        setUrl(location.href);
    }, []);

    return (
        <section className='w-full bg-white'>
            <div className='w-full sm:mx-auto sm:max-w-md px-4 flex flex-col px-4 py-5'>
                <div className="bg-gray-100 rounded-3xl p-8 shadow-lg border">
                    <QRCode
                        value={url}
                        bgColor="transparent"
                        fgColor="#2563eb"
                        size="1024"
                        style={{ width: "100%", height: "auto" }}
                    />
                    <div className="w-full flex flex-col sm:flex-row pt-5 text-sm">
                        <div className="w-full sm:w-6/12 flex flex-col space-y-2">
                            <div className="w-full flex flex-row space-x-1 items-center">
                                <div className="bg-gray-300 h-12 w-12 rounded-xl" />
                                <div className="flex flex-col font-bold">
                                    <p>CrowdFund NFT</p>
                                    <p>#241</p>
                                </div>
                            </div>
                            <div className="">
                                Mint Date: March 1, 2022
                                Blockchain: ICP
                            </div>
                            <div className="">
                                241 of 300
                            </div>
                        </div>
                        <div className="w-full sm:w-6/12 text-right">
                            <p className="font-bold">
                                Rewards
                            </p>
                            <ul className="text-sm">
                                <li>Discord benefits</li>
                                <li>Free project posting</li>
                                <li>Early access to new projects</li>
                                <li>Rarity raffle</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}