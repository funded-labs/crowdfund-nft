import Modal from "@/components/shared/modal";
import { useBackend } from "@/context/backend";

export default function PromptLoginModal() {
    const { login } = useBackend();

    return (
        <Modal show={true} size="xs">
            <div className="w-full flex flex-col p-4 md:px-10 md:py-10 items-center">
                <div className="w-full mx-auto flex flex-col items-center space-y-4">
                    <img src="/assets/logo.png" className="w-full" />

                    <p className="w-full">
                        Please login to continue
                    </p>

                    <button
                        type="button"
                        onClick={login}
                        className={`
                            bg-blue-600 text-white font-medium px-4 py-3 w-full hover:bg-blue-700
                        `}
                    >
                        Login
                    </button>
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