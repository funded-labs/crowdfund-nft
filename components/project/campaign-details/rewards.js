import { useEffect, useState } from 'react'
import translations from './translations'

export default function Rewards({ isLoading, project }) {
  // const [loadingTranslations, setLoadingTranslations] = useState(false)
  const [storyLanguage, setStoryLanguage] = useState('EN')
  const [storyTranslation, setStoryTranslation] = useState('')
  const [showTranslation, setShowTranslation] = useState(false)

  // useEffect(() => {
  //     if (isLoading || storyTranslation !== '' || loadingTranslations) return
  //     setLoadingTranslations(true)
  //     ;(async () => {
  //         fetch(
  //             `https://api-free.deepl.com/v2/translate?auth_key=b783d4a7-0e81-8675-a4bc-b16ac126cb78:fx&text=${project.rewards}&target_lang=en`
  //         )
  //             .then((r) => {
  //                 return r.json()
  //             })
  //             .then((translations) => {
  //                 const t = translations.translations[0]
  //                 setStoryLanguage(t.detected_source_language)
  //                 setStoryTranslation(t.text)
  //             })
  //             .catch((e) => console.error(e))
  //             .finally(() => setLoadingTranslations(false))
  //     })()
  // }, [isLoading, project])

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
        className='my-2 whitespace-pre-line whitespace-pre-wrap text-gray-600'
        dangerouslySetInnerHTML={{ __html: rewards }}
      />
      {storyLanguage !== 'EN' && (
        <div>
          <div>
            <button onClick={() => setShowTranslation(true)}>Translate</button>
          </div>
          {showTranslation && (
            <div
              className='my-2 whitespace-pre-line whitespace-pre-wrap text-gray-600'
              dangerouslySetInnerHTML={{ __html: storyTranslation }}
            />
          )}
        </div>
      )}
    </div>
  )
}
