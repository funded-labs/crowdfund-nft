import Modal from "@/components/shared/modal";
import { useBackend } from "@/context/backend";
import { ArrowLeftIcon } from "@heroicons/react/outline";

export default function PromptLoginModal() {
    const { login } = useBackend();

    const renderButton = (name, action, image) => (
        <button
            type="button"
            onClick={action}
            className={`
                bg-gradient-to-t from-neutral-100 to-white shadow-md rounded-full text-neutral-800 flex justify-center font-medium px-4 py-4 w-1/2 mx-auto
            `}
        >
            
            {name}
            <img className="w-12 ml-2 flex" src={image} />
        </button>
    )

    return (
        <Modal show={true} size="sm">
            <div className="w-full flex flex-col p-4 md:px-10 md:py-10 items-center">
                <div className="w-full mx-auto flex flex-col items-center space-y-4">
                    <img src="/assets/logo.png" className="w-1/3 mt-36 flex" />

                    {renderButton('Connect Internet Identity', login, "/assets/IClogo.png")}
                    {renderButton('Connect with', () => login('nfid'), "/assets/nfid-logo.png")}

                    <a
                        href="/"
                        className="hover:opacity-80 text-neutral-500 pt-8 flex items-center font-regular text-sm "
                    >
                        <ArrowLeftIcon className="h-4 pr-2"/>Back to homepage
                    </a>
                </div>
            </div>
        </Modal>
    )
}
