import { useState } from 'react'
import { Spinner } from '@/components/shared/loading-spinner'
import { useProjectForm } from './project-form-context'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { InformationCircleIcon, XIcon } from '@heroicons/react/outline'
import TierCard from './TierCard'

const tierFormSchema = Yup.object().shape({
  tiers: Yup.array().of(
    Yup.object().shape({
      price: Yup.number()
        .positive('NFT price must be greater than zero')
        .integer('NFT price must be a whole number')
        .required('Enter NFT price'),
      count: Yup.number()
        .positive('Number of NFTs must be greater than zero')
        .integer('Number of NFTs must be a whole number')
        .required('Enter a number of NFTs'),
    }),
  ),
})

const initialValues = {
  tiers: [
    {
      price: '',
      count: '',
    },
    {
      price: '',
      count: '',
    },
  ],
}

export default function TierForm() {
  const { setStep, setProject, previousStep, project } = useProjectForm()
  const [isLoading, setLoading] = useState(false)

  const handleSubmit = async (form) => {
    setLoading(true)
    setProject((project) => ({ ...project, ...form }))
    setStep(5)
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={tierFormSchema}
    >
      {({ handleSubmit, handleBlur, setFieldValue, errors, values }) => (
        <form
          className='bg-clear flex w-full flex-col space-y-2 px-8 sm:p-0'
          onSubmit={handleSubmit}
        >
          <div className='w-full space-y-1 sm:flex sm:grid-cols-2 sm:flex-row'>
            <div className='bg-clear flex flex-col px-4 py-4 sm:w-1/3'>
              <p className='pt-12 font-sans text-4xl font-bold text-neutral-900 sm:px-12'>
                Set your target
              </p>
              <p className='text-md pt-4 font-sans font-light text-neutral-700 sm:px-12'>
                How much are you looking to raise and how many NFTs do you want
                to mint?
              </p>
            </div>

            <div className='border-1 flex-1 flex-col rounded-l-3xl rounded-r-3xl border border-white bg-white bg-opacity-50 p-8 bg-blend-saturation sm:rounded-r-none sm:rounded-l-3xl sm:px-12 sm:py-24 md:px-24 lg:px-36'>
              <div className='flex w-full flex-col'>
                <p className='mb-2 text-2xl font-bold text-neutral-900'>
                  How many NFTs would you like to include for your round?
                </p>

                <TierCard
                  values={values}
                  project={project}
                  errors={errors}
                  handleBlur={handleBlur}
                  setFieldValue={setFieldValue}
                />
              </div>

              <button
                type='button'
                onClick={() =>
                  setFieldValue(`tiers[${values.tiers.length}]`, {
                    price: '',
                    count: '',
                  })
                }
                className={`my-5 flex w-full flex-row justify-center 
                  rounded-xl bg-blue-600 py-3 px-4 text-base font-medium
                  tracking-wider text-white shadow-xl hover:bg-blue-700`}
              >
                <span className='my-auto'>Add tier</span>
              </button>

              <p className='my-4 flex items-center rounded-2xl bg-gray-50 p-4 text-sm'>
                <InformationCircleIcon className='h-12  rounded-full text-blue-500' />
                <span className='ml-4 flex'>
                  The average donation in crowdfunding is £320. So if you would
                  like to raise £100,000 - make sure you set your NFT collection
                  to roughly 312 NFTs.
                </span>
              </p>

              <button
                disabled={isLoading === true}
                type='submit'
                className={`
                            mt-4 flex w-full flex-row justify-center rounded-xl bg-blue-600 py-3 
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

          <p className={` w-full py-4 px-4 text-center text-xs text-gray-500`}>
            By continuing, you agree to CrowdFund NFTs Terms and acknowledge
            receipt of our Privacy Policy.
          </p>
        </form>
      )}
    </Formik>
  )
}
