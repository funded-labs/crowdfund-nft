import { useState } from 'react'
import { Spinner } from '@/components/shared/loading-spinner'
import Textarea from '@/components/forms/textarea'
import { useRouter } from 'next/router'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useProjectForm } from './project-form-context'
import RichTextArea from '@/components/forms/richTextArea'

const stepFiveSchema = Yup.object().shape({
    story: Yup.string().required('Enter details about your project'),
    rewards: Yup.string().required(
        'Enter details about the rewards project backers will receive'
    ),
})

const initialValues = {
    story: '',
    rewards: '',
}

export default function StepFive() {
    const [isLoading, setLoading] = useState(false)
    const router = useRouter()
    const { setProject, previousStep, setStep } = useProjectForm()

    const handleSubmit = async (form) => {
        try {
            setLoading(true)

            setProject((project) => ({ ...project, ...form }))

            setStep(6)
        } catch (error) {
            console.error(error)
            // toto: set form error
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
                        <p className='font-semibold text-2xl'>
                            Project story and project backer rewards
                        </p>
                        <p className=''>Tell us your project story</p>
                        <RichTextArea
                            name='story'
                            value={values.story}
                            onChange={handleChange}
                        />

                        <p className=''>Project backer rewards</p>
                        <RichTextArea
                            name='rewards'
                            value={values.rewards}
                            onChange={handleChange}
                        />

                        <div className='rounded-2xl w-full bg-blue-100 bg-opacity-30 p-4'>
                            Tips! Be sure to mention:
                            <p className='text-center text-blue-600 underline'>
                                <a href=''>Why this project is impactful</a>
                                <br />
                                <a href=''>What you will do with funds</a>
                                <br />
                                <a href=''>
                                    Perks and rewards for project backers
                                </a>
                                <br />
                                <a href=''>
                                    Project Timeline and key milestones
                                </a>
                                <br />
                                <a href=''>Challenges &amp; Risks</a>
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
