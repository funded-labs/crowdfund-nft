import { useState } from 'react'
import { Spinner } from '@/components/shared/loading-spinner'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useBackend } from '@/context/backend'
import { useProjectForm } from './project-form-context'
import { imgFileToInt8Array } from '@/helpers/imageHelper'

const stepFiveSchema = Yup.object().shape({
    walletId: Yup.string().required('You must connect your wallet to proceed')
})

const initialValues = {
    walletId: null
}

export default function StepSix() {
    const backend = useBackend().backendWithAuth
    const [isLoading, setLoading] = useState(false)
    const { profile, project, previousStep, setStep } = useProjectForm()

    const handleSubmit = async (form) => {
        try {
            setLoading(true);

            // @todo: do wallet stuff here

            const p = { ...project, ...form }

            const payload = {
                category: p.projectCategory,
                coverImg: p.coverImg
                    ? await imgFileToInt8Array(p.coverImg)
                    : [], // project.coverImgUrl
                description: '',
                discordLink: p.discordLink,
                goal: p.targetAmount,
                nftVolume: p.nftVolume,
                rewards: p.rewards,
                story: p.story,
                tags: [],
                title: p.projectTitle,
                twitterLink: p.twitterLink,
                walletId: p.walletId,
                wetransferLink: p.wetransferLink,
            }

            await backend.createProfile({
                bio: profile.bio,
                img: profile.profileImg
                    ? await imgFileToInt8Array(profile.profileImg)
                    : [],
                lastName: profile.lastName,
                firstName: profile.firstName,
            })

            await backend.createProject(payload)
        } catch (error) {
            console.log(error)
            // todo: set form error
        } finally {
            setLoading(false)
            setStep(7)
        }
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={stepFiveSchema}>
            {({ handleSubmit, handleBlur, handleChange, errors, values }) => (
                <form
                    className='w-full flex flex-col space-y-2'
                    onSubmit={handleSubmit}>
                    <div className='w-full flex flex-col space-y-1'>
                        <p className='font-semibold text-2xl'>
                            Submission Fee
                        </p>
                        <p className=''>
                            We charge 1 ICP to submit your project for review. This
                            does not guarantee that your project will go live on the
                            platform! We will reimburse you if your project gets
                            rejected.
                        </p>
                        <div className='rounded-2xl w-full bg-blue-100 bg-opacity-30 p-4 flex flex-col space-y-4'>
                            <p className='w-full text-center text-2xl font-semibold'>
                                1 ICP
                            </p>
                            <p className=''>
                                To pay our submission fee, please connect either a Plug
                                Wallet or Stoic Wallet.
                            </p>
                            <p className=''>
                                WARNING: This will be used as your project creator wallet
                                by default - where you will receive your funds if your
                                crowdfunding project gets successfully funded.
                            </p>
                            <a className='bg-blue-300 rounded-xl py-6' />
                            <a className='bg-blue-300 rounded-xl py-6' />
                        </div>
                    </div>

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
                        {!isLoading && <span>Pay 1 ICP &amp; Submit your project</span>}

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
