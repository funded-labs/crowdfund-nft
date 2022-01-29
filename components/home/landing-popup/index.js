import Modal from "@/components/shared/modal";
import { useState } from "react";

const LOCALSTORAGE_KEY = "landing/v1/dont-show";
export { LOCALSTORAGE_KEY };

export default function LandingPopup({ onContinue = () => { } }) {
    const [dontShowThisAgain, setDontShow] = useState(true);

    const handleContinue = () => {
        localStorage.setItem(LOCALSTORAGE_KEY, dontShowThisAgain);
        onContinue();
    };

    const handleCheckbox = (isChecked) => {
        setDontShow(isChecked);
        localStorage.setItem(LOCALSTORAGE_KEY, isChecked);
    };

    return (
        <Modal show={true} size="sm">
            <div className="w-full h-full flex flex-col p-4 md:px-10 md:py-10 items-center justify-center">
                <div className="w-full mx-auto flex flex-col items-center space-y-4">
                    <p className="w-full text-3xl font-bold text-blue-600 text-center">
                        Heads up!
                    </p>

                    <div className="w-full text-gray-600 text-left">
                        This platform is currently a preview of the user interface for
                        CrowdFund NFT. Users will be updated as functionality is rolled
                        out. Follow us on Twitter for more info <a class="text-blue-600 underline font-semibold" href="https://twitter.com/crowdfundnft">@crowdfundnft</a>
                    </div>

                    <div className="w-full flex flex-col items-center">
                        <button
                            className={`
                            rounded-full bg-blue-600 text-white font-semibold uppercase px-12 py-3
                            focus:outline-none text-sm cursor-pointer
                        `}
                            type="button"
                            onClick={handleContinue}
                        >
                            I understand
                        </button>
                        <div className="w-full flex flex-row justify-center space-x-2 mt-4">
                            <input
                                type="checkbox"
                                className="h-5 w-5"
                                checked={dontShowThisAgain}
                                onChange={({ target }) => handleCheckbox(target.checked)}
                            />
                            <label
                                className="text-gray-700 text-sm"
                            >
                                Don't show this again
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}