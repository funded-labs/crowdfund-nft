import { useState } from 'react'
import { Principal } from '@dfinity/principal'
import { Spinner } from '@/components/shared/loading-spinner'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useBackend } from '@/context/backend'
import { useProjectForm } from './project-form-context'
import { imgFileToInt8Array } from '../../../helpers/imageHelper'
import { makeImagesActor, getImageURL } from '@/ui/service/actor-locator'
import { selectWalletModalPromise } from '../../shared/select-wallet-modal'
import { ExclamationCircleIcon } from '@heroicons/react/outline'

const AWS = require('aws-sdk')

const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  accessKeyId: process.env.NEXT_PUBLIC_FLEEK_API_KEY,
  secretAccessKey: process.env.NEXT_PUBLIC_FLEEK_API_SECRET,
  endpoint: 'https://storageapi2.fleek.co',
  region: 'us-east-1',
  s3ForcePathStyle: true,
})

const stepFiveSchema = Yup.object().shape({
  // walletId: Yup.string().required('You must connect your wallet to proceed'),
})

const initialValues = {
  // walletId: null,
}

export default function StepSix() {
  const { backendWithAuth } = useBackend()
  const backend = backendWithAuth
  const [isLoading, setLoading] = useState(false)
  const { profile, project, previousStep, setStep } = useProjectForm()

  const uploadVideo = (video) => {
    return new Promise((resolve, reject) => {
      s3.listBuckets((err, data) => {
        if (err) {
          reject(err)
          return
        }

        const bucket = data.Buckets?.[0]

        if (!bucket) {
          reject('No buckets available')
          return
        }

        const params = {
          Bucket: bucket.Name,
          Key: `videos/${crypto.randomUUID()}`,
          ContentType: video.type,
          Body: video,
          ACL: 'public-read',
        }

        const request = s3.putObject(params, (err, data) => {
          if (err) reject(err)
        })

        request
          .on('httpHeaders', (statusCode, headers) => {
            const ipfsHashV0 = headers['x-fleek-ipfs-hash-v0']

            resolve(`http://ipfs.fleek.co/ipfs/${ipfsHashV0}`)
          })
          .send()
      })
    })
  }

  const handleSubmit = (form) => {
    selectWalletModalPromise()
      .then(async (wallet) => {
        const walletId = wallet.id
        setLoading(true)
        try {
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

          let videoUrl = ''
          if (p.video) {
            videoUrl = await uploadVideo(p.video)
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
            video: videoUrl ? [videoUrl] : [],
            fundingType: [[{ [p.fundingType]: null }]],
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
            profileImgURL = getImageURL(await imageActor.addAsset(profileImg))
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
      })
      .catch((err) => {})
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
              <p className='pt-12 font-sans text-4xl font-bold tracking-tight text-neutral-900 sm:px-12'>
                Submit project
              </p>
              <p className='text-md pt-4 font-sans font-light text-neutral-500 sm:px-12'>
                You&apos;re ready to sumbit your project, you will need a wallet
                to upload your project to the Internet Computer.
              </p>
            </div>
            <div>
              <div className='border-1 h-screen flex-1 flex-col rounded-l-3xl rounded-r-3xl border border-white bg-white bg-opacity-50 p-8 bg-blend-saturation sm:rounded-r-none sm:rounded-l-3xl sm:px-36 sm:py-24'>
                <p className=''>
                  To submit, you will be prompted to connect a wallet.
                </p>
                <p className='my-4 flex items-center rounded-2xl bg-white p-4 text-sm'>
                  <ExclamationCircleIcon className='h-12  rounded-full text-red-500' />
                  <span className='ml-4 flex'>
                    This will be used as your project creator wallet by default
                    - where you will receive your funds if your crowdfunding
                    project gets successfully funded.
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
                  {!isLoading && <span>Submit your project</span>}

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
                {/* <a className='bg-blue-300 rounded-xl py-6' />
                            <a className='bg-blue-300 rounded-xl py-6' /> */}
              </div>
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
