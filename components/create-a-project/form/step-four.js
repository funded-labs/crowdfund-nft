import { useRouter } from "next/router";
import { useState } from "react";
import Input from "@/components/forms/input";
import { Spinner } from "@/components/shared/loading-spinner";
import { useProjectForm } from "./project-form-context";

export default function StepFour({ onSuccess }) {
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

            setStep(5);
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
                    Add a cover photo for your NFT's
                </p>
                <p className="">
                    A high-quality image that will serve as your project cover, as well
                    as NFT collection cover!
                </p>
                <div className="border rounded-2xl py-20"></div>
                <p className="">
                    To upload your full NFT collection, please add a WeTransfer link
                    and share it with the following email address:
                </p>
                <div className="w-full text-center text-blue-600">
                    collections@crowdfundnft.icp
                </div>
                <Input
                    id="firstName"
                    name="firstName"
                    value={email}
                    onChange={({ target }) => setEmail(target.value)}
                    type="email"
                    placeholder="WeTransfer link for your NFT"
                />
                <p className="">
                    Reminder, you selected a collection of:
                </p>
                <p className="font-semibold">
                    1,000 NFT's
                </p>
                <p className="">
                    Please make sure you have the apropriate number of JPG's or
                    PNG's in your upload. These will be minted and randomly
                    allocated to people who invest in your project.
                </p>
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