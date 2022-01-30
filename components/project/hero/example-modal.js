import Modal from "@/components/shared/modal";

export default function ExampleModal({ onClose }) {
    return (
        <Modal show={true} size="sm">
            <div className="w-full h-full flex flex-col p-4 md:px-10 md:py-10 items-center justify-center">
                <div className="w-full mx-auto flex flex-col items-center space-y-4">
                    <p className="w-full text-3xl font-bold text-blue-600 text-center">
                        This is an example project
                    </p>

                    <div className="w-full text-gray-600 text-left">
                        This platform is currently a preview of the user interface for
                        CrowdFund NFT which is using example projects. We will let you
                        know when projects go live and are open to backing. Follow <a className="text-blue-600 underline font-semibold" href="https://twitter.com/crowdfundnft">@crowdfundnft</a> for more info.
                    </div>

                    <div className="w-full flex flex-col items-center">
                        <button
                            className={`
                            rounded-full bg-blue-600 text-white font-semibold uppercase px-12 py-3
                            focus:outline-none text-sm cursor-pointer
                        `}
                            type="button"
                            onClick={onClose}
                        >
                            I understand
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}