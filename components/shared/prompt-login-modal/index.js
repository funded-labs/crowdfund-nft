import Modal from "@/components/shared/modal";
import { useBackend } from "@/context/backend";

export default function PromptLoginModal() {
    const { login } = useBackend();

    const renderButton = (name, action, image) => (
        <button
            type="button"
            onClick={action}
            className={`
                bg-blue-600 rounded-full text-white font-medium px-4 py-3 w-1/2 mx-auto hover:bg-blue-700
            `}
        >
            {name}
            <img className="w-12 ml-2" src={image} />
        </button>
    )

    return (
        <Modal show={true} size="sm">
            <div className="w-full flex flex-col p-4 md:px-10 md:py-10 items-center">
                <div className="w-full mx-auto flex flex-col items-center space-y-4">
                    <img src="/assets/logo.png" className="w-1/3 mt-36" />

                    {renderButton('Login', login, "/assets/IClogo.png")}
                    {renderButton('', () => login('nfid'), "/assets/nfid-logo.png")}

                    <a
                        href="/"
                        className="hover:opacity-80 text-neutral-300 text-sm "
                    >
                        Go to homepage
                    </a>
                </div>
            </div>
        </Modal>
    )
}
