import { useRouter } from "next/router";
import { useState } from "react";
import Input from "@/components/forms/input";
import { Spinner } from "@/components/shared/loading-spinner";
import { useProjectForm } from "./project-form-context";
import { Form, Formik } from "formik";
import * as Yup from "yup";

const stepFourSchema = Yup.object().shape({
    coverImgUrl: Yup.string(),
    wetransferLink: Yup.string()
});

const initialValues = {
    coverImgUrl: "",
    wetransferLink: ""
};

export default function StepFour() {
    const { setStep } = useProjectForm();
    const [isLoading, setLoading] = useState(false);
    const router = useRouter();

    const startAgain = () => router.reload();

    const handleSubmit = async (e) => {
        try {
            setLoading(true);

            // todo set values to Context
            // todo: do we want to persist data at each stage?
            setStep(5);
        }
        catch (error) {
            console.log(error);
            // toto: set form error
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={stepFourSchema}
        >
            {({ handleSubmit, handleBlur, handleChange, errors, values }) => (

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
                    name="wetransferLink"
                    value={values.wetransferLink}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
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