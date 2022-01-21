import { useRouter } from "next/router";
import { useState } from "react";
import Input from "@/components/forms/input";
import { Spinner } from "@/components/shared/loading-spinner";
import { useProjectForm } from "./project-form-context";
import Select from "@/components/forms/select";
import * as Yup from "yup";
import { Formik } from "formik";

const stepTwoSchema = Yup.object().shape({
    projectTitle: Yup.string().required("Enter a title for your project"),
    projectCategory: Yup.string().required("Select a category for your project"),
    twitterLink: Yup.string().required("Enter Twitter link for your project"),
    discordLink: Yup.string().required("Enter a Discord link for your project")
});

const initialValues = {
    projectTitle: "",
    projectCategory: "",
    twitterLink: "",
    discordLink: ""
};

export default function StepTwo() {
    const { setStep, setProject, profile } = useProjectForm();
    const [isLoading, setLoading] = useState(false);
    const router = useRouter();

    console.log({ profile });

    const startAgain = () => router.reload();

    const handleSubmit = async (form) => {
        try {
            setLoading(true);
            
            setProject(project => ({ ...project, ...form }));

            setStep(3);
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
            validationSchema={stepTwoSchema}
        >
            {({ handleSubmit, handleBlur, handleChange, errors, values }) => (

                <form className="w-full flex flex-col space-y-2" onSubmit={handleSubmit}>
                    <div className="w-full flex flex-col space-y-1">
                        <p className="font-semibold text-2xl">
                            Your project
                        </p>
                        <p className="">
                            What's your project title?
                        </p>
                        <Input
                            id="projectTitle"
                            name="projectTitle"
                            value={values.projectTitle}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="text"
                            placeholder="Project name"
                        />
                        <p className="">
                            Select a project category
                        </p>
                        <Select
                            name="projectCategory"
                            value={values.projectCategory}
                            options={[{ label: "Test", value: "test" }, { label: "Test 2", value: "test2" }]}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <p className="">
                            Social Media Links
                        </p>
                        <div className="w-full grid grid-cols-2 gap-4">
                            <Input
                                id="twitterLink"
                                name="twitterLink"
                                value={values.twitterLink}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                type="text"
                                placeholder="Twitter link"
                            />
                            <Input
                                id="discordLink"
                                name="discordLink"
                                value={values.discordLink}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                type="text"
                                placeholder="Discord link"
                            />
                        </div>
                    </div>

                    {(Object.values(errors).length > 0) && (
                        <div className="text-red-500 text-sm w-full flex flex-row items-center">
                            {(Object.values(errors)[0])}
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

            )}
        </Formik>
    );
}