import { Spinner } from '@/components/shared/loading-spinner'

import { useState } from 'react'

const AdminButtons = ({ backend, projectId }) => {
    const [loading, setLoading] = useState({
        approveButton: false,
        unapproveButton: false,
        whitelistButton: false,
        liveButton: false,
    })

    const setLoadingState = (key, value) => {
        setLoading({
            ...loading,
            [key]: value,
        })
    }

    const updateStatus = (func, key) => {
        setLoadingState(key, true)
        func(projectId)
            .then(() => alert('Done!'))
            .catch((e) => {
                console.error(e)
                alert(e)
            })
            .finally(() => setLoadingState(key, false))
    }

    return (
        <div className='bg-white py-4 px-4 flex flex-col space-y-6'>
            <div className='border border-red-400 rounded-lg bg-red-100'>
                <div className='px-4 py-4'>
                    Admin Functions
                    <div className='text-xs'>
                        You will only be able to call these functions as an
                        admin.
                    </div>
                </div>
                <div className='px-4 py-4 border-t border-red-300'>
                    <button
                        className={`
                    flex flex-row justify-center w-full 
                    bg-slate-900 text-white py-2 font-medium 
                    text-sm tracking-wider rounded-xl shadow-xl 
                    hover:bg-gray-800`}
                        onClick={() =>
                            updateStatus(
                                backend.approveProject,
                                'approveButton'
                            )
                        }>
                        {loading.approveButton ? (
                            <span className='h-5 w-5'>
                                <Spinner show={true} />
                            </span>
                        ) : (
                            <>Approve Project</>
                        )}
                    </button>
                    <button
                        className={`
                    flex flex-row justify-center w-full 
                    bg-slate-900 text-white py-2 font-medium 
                    text-sm tracking-wider rounded-xl shadow-xl 
                    hover:bg-gray-800 mt-2`}
                        onClick={() =>
                            updateStatus(
                                backend.unapproveProject,
                                'unapproveButton'
                            )
                        }>
                        {loading.unapproveButton ? (
                            <span className='h-5 w-5'>
                                <Spinner show={true} />
                            </span>
                        ) : (
                            <>Unapprove Project</>
                        )}
                    </button>
                </div>
                <div className='px-4 py-4 border-t border-red-300'>
                    <button
                        className={`
                    flex flex-row justify-center w-full 
                    bg-slate-900 text-white py-2 font-medium 
                    text-sm tracking-wider rounded-xl shadow-xl 
                    hover:bg-gray-800`}
                        onClick={() =>
                            updateStatus(
                                backend.openProjectToWhiteList,
                                'whitelistButton'
                            )
                        }>
                        {loading.whitelistButton ? (
                            <span className='h-5 w-5'>
                                <Spinner show={true} />
                            </span>
                        ) : (
                            <>Open Project to Whitelist</>
                        )}
                    </button>
                    <button
                        className={`
                    flex flex-row justify-center w-full 
                    bg-slate-900 text-white py-2 font-medium 
                    text-sm tracking-wider rounded-xl shadow-xl 
                    hover:bg-gray-800 mt-2`}
                        onClick={() =>
                            updateStatus(backend.makeProjectLive, 'liveButton')
                        }>
                        {loading.liveButton ? (
                            <span className='h-5 w-5'>
                                <Spinner show={true} />
                            </span>
                        ) : (
                            <>Make Project Live</>
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AdminButtons
