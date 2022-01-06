import { useState } from "react";
import Input from "@/components/forms/input";
import { Spinner } from "@/components/shared/loading-spinner";
import { useProjectForm } from "./project-form-context";
import Textarea from "@/components/forms/textarea";
import { Formik } from "formik";
import * as Yup from "yup";

const stepOneSchema = Yup.object().shape({
    firstName: Yup.string().required("Enter your first name"),
    lastName: Yup.string().required("Enter your last name"),
    bio: Yup.string().required("Enter details about yourself"),
    profileImgUrl: Yup.string()
});

const initialValues = {
    firstName: "",
    lastName: "",
    bio: "",
    profileImgUrl: ""
}

export default function StepOne() {
    const { email, setEmail, error, setError, setStep } = useProjectForm();
    const [isLoading, setLoading] = useState(false);

    const handleSubmit = async (form) => {
        try {
            setLoading(true);
            
            // todo: set values to Context
            // todo: do we want to persist the data somewhere else at each stage?
            setStep(2);
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
            validationSchema={stepOneSchema}
        >
            {({ handleSubmit, handleBlur, handleChange, errors, values }) => (
                <form className="w-full flex flex-col space-y-2" onSubmit={handleSubmit}>
                    <div className="w-full flex flex-col space-y-1">
                        <p className="font-semibold text-2xl">
                            Let's start with your profile
                        </p>
                        <p className="">
                            What's your name?
                        </p>
                        <div className="w-full grid grid-cols-2 gap-4">
                            <Input
                                name="firstName"
                                value={values.firstName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="First name"
                                type="text"
                            />
                            <Input
                                name="lastName"
                                value={values.lastName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                type="text"
                                placeholder="Last name"
                            />
                        </div>
                        <p className="">
                            Tell us about yourself
                        </p>
                        <Textarea
                            name="bio"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.bio}
                            rows={4}
                        />
                        <p className="">
                            Upload a profile picture (optional)
                        </p>
                        <Input
                            name="profileImgUrl"
                            value={values.profileImgUrl}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
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

                    <p className="w-full py-4 px-4 text-xs text-center text-gray-500">
                        By continuing, you agree to CrowdFund NFT's Terms and acknowledge
                        receipt of our Privacy Policy.
                    </p>
                </form>
            )}
        </Formik>
    );
}