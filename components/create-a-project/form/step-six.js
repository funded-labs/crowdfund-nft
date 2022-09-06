import { useState } from 'react'
import { Principal } from '@dfinity/principal'
import { Spinner } from '@/components/shared/loading-spinner'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useBackend } from '@/context/backend'
import { useProjectForm } from './project-form-context'
import { imgFileToInt8Array } from '../../../helpers/imageHelper'
import { makeImagesActor, getImageURL } from '@/ui/service/actor-locator'

const stepFiveSchema = Yup.object().shape({
    // walletId: Yup.string().required('You must connect your wallet to proceed'),
})

const initialValues = {
    // walletId: null,
}

export default function StepSix() {
    const { backendWithAuth, getPlugPrincipal } = useBackend()
    const backend = backendWithAuth
    const [isLoading, setLoading] = useState(false)
    const { profile, project, previousStep, setStep } = useProjectForm()

    const handleSubmit = async (form) => {
        try {
            setLoading(true)

            const walletId = Principal.from(await getPlugPrincipal()).toText()

            // if (process.env.NEXT_PUBLIC_ENVIRONMENT !== 'development') {
            //     if (!window?.ic?.plug)
            //         return alert(
            //             'You must install Plug into your browser in order to connect you Plug Wallet to pay the 1 ICP charge and recieve funds once your project is fully funded.'
            //         )
            //     const params = {
            //         to: 'fcbe9da2816e5fd62cfb44c2f437fe27a176b6b19f68d55be80d70d5413d1ed7',
            //         amount: 100_000_000,
            //     }
            //     if (
            //         !(await window.ic.plug
            //             .requestTransfer(params)
            //             .then(() => {
            //                 return true
            //             })
            //             .catch((error) => {
            //                 console.error(error)
            //                 alert(
            //                     'Something went wrong with Plug. Please try again.'
            //                 )
            //                 return false
            //             }))
            //     )
            //         return
            // }

            const p = { ...project, ...form, walletId }

            const imageActor = makeImagesActor()

            let coverURL = ''
            if (p.coverImg) {
                const coverImg = {
                    name: p.coverImg.name,
                    payload: {
                        ctype: p.coverImg.type,
                        data: [await imgFileToInt8Array(p.coverImg)],
                    },
                }
                coverURL = getImageURL(await imageActor.addAsset(coverImg))
            }

            const payload = {
                category: p.projectCategory,
                cover: coverURL,
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

            await backend.createProject(payload)

            let profileImgURL = ''
            if (profile.profileImg) {
                const profileImg = {
                    name: profile.profileImg.name,
                    payload: {
                        ctype: profile.profileImg.type,
                        data: [await imgFileToInt8Array(profile.profileImg)],
                    },
                }
                profileImgURL = getImageURL(
                    await imageActor.addAsset(profileImg)
                )
            }

            await backend.createProfile({
                bio: profile.bio,
                img: profileImgURL,
                lastName: profile.lastName,
                firstName: profile.firstName,
            })

            setStep(7)
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
            validationSchema={stepFiveSchema}>
            {({ handleSubmit, handleBlur, handleChange, errors, values }) => (
                <form
                    className='w-full flex flex-col space-y-2'
                    onSubmit={handleSubmit}>
                    <div className='w-full flex flex-col space-y-1'>
                        <p className='font-semibold text-2xl'>Submission Fee</p>
                        <p className=''>
                            We charge 1 ICP to submit your project for review.
                            This does not guarantee that your project will go
                            live on the platform! We will however reimburse you
                            if your project gets rejected.
                        </p>
                        <div className='rounded-2xl w-full bg-blue-100 bg-opacity-30 p-4 flex flex-col space-y-4'>
                            <p className='w-full text-center text-2xl font-semibold'>
                                1 ICP
                            </p>
                            <p className=''>
                                To pay our submission fee, you will be prompted
                                to add a Plug Wallet.
                            </p>
                            <p className=''>
                                WARNING: This will be used as your project
                                creator wallet by default - where you will
                                receive your funds if your crowdfunding project
                                gets successfully funded.
                            </p>
                            {/* <a className='bg-blue-300 rounded-xl py-6' />
                            <a className='bg-blue-300 rounded-xl py-6' /> */}
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
                        {!isLoading && (
                            <span>Pay 1 ICP &amp; Submit your project</span>
                        )}

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
