import { useRouter } from "next/router";
import { useState } from "react";
import Input from "@/components/forms/input";
import { Spinner } from "@/components/shared/loading-spinner";
import { useProjectForm } from "./project-form-context";
import Textarea from "@/components/forms/textarea";
import Select from "@/components/forms/select";

export default function StepTwo({ onSuccess }) {
    const { email, code, setCode, error, setError, setStep } = useProjectForm();
    const [isLoading, setLoading] = useState(false);
    const router = useRouter();

    const startAgain = () => router.reload();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {

            setError("");

            if (onSuccess) {
                onSuccess();
                return;
            }

            router.replace("/");
        }
        catch (error) {
            setError(error.response.data.message);
            setLoading(false);
        }
    }

    return (
        <form className="w-full flex flex-col space-y-2" onSubmit={handleSubmit}>
            <div className="w-full flex flex-col space-y-1">
                <p className="font-semibold text-2xl">
                    Your project
                </p>
                <p className="">
                    What's your project title?
                </p>
                <Input
                    id="firstName"
                    name="firstName"
                    value={email}
                    onChange={({ target }) => setEmail(target.value)}
                    type="email"
                    placeholder="Project name"
                />
                <p className="">
                    Select a project category
                </p>
                <Select options={[{ label: "Test", value: "test" }]} />
                <p className="">
                    Social Media Links
                </p>
                <div className="w-full grid grid-cols-2 gap-4">
                    <Input
                        id="firstName"
                        name="firstName"
                        value={email}
                        onChange={({ target }) => setEmail(target.value)}
                        type="email"
                        placeholder="Twitter Link"
                    />
                    <Input
                        id="firstName"
                        name="firstName"
                        value={email}
                        onChange={({ target }) => setEmail(target.value)}
                        type="email"
                        placeholder="Discord Link"
                    />
                </div>
            </div>

            {error && (
                <div className="w-full text-red-500 text-sm">
                    {error}
                </div>
            )}
            
            <button
                disabled={isLoading === true}
                type="submit"
                className={`
                    flex flex-row justify-center w-full bg-blue-600 text-white py-3 
                    px-4 font-medium text-base tracking-wider rounded-xl
                    shadow-xl hover:bg-blue-700
                `}
            >
                {!isLoading && (
                    <span>Next</span>
                )}

                {isLoading && (
                    <span className="h-5 w-5">
                        <Spinner show={true} />
                    </span>
                )}
            </button>

            <button
                className="appearance-none w-full py-4 px-4 text-xs text-center text-gray-500 focus:outline-none"
                onClick={startAgain}
                type="button"
            >
                &larr; Start again
            </button>

            <p
                className={`
                    w-full py-4 px-4 text-xs text-center text-gray-500
                    
                `}
            >
                By continuing, you agree to CrowdFund NFT's Terms and acknowledge
                receipt of our Privacy Policy.
            </p>
        </form>
    );
}