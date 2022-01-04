import Link from "next/link";
import { useState } from "react";
import Input from "@/components/forms/input";
import { Spinner } from "@/components/shared/loading-spinner";
import { useProjectForm } from "./project-form-context";
import Textarea from "@/components/forms/textarea";

export default function StepFive() {
    const { email, setEmail, error, setError } = useProjectForm();
    const [isLoading, setLoading] = useState(false);

    const startAgain = () => router.reload();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            

            setError("");
        }
        catch (error) {
            console.log(error);
            setError(error.response.data.message);
            setLoading(false);
        }
    }

    return (
        <form className="w-full flex flex-col space-y-2" onSubmit={handleSubmit}>
            <div className="w-full flex flex-col space-y-1">
                <p className="font-semibold text-2xl">
                    Project story and investor rewards
                </p>
                <p className="">
                    Tell us your project story
                </p>
                <Textarea rows={4} />
                <p className="">
                    Investor rewards
                </p>
                <div className="rounded-2xl w-full bg-blue-100 bg-opacity-30 p-4">
                    Tips! Be sure to mention:
                    <p className="text-center text-blue-600 underline">
                        <a href="">Why this project is impactful</a><br />
                        <a href="">What you will do with funds</a><br />
                        <a href="">Perks and rewards for investors</a><br />
                        <a href="">Project Timeline and key milestones</a><br />
                        <a href="">Challenges & Risks</a><br />
                    </p>
                </div>
            </div>

            {error && (
                <div className="w-full text-red-500 text-sm">
                    {error}
                </div>
            )}

            <button
                disabled={isLoading === true}
                type="button"
                className={`
                    flex flex-row justify-center w-full bg-white text-blue-600 py-3 
                    px-4 font-medium text-base tracking-wider rounded-xl
                    hover:bg-blue-100 border-2 border-blue-600
                `}
            >
                {!isLoading && (
                    <span>Preview Project</span>
                )}

                {isLoading && (
                    <span className="h-5 w-5">
                        <Spinner show={true} />
                    </span>
                )}
            </button>
            
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
                    <span>Submit Project</span>
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