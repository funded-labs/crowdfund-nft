import { useRouter } from 'next/router'
import { useState } from 'react'
import Input from '@/components/forms/input'
import { Spinner } from '@/components/shared/loading-spinner'
import { useProjectForm } from './project-form-context'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { InformationCircleIcon } from '@heroicons/react/outline'
import Select from '@/components/forms/select'

const stepThreeSchema = Yup.object().shape({
    targetAmount: Yup.number()
        .positive('Target raise must be greater than zero')
        .integer('Target raise must be a whole number')
        .required('Enter a raise amount'),
    nftVolume: Yup.number()
        .positive('Number of NFTs must be greater than zero')
        .integer('Number of NFTs must be a whole number')
        .required('Enter a number of NFTs'),
    walletId: Yup.string(),
})

const initialValues = {
    fundingType: 'icp',
    targetAmount: '',
    nftVolume: '',
    walletId: '',
}

const fundingTypes = [
    { label: 'ICP', value: 'icp' },
    { label: 'BTC', value: 'btc' }
]

export default function StepThree() {
    const { setStep, setProject, previousStep } = useProjectForm()
    const [isLoading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (form) => {
        try {
            setLoading(true)

            setProject((project) => ({ ...project, ...form }))

            setStep(4)
        } catch (error) {
            console.error(error)
            // todo: set form error
        } finally {
            setLoading(false)
        }
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={stepThreeSchema}>
            {({ handleSubmit, handleBlur, handleChange, errors, values }) => (
                <form
                    className='px-8 sm:p-0 w-full bg-clear flex flex-col space-y-2'
                    onSubmit={handleSubmit}>
                    <div className='w-full sm:flex sm:flex-row sm:grid-cols-2 space-y-1'>
                        <div className="flex flex-col bg-clear px-4 py-4 sm:w-1/3">
                        <p className='font-bold text-4xl sm:px-12 pt-12 text-neutral-900 font-sans'>
                            Set your target
                        </p>
                        <p className='font-light text-md sm:px-12 pt-4 text-neutral-700 font-sans'>
                            How much are you looking to raise and how many NFTs do you want to mint?
                        </p>
                        
                        </div>
                        
                        <div className="flex-col rounded-l-3xl rounded-r-3xl sm:rounded-r-none sm:rounded-l-3xl bg-white bg-opacity-50 border border-1 border-white bg-blend-saturation sm:px-36 sm:py-24 p-8 flex-1">
                            
                            <div className='w-full flex flex-col'>
                                <p className='mb-2'>
                                    How do you want to fund your project
                                </p>

                                <Select
                                    name='fundingType'
                                    value={values.fundingType}
                                    options={fundingTypes}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    label ='Select funding type'
                                />
                            </div>
                            
                            <p className='mt-5'>
                                How much would you like to raise?
                            </p>
                            <Input
                                name='targetAmount'
                                value={values.targetAmount}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder='Enter target amount'
                                type='number'
                                endItem={() => (
                                    <p className='font-bold text-black'>{values.fundingType?.toUpperCase()}</p>
                                )}
                            />
                            <p className='bg-gray-50 rounded-2xl text-sm p-4 my-4 flex items-center'>
                                <InformationCircleIcon className="h-12  rounded-full text-blue-500"/>
                                <span className="flex ml-4">
                                    Bear in mind that fees are deducated from each
                                    donation, we charge 5% of every donation, and there
                                    is a flat 0.001 ICP fee per transaction
                                </span>
                            </p>

                        <div className='w-full flex flex-col space-y-1'>
                            <p className=''>
                                How many NFTs would you like to include in your
                                collection?
                            </p>
                            <Input
                                name='nftVolume'
                                value={values.nftVolume}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder='Enter target amount'
                                type='number'
                                endItem={() => (
                                    <p className='font-bold text-black'>NFTs</p>
                                )}
                            />
                        </div>
                        <p className='bg-gray-50 rounded-2xl text-sm p-4 my-4 flex items-center'>
                            <InformationCircleIcon className="h-12  rounded-full text-blue-500"/>
                            <span className="flex ml-4">The average donation in crowdfunding is £320.
                            So if you would like to raise £100,000 - make sure
                            you set your NFT collection to roughly 312 NFTs.</span>
                        </p>
                        {Object.values(errors).length > 0 && (
                        <div className='text-red-500 text-sm w-full flex flex-row items-center'>
                            {Object.values(errors)[0]}
                        </div>
                    )}

                    <button
                        disabled={isLoading === true}
                        type='submit'
                        className={`
                            flex flex-row justify-center w-full bg-blue-600 text-white py-3 
                            px-4 font-medium text-base tracking-wider rounded-xl
                            shadow-xl hover:bg-blue-700
                        `}>
                        {!isLoading && <span>Next</span>}

                        {isLoading && (
                            <span className='h-5 w-5'>
                                <Spinner show={true} />
                            </span>
                        )}
                    </button>

                    <button
                        className='appearance-none w-full py-4 px-4 text-xs text-center text-gray-500 focus:outline-none'
                        onClick={previousStep}
                        type='button'>
                        &larr; Go back
                    </button>
                        </div>
                       

                        {/* <div className="bg-gray-50 rounded-2xl text-sm p-4">
                            To receive the money raised, make sure you have a Plug Wallet.
                            <br /><br />
                            If you want to connect your wallet, or dont have a wallet yet,
                            click below:

                            <div className="bg-gray-200 rounded-xl p-8 my-5" />
                        </div> */}
                    </div>

                    

                    <p
                        className={`
                            w-full py-4 px-4 text-xs text-center text-gray-500
                            
                        `}>
                        By continuing, you agree to CrowdFund NFTs Terms and
                        acknowledge receipt of our Privacy Policy.
                    </p>
                </form>
            )}
        </Formik>
    )
}
