import Messaging from '@/components/manage-project/messaging'
import { useRouter } from 'next/router'
import React from 'react'
import AdminPageLayout from './admin-layout'

const Conversation = () => {
  const { query } = useRouter()
  const { principal } = query

  return (
    <AdminPageLayout>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 md:px-8'>
        <Messaging otherPartyPrincipal={principal} />
      </div>
    </AdminPageLayout>
  )
}

export default Conversation
