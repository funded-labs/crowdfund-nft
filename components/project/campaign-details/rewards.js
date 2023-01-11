import { useEffect, useState } from 'react'
import translations from './translations'
import styles from './Rewards.module.scss'
import classNames from 'classnames'

export default function Rewards({ isLoading, project }) {
  const [storyLanguage, setStoryLanguage] = useState('EN')
  const [storyTranslation, setStoryTranslation] = useState('')
  const [showTranslation, setShowTranslation] = useState(false)

  useEffect(() => {
    if (!project || !translations.hasOwnProperty(project.id)) return
    setStoryLanguage('NOT EN')
    setStoryTranslation(translations[project.id].rewards)
  }, [project])

  if (isLoading) {
    return (
      <div className='flex w-full flex-col items-start space-y-2 rounded-2xl bg-white p-8 shadow'>
        <div className='h-6 w-16 animate-pulse rounded bg-gray-200' />

        <div className='h-4 w-full animate-pulse rounded bg-gray-200' />
        <div className='h-4 w-full animate-pulse rounded bg-gray-200' />
        <div className='h-4 w-full animate-pulse rounded bg-gray-200' />
        <div className='h-4 w-7/12 animate-pulse rounded bg-gray-200' />

        <div className='py-5' />

        <div className='h-4 w-full animate-pulse rounded bg-gray-200' />
        <div className='h-4 w-full animate-pulse rounded bg-gray-200' />
        <div className='h-4 w-4/12 animate-pulse rounded bg-gray-200' />
      </div>
    )
  }

  const { rewards } = project

  return (
    <div className='flex w-full flex-col items-start rounded-2xl bg-white p-8 shadow'>
      <p className='text-2xl font-bold text-black'>Rewards</p>

      <div
        className={classNames(
          'my-2 flex flex-1 whitespace-pre-wrap text-gray-600',
          styles.projectRewards,
        )}
        dangerouslySetInnerHTML={{ __html: rewards }}
      />
      {storyLanguage !== 'EN' && (
        <div>
          <div>
            <button onClick={() => setShowTranslation(true)}>Translate</button>
          </div>
          {showTranslation && (
            <div
              className='my-2 whitespace-pre-wrap text-gray-600'
              dangerouslySetInnerHTML={{ __html: storyTranslation }}
            />
          )}
        </div>
      )}
    </div>
  )
}
