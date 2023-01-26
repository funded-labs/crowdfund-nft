import { useRouter } from 'next/router'
import { useState } from 'react'
import Input from '@/components/forms/input'
import { Spinner } from '@/components/shared/loading-spinner'
import { useProjectForm } from './project-form-context'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { InformationCircleIcon, XCircleIcon } from '@heroicons/react/outline'
import Select from '@/components/forms/select'
import classNames from 'classnames'

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
  const router = useRouter()

  const handleSubmit = async (form) => {
    try {
      setLoading(true)

      setProject((project) => ({ ...project, ...form }))

      setStep(5)
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
      validationSchema={tierFormSchema}
    >
      {({
        handleSubmit,
        handleBlur,
        handleChange,
        setFieldValue,
        errors,
        values,
      }) => (
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
                {/* space-y-7 lg:flex lg:flex-wrap lg:space-y-0 lg:space-x-2 */}
                <div className='mt-4 grid w-full grid-cols-6 gap-4'>
                  {values.tiers.map((tier, index) => (
                    <div
                      key={index + 1}
                      className='col-span-6 flow-root rounded-lg bg-slate-200 py-4 px-4 shadow-md shadow-gray-300 hover:cursor-pointer xl:col-span-3 2xl:col-span-2'
                    >
                      <div className='flex w-full'>
                        <div className='mb-2 flex w-3/5 text-2xl font-bold text-neutral-900'>
                          Tier {index + 1}
                        </div>
                        <div className='flex w-2/5 justify-end'>
                          <XCircleIcon
                            onClick={() => {
                              const tiers = [...values.tiers]
                              tiers.splice(index, 1)
                              setFieldValue('tiers', tiers)
                            }}
                            className='h-7 text-gray-400 hover:text-gray-500'
                          />
                        </div>
                      </div>

                      <p className='pt-2 font-sans text-sm font-normal text-neutral-700'>
                        NFT price:
                      </p>
                      <div className='flex w-full flex-wrap'>
                        <Input
                          name='tiers'
                          value={tier.price}
                          onChange={(e) => {
                            const tiers = [...values.tiers]
                            tiers[index].price = e.currentTarget.value
                            setFieldValue('tiers', tiers)
                          }}
                          onBlur={handleBlur}
                          placeholder='Enter target amount'
                          type='number'
                        />

                        {project.fundingType === 'btc' ? (
                          <div className='my-auto ml-2 flex'>
                            <img
                              src='assets/bitcoin.svg'
                              className='my-auto mr-2 h-7'
                            />
                            <p className='text-lg font-bold text-neutral-900'>
                              BTC
                            </p>
                          </div>
                        ) : (
                          <div className='my-auto ml-2 flex'>
                            <img
                              src={`assets/${project.fundingType}.svg`}
                              className={classNames(
                                'my-auto mr-2',
                                project.fundingType === 'eth' ? 'h-7' : 'h-5',
                              )}
                            />
                            <p className='text-lg font-bold text-neutral-900'>
                              {project.fundingType.toUpperCase()}
                            </p>
                          </div>
                        )}

                        {errors.tiers && errors.tiers.length > 0 && (
                          <div className='flex w-full flex-row items-center text-xs text-red-500'>
                            {errors.tiers[index] &&
                              errors.tiers[index].price && (
                                <p>{errors.tiers[index].price}</p>
                              )}
                          </div>
                        )}
                      </div>

                      <p className='pt-2 font-sans text-sm font-normal text-neutral-700'>
                        Number of NFTs:
                      </p>
                      <Input
                        name='tiers'
                        value={tier.count}
                        onChange={(e) => {
                          const tiers = [...values.tiers]
                          tiers[index].count = e.currentTarget.value
                          setFieldValue('tiers', tiers)
                        }}
                        onBlur={handleBlur}
                        placeholder='Enter target amount'
                        type='number'
                      />

                      {errors.tiers && errors.tiers.length > 0 && (
                        <div className='flex w-full flex-row items-center text-xs text-red-500'>
                          {errors.tiers[index] && errors.tiers[index].count && (
                            <p>{errors.tiers[index].count}</p>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
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

              {/* {Object.values(errors.tiers).length > 0 && (
                <div className='flex w-full flex-row items-center text-sm text-red-500'>
                  {Object.values(errors.tiers)[0].price && (
                    <p>{Object.values(errors.tiers)[0].price}</p>
                  )}
                  {Object.values(errors.tiers)[0].count && (
                    <p>{Object.values(errors.tiers)[0].count}</p>
                  )}
                </div>
              )} */}

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
