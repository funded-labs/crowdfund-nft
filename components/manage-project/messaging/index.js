import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Messity } from 'messity-client'
import { HttpAgent } from '@dfinity/agent'
import { useBackend } from '@/context/backend'
import { Principal } from '@dfinity/principal'
import classNames from 'classnames'
import { Spinner } from '@/components/shared/loading-spinner'
import { format } from 'date-fns'
import useMessityMessaging from 'hooks/useMessityMessaging'

const CROWDFUND_DBOX_PRINCIPAL = 'ufwav-jci66-7ag3c-7yulf-6ofg3-halah-z3lbs-sfeke-dvkrt-33xs4-qae'

const Messaging = ({ otherPartyPrincipal }) => {
  const [allMessages, setMessages] = useState([])
  const { loadConversation, sendMessage, refreshMessages } = useMessityMessaging()
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState()
  const bottomRef = useRef()

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [allMessages, bottomRef])

  const loadMessages = useCallback(() => {
    setMessages(loadConversation(otherPartyPrincipal || CROWDFUND_DBOX_PRINCIPAL) || [])
  }, [otherPartyPrincipal, loadConversation])

  useEffect(() => {
    loadMessages()
  }, [loadMessages])

  const send = () => {
    setSaving(true)

    sendMessage({ toPrincipal: otherPartyPrincipal || CROWDFUND_DBOX_PRINCIPAL, message })
      .then(() => {
        setMessage('')
        refreshMessages()
      })
      .catch(console.log)
      .finally(() => {
        setSaving(false)
      })
  }

  const renderMessage = ({ type, body, header: { timestamp } }) => {
    const date = new Date(Number(timestamp) / 10 ** 6)

    return (
      <li className={classNames('mt-2 px-2 inline-block clear-both', type === 'mine' ? 'float-right text-right' : 'float-left text-left')}>
        <div className={classNames('py-2 px-4 rounded-full', type === 'mine' ? 'bg-blue-500 text-white' : 'bg-gray-300')}>
          <span dangerouslySetInnerHTML={{ __html: body }}/>
        </div>
        <span className={classNames('text-gray-500 text-sm', type === 'mine' ? 'text-right' : 'text-left')}>{format(date, 'dd.MM HH:mm')}</span>
      </li>
    )
  }

  return (
    <div className="w-full flex flex-col space-y-4">
      <div className='w-full rounded-2xl shadow bg-white overflow-hidden'>
        <h3 className='mt-2 mx-3 text-2xl font-medium'>Chat with Crowdfund NFT Admin</h3>
        <div className='h-96 overflow-scroll'>
          <ul className='w-full px-2 inline-block clear-both'>
            {allMessages.map(renderMessage)}
          </ul>
          <div ref={bottomRef} />
        </div>
        <div className='flex p-3'>
          <input className='bg-gray-200 rounded-full p-3 flex-1 focus:outline-0' value={message} onChange={(event) => setMessage(event.target.value)}></input>
          <button
            onClick={send}
            disabled={saving}
            className={`
              flex flex-row justify-center bg-blue-600 text-white py-3 
              px-4 font-medium text-base rounded-xl
              shadow-xl hover:bg-blue-700
          `}>
              {saving ? (
                  <span className='h-5 w-5'>
                      <Spinner show={true} />
                  </span>
              ) : (
                  <>Send</>
              )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Messaging
