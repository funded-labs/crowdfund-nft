import Linkify from 'react-linkify'
import { useEffect, useState } from 'react'
import translations from './translations'
// import fetch from 'node-fetch'

export default function Story({ isLoading, project }) {
    // const [loadingTranslations, setLoadingTranslations] = useState(false)
    const [storyLanguage, setStoryLanguage] = useState('EN')
    const [storyTranslation, setStoryTranslation] = useState('')
    const [showTranslation, setShowTranslation] = useState(false)

    // useEffect(() => {
    //     if (isLoading || storyTranslation !== '' || loadingTranslations) return
    //     setLoadingTranslations(true)
    //     ;(async () => {
    //         fetch(
    //             `https://api-free.deepl.com/v2/translate?auth_key=b783d4a7-0e81-8675-a4bc-b16ac126cb78:fx&text=${project.story}&target_lang=en`
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
        setStoryTranslation(translations[project.id].story)
    }, [project])

    if (isLoading) {
        return (
            <div className='w-full shadow p-4 rounded-2xl bg-white flex flex-col space-y-2 items-start'>
                <div className='w-16 h-6 rounded bg-gray-200 animate-pulse' />

                <div className='h-4 rounded bg-gray-200 animate-pulse w-full' />
                <div className='h-4 rounded bg-gray-200 animate-pulse w-full' />
                <div className='h-4 rounded bg-gray-200 animate-pulse w-full' />
                <div className='h-4 rounded bg-gray-200 animate-pulse w-7/12' />

                <div className='py-5' />

                <div className='h-4 rounded bg-gray-200 animate-pulse w-full' />
                <div className='h-4 rounded bg-gray-200 animate-pulse w-full' />
                <div className='h-4 rounded bg-gray-200 animate-pulse w-4/12' />
            </div>
        )
    }

    const { story } = project

    return (
        <div className='w-full shadow p-4 rounded-2xl bg-white flex flex-col items-start'>
            <p className='font-bold text-base text-black'>Story</p>

            {/* User Input */}
            <Linkify>
                <div className='text-gray-600 my-2 whitespace-pre-line whitespace-pre-wrap' dangerouslySetInnerHTML={{ __html: story }}/>
                {storyLanguage !== 'EN' && (
                    <div>
                        <div>
                            <button
                                onClick={() =>
                                    setShowTranslation(!showTranslation)
                                }>
                                Translate
                            </button>
                        </div>
                        {showTranslation && (
                            <div className='text-gray-600 my-2 whitespace-pre-line whitespace-pre-wrap' dangerouslySetInnerHTML={{ __html: storyTranslation }}/>
                        )}
                    </div>
                )}
            </Linkify>
        </div>
    )
}
