import { useRouter } from "next/router";
import { useState } from "react";
import Input from "@/components/forms/input";
import { Spinner } from "@/components/shared/loading-spinner";
import { useProjectForm } from "./project-form-context";
import { Formik } from "formik";
import * as Yup from "yup";

const stepThreeSchema = Yup.object().shape({
    targetAmount: Yup.number()
        .positive("Target raise must be greater than zero")
        .integer("Target raise must be a whole number")
        .required("Enter a raise amount"),
    nftVolume: Yup.number()
        .positive("Number of NFTs must be greater than zero")
        .integer("Number of NFTs must be a whole number")
        .required("Enter a number of NFTs"),
    walletId: Yup.string()
});

const initialValues = {
    targetAmount: "",
    nftVolume: "",
    walletId: ""
};

export default function StepThree({ onSuccess }) {
    const { setStep } = useProjectForm();
    const [isLoading, setLoading] = useState(false);
    const router = useRouter();

    const startAgain = () => router.reload();

    const handleSubmit = async (e) => {
        try {
            setLoading(true);

            // todo: set values to Context
            // todo: do we want to persist data at each stage?
            setStep(4);
        }
        catch (error) {
            console.log(error);
            // todo: set form erro
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={stepThreeSchema}
        >
            {({ handleSubmit, handleBlur, handleChange, errors, values }) => (
                <form className="w-full flex flex-col space-y-2" onSubmit={handleSubmit}>
                    <div className="w-full flex flex-col space-y-1">
                        <p className="font-semibold text-2xl">
                            Set your target
                        </p>
                        <p className="">
                            How much would you like to raise?
                        </p>
                        <Input
                            name="targetAmount"
                            value={values.targetAmount}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Enter target amount"
                            type="number"
                            endItem={() => <p className="font-bold text-black">ICP</p>}
                        />
                        <p className="bg-gray-50 rounded-2xl text-sm p-4">
                            Bear in mind that fees are deducated from each donation, we charge
                            5% of every donation, and there is a flat 0.001 ICP fee per
                            transaction
                        </p>

                        <p className="">
                            How many NFT's would you like to include in your collection?
                        </p>
                        <Input
                            name="nftVolume"
                            value={values.nftVolume}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Enter target amount"
                            type="number"
                            endItem={() => <p className="font-bold text-black">NFT's</p>}
                        />
                        <p className="bg-gray-50 rounded-2xl text-sm p-4">
                            Guide: The average donation in crodfunding is £320. So if you
                            would like to raise £100,000 - make sure you set your NFT collection
                            to roughly 312 NFT's.
                        </p>

                        <div className="bg-gray-50 rounded-2xl text-sm p-4">
                            To receive the money raised, make sure you have a Plug Wallet.
                            <br /><br />
                            If you want to connect your wallet, or dont have a wallet yet,
                            click below:

                            <div className="bg-gray-200 rounded-xl p-8 my-5" />
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