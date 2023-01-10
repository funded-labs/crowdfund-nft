import { useRouter } from 'next/router'
import { useState } from 'react'
import Input from '@/components/forms/input'
import { Spinner } from '@/components/shared/loading-spinner'
import { useProjectForm } from './project-form-context'
import Select from '@/components/forms/select'
import * as Yup from 'yup'
import { Formik } from 'formik'
import projectCategories from '@/helpers/projectCategories'

const stepTwoSchema = Yup.object().shape({
  projectTitle: Yup.string().required('Enter a title for your project'),
  projectCategory: Yup.string().required('Select a category for your project'),
  twitterLink: Yup.string().required('Enter Twitter link for your project'),
  discordLink: Yup.string(), //.required("Enter a Discord link for your project")
})

const initialValues = {
  projectTitle: '',
  projectCategory: projectCategories[0].value,
  twitterLink: '',
  discordLink: '',
}

export default function StepTwo() {
  const { setStep, setProject, profile, previousStep } = useProjectForm()
  const [isLoading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (form) => {
    try {
      setLoading(true)

      setProject((project) => ({ ...project, ...form }))

      setStep(3)
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
      validationSchema={stepTwoSchema}
    >
      {({ handleSubmit, handleBlur, handleChange, errors, values }) => (
        <form
          className='bg-clear flex w-full flex-col space-y-2 px-8 sm:p-0'
          onSubmit={handleSubmit}
        >
          <div className='w-full space-y-1 sm:flex sm:grid-cols-2 sm:flex-row'>
            <div className='bg-clear flex flex-col px-4 py-4 sm:w-1/3'>
              <p className='pt-12 font-sans text-4xl font-bold text-neutral-900 sm:px-12'>
                Tell us more about your project
              </p>
              <p className='text-md pt-4 font-sans font-light text-neutral-700 sm:px-12'>
                What's your project title?
              </p>
            </div>
            <div className='border-1 flex-1 flex-col rounded-l-3xl rounded-r-3xl border border-white bg-white bg-opacity-50 p-8 bg-blend-saturation sm:rounded-r-none sm:rounded-l-3xl sm:px-36 sm:py-24'>
              <Input
                id='projectTitle'
                name='projectTitle'
                value={values.projectTitle}
                onChange={handleChange}
                onBlur={handleBlur}
                type='text'
                placeholder='Project name'
                label='Project name'
              />

              <Select
                name='projectCategory'
                value={values.projectCategory}
                options={projectCategories}
                onChange={handleChange}
                onBlur={handleBlur}
                label='Select a category'
              />

              <div className='mt-4 grid w-full grid-cols-2 gap-4'>
                <Input
                  id='twitterLink'
                  name='twitterLink'
                  value={values.twitterLink}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type='text'
                  placeholder='twitter.com/'
                  label='Twitter Profile'
                />
                <Input
                  id='discordLink'
                  name='discordLink'
                  value={values.discordLink}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type='text'
                  placeholder='discord.gg/'
                  label='Discord Invite'
                />
              </div>

              {Object.values(errors).length > 0 && (
                <div className='flex w-full flex-row items-center text-sm text-red-500'>
                  {Object.values(errors)[0]}
                </div>
              )}

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
