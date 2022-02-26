import { useState } from 'react'
import { Spinner } from '@/components/shared/loading-spinner'
import Textarea from '@/components/forms/textarea'
import { useRouter } from 'next/router'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useBackend } from '@/context/backend'
import { useProjectForm } from './project-form-context'

import { imgFileToInt8Array } from '../../../helpers/imageHelper'

import { makeImagesActor, getImageURL } from '@/ui/service/actor-locator'

const stepFiveSchema = Yup.object().shape({
    story: Yup.string().required('Enter details about your project'),
    rewards: Yup.string().required(
        'Enter details about the rewards investors will receive'
    ),
})

const initialValues = {
    story: '',
    rewards: '',
}

export default function StepFive() {
    const backend = useBackend().backendWithAuth
    const [isLoading, setLoading] = useState(false)
    const router = useRouter()
    const { profile, project, previousStep, setStep } = useProjectForm()

    const handleSubmit = async (form) => {
        try {
            setLoading(true)

            const p = { ...project, ...form }

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

            await backend.createProject(payload)
        } catch (error) {
            console.log(error)
            // todo: set form error
        } finally {
            setLoading(false)
            setStep(6)
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
                            Project story and investor rewards
                        </p>
                        <p className=''>Tell us your project story</p>
                        <Textarea
                            name='story'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            rows={4}
                        />
                        <p className=''>Investor rewards</p>
                        <Textarea
                            name='rewards'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            rows={4}
                        />
                        <div className='rounded-2xl w-full bg-blue-100 bg-opacity-30 p-4'>
                            Tips! Be sure to mention:
                            <p className='text-center text-blue-600 underline'>
                                <a href=''>Why this project is impactful</a>
                                <br />
                                <a href=''>What you will do with funds</a>
                                <br />
                                <a href=''>Perks and rewards for investors</a>
                                <br />
                                <a href=''>
                                    Project Timeline and key milestones
                                </a>
                                <br />
                                <a href=''>Challenges & Risks</a>
                                <br />
                            </p>
                        </div>
                    </div>

                    {Object.values(errors).length > 0 && (
                        <div className='text-red-500 text-sm w-full flex flex-row items-center'>
                            {Object.values(errors)[0]}
                        </div>
                    )}

                    {/* <button
                        disabled={isLoading === true}
                        type='button'
                        className={`
                            flex flex-row justify-center w-full bg-white text-blue-600 py-3 
                            px-4 font-medium text-base tracking-wider rounded-xl
                            hover:bg-blue-100 border-2 border-blue-600
                        `}>
                        {!isLoading && <span>Preview Project</span>}

                        {isLoading && (
                            <span className='h-5 w-5'>
                                <Spinner show={true} />
                            </span>
                        )}
                    </button> */}

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
