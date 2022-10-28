import Modal from "@/components/shared/modal";
import { useBackend } from "@/context/backend";

export default function PromptLoginModal() {
    const { login } = useBackend();

    const renderButton = (name, action, image) => (
        <button
            type="button"
            onClick={action}
            className={`
                bg-blue-600 text-white font-medium px-4 py-3 w-full hover:bg-blue-700 flex flex-row items-center justify-center
            `}
        >
            {name}
            <img className="w-12 ml-2" src={image} />
        </button>
    )

    return (
        <Modal show={true} size="sn">
            <div className="w-full flex flex-col p-4 md:px-10 md:py-10 items-center">
                <div className="w-full mx-auto flex flex-col items-center space-y-4">
                    <img src="/assets/logo.png" className="w-full" />

                    <p className="w-full">
                        Please login to continue
                    </p>

                    {renderButton('Login', login, "/assets/IClogo.png")}
                    {renderButton('', () => login('nfid'), "/assets/nfid-logo.png")}

                    <a
                        href="/"
                        className="hover:opacity-80"
                    >
                        Back to homepage
                    </a>
                </div>
            </div>
        </Modal>
    )
}
