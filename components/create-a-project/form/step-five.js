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
    'Enter details about the rewards project backers will receive',
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

      setStep(7)
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
      validationSchema={stepFiveSchema}
    >
      {({ handleSubmit, handleBlur, handleChange, errors, values }) => (
        <form
          className='bg-clear flex w-full flex-col space-y-2 px-8 sm:p-0'
          onSubmit={handleSubmit}
        >
          <div className='w-full space-y-1 sm:flex sm:grid-cols-2 sm:flex-row'>
            <div className='bg-clear flex flex-col px-4 py-4 sm:w-1/3'>
              <p className='pt-12 font-sans text-4xl font-bold text-neutral-900 sm:px-12'>
                Describe your project and your NFTs
              </p>
              <p className='text-md pt-4 font-sans font-light text-neutral-700 sm:px-12'>
                Go into as much detail as possible. Tell us what your project
                is, what you&apos;re raising for and what rewards your
                supporters will receive.
              </p>
            </div>
            <div className='border-1 flex-1 flex-col rounded-l-3xl rounded-r-3xl border border-white bg-white bg-opacity-50 p-8 bg-blend-saturation sm:rounded-r-none sm:rounded-l-3xl sm:px-36 sm:py-12'>
              <div className='mb-8 w-full rounded-2xl bg-white p-8 text-center'>
                <span className='font-regular mb-4 text-sm tracking-tighter text-neutral-500 '>
                  What to include:
                </span>
                <p className='text-left text-blue-600 underline'>
                  <a className='mt-4' href=''>
                    Why this project is impactful
                  </a>
                  <br />
                  <a href=''>What you will do with funds</a>
                  <br />
                  <a href=''>Perks and rewards for project backers</a>
                  <br />
                  <a href=''>Project Timeline and key milestones</a>
                  <br />
                  <a href=''>Challenges &amp; Risks</a>
                  <br />
                </p>
              </div>
              <p className='font-regular mb-2 text-neutral-800'>
                Tell us your project story
              </p>
              <RichTextArea
                name='story'
                value={values.story}
                onChange={handleChange}
              />

              <p className='font-regular mb-2 text-neutral-800'>
                Describe your NFT rewards
              </p>
              <RichTextArea
                name='rewards'
                value={values.rewards}
                onChange={handleChange}
              />

              {Object.values(errors).length > 0 && (
                <div className='flex w-full flex-row items-center text-sm text-red-500'>
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
                            flex w-full flex-row justify-center rounded-xl bg-blue-600 py-3 
                            px-4 text-base font-medium tracking-wider text-white
                            shadow-xl hover:bg-blue-700
                        `}
              >
                {!isLoading && <span>Next</span>}

                {isLoading && (
                  <span className='h-5 w-5'>
                    <Spinner show={true} />
                  </span>
                )}
              </button>

              <button
                className='w-full appearance-none py-4 px-4 text-center text-xs text-gray-500 focus:outline-none'
                onClick={previousStep}
                type='button'
              >
                &larr; Go back
              </button>
            </div>
          </div>

          <p
            className={`
                            w-full py-4 px-4 text-center text-xs text-gray-500
                            
                        `}
          >
            By continuing, you agree to CrowdFund NFTs Terms and acknowledge
            receipt of our Privacy Policy.
          </p>
        </form>
      )}
    </Formik>
  )
}
