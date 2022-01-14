import { useState } from "react";
import { Spinner } from "@/components/shared/loading-spinner";
import Textarea from "@/components/forms/textarea";
import { useRouter } from "next/router";
import { Formik } from "formik";
import * as Yup from "yup";
import { useBackend } from "@/context/backend";
import { useProjectForm } from "./project-form-context";

const stepFiveSchema = Yup.object().shape({
    story: Yup.string().required("Enter details about your project")
});

const initialValues = {
    story: ""
};

export default function StepFive() {
    const { backend } = useBackend();
    const [isLoading, setLoading] = useState(false);
    const router = useRouter();
    const { profile, project, setProject } = useProjectForm();

    const startAgain = () => router.reload();

    const handleSubmit = async (form) => {
        try {
            setLoading(true);

            setProject(project => ({ ...project, ...form }));

            const random = ((Math.random() + 1) * 100).toFixed(0);

            const payload = {
                category: projectCategory,
                coverImg: "", // project.coverImgUrl
                description: "",
                discordLink: project.discordLink,
                goal: project.targetAmount,
                nftVolume: project.nftVolume,
                story: project.story,
                tags: [],
                title: projectTitle,
                twitterLink: project.twitterLink,
                walletId: project.walletId,
                wtransferLink: project.wetransferLink
            };

            const profile = await backend.makeProfile({
                bio: profile.bio,
                firstName: profile.firstName,
                img: "", // profile.profileImgUrl
                lastName: profile.lastName
            });

            const project = await backend.createProject(payload);
        }
        catch (error) {
            console.log(error);
            // todo: set form error
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={stepFiveSchema}
        >
            {({ handleSubmit, handleBlur, handleChange, errors, values }) => (
                <form className="w-full flex flex-col space-y-2" onSubmit={handleSubmit}>
                    <div className="w-full flex flex-col space-y-1">
                        <p className="font-semibold text-2xl">
                            Project story and investor rewards
                        </p>
                        <p className="">
                            Tell us your project story
                        </p>
                        <Textarea
                            name="story"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            rows={4}
                        />
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

                    {(Object.values(errors).length > 0) && (
                        <div className="text-red-500 text-sm w-full flex flex-row items-center">
                            {(Object.values(errors)[0])}
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
            )}
        </Formik>
    );
}