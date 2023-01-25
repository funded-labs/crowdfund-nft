import { useRouter } from 'next/router'
import { useState } from 'react'
import Input from '@/components/forms/input'
import { Spinner } from '@/components/shared/loading-spinner'
import { useProjectForm } from './project-form-context'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { InformationCircleIcon } from '@heroicons/react/outline'
import Select from '@/components/forms/select'
import classNames from 'classnames'

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
  { label: 'BTC', value: 'btc' },
  { label: 'ETH', value: 'eth' },
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
      validationSchema={stepThreeSchema}
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

            <div className='border-1 flex-1 flex-col rounded-l-3xl rounded-r-3xl border border-white bg-white bg-opacity-50 p-8 bg-blend-saturation sm:rounded-r-none sm:rounded-l-3xl sm:px-36 sm:py-24'>
              <div className='flex w-full flex-col'>
                <p className='mb-2 text-2xl font-bold text-neutral-900'>
                  Please select your raise currency
                </p>
                <p className='text-md py-2 font-sans font-light text-neutral-700'>
                  Your crowdfund campaign will only be able to accept this
                  currency as participation payment
                </p>

                <div className='mt-4 w-full space-y-7 lg:flex lg:space-y-0 lg:space-x-12'>
                  {fundingTypes.map((type) => (
                    <div
                      key={type.value}
                      className={classNames(
                        'flow-root w-full rounded-lg bg-slate-200 py-4 pl-4 pr-20 shadow-md hover:cursor-pointer',
                        type.value === values.fundingType
                          ? 'shadow-blue-700'
                          : 'shadow-gray-300',
                      )}
                      onClick={() => setFieldValue('fundingType', type.value)}
                    >
                      <div className='flex'>
                        <img
                          src={
                            type.value === 'btc'
                              ? 'assets/bitcoin.svg'
                              : `assets/${type.value}.svg`
                          }
                          className='mr-4 h-12'
                        />
                        <span className='my-auto text-xl font-bold'>
                          {type.label}
                        </span>
                      </div>
                      <div className='my-2'>
                        <p className='text-sm text-gray-500'>
                          Smart contract built on:
                        </p>
                      </div>

                      <div className='text-gray-500'>
                        <div className='flex'>
                          <img
                            src={
                              type.value === 'eth'
                                ? 'assets/polygon.svg'
                                : 'assets/icp.svg'
                            }
                            className='my-auto mr-4 h-5'
                          />
                          <p className='text-lg font-bold'>
                            {type.value === 'eth' ? 'Polygon' : 'ICP'}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <p className='mt-5 text-2xl font-bold text-neutral-900'>
                How much would you like to raise?
              </p>
              <div className='flex'>
                <div className='w-1/4'>
                  <Input
                    name='targetAmount'
                    value={values.targetAmount}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder='Enter target amount'
                    type='number'
                  />
                </div>
                {values.fundingType === 'btc' ? (
                  <div className='my-auto ml-2 flex'>
                    <img
                      src='assets/bitcoin.svg'
                      className='my-auto mr-2 h-7'
                    />
                    <p className='text-lg font-bold text-neutral-900'>BTC</p>
                  </div>
                ) : (
                  <div className='my-auto ml-2 flex'>
                    <img
                      src={`assets/${values.fundingType}.svg`}
                      className={classNames(
                        'my-auto mr-2',
                        values.fundingType === 'eth' ? 'h-7' : 'h-5',
                      )}
                    />
                    <p className='text-lg font-bold text-neutral-900'>
                      {values.fundingType.toUpperCase()}
                    </p>
                  </div>
                )}
              </div>

              <p className='my-4 flex items-center rounded-2xl bg-gray-50 p-4 text-sm'>
                <InformationCircleIcon className='h-12  rounded-full text-blue-500' />
                <span className='ml-4 flex'>
                  Bear in mind that fees are deducated from each donation, we
                  charge 5% of every donation, and there is a flat 0.001 ICP fee
                  per transaction
                </span>
              </p>

              <div className='flex w-full flex-col space-y-1'>
                <p className=''>
                  How many NFTs would you like to include in your collection?
                </p>
                <Input
                  name='nftVolume'
                  value={values.nftVolume}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder='Enter target amount'
                  type='number'
                  endItem={() => <p className='font-bold text-black'>NFTs</p>}
                />
              </div>
              <p className='my-4 flex items-center rounded-2xl bg-gray-50 p-4 text-sm'>
                <InformationCircleIcon className='h-12  rounded-full text-blue-500' />
                <span className='ml-4 flex'>
                  The average donation in crowdfunding is £320. So if you would
                  like to raise £100,000 - make sure you set your NFT collection
                  to roughly 312 NFTs.
                </span>
              </p>
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
