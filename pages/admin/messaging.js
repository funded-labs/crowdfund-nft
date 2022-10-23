import { useBackend } from '@/context/backend'
import useMessityMessaging from 'hooks/useMessityMessaging'
import Link from 'next/link'
import React, { useCallback, useEffect, useState } from 'react'
import AdminPageLayout from './admin-layout'

const Messaging = () => {
  const [principals, setPrincipals] = useState([])
  const [principalProjectMap, setPrincipalProjectmap] = useState({})
  const [conversations, setConversations] = useState([])
  const { loadConversation } = useMessityMessaging()
  const { backendWithAuth } = useBackend()

  useEffect(() => {
    if (!backendWithAuth) return

    backendWithAuth
      .listProjects([], '', [])
      .then((projects) => {
        const _principalProjectMap = {}
        projects.forEach(p => {
          const principal = p.owner.id.toString()
          if (!_principalProjectMap[principal]) {
            _principalProjectMap[principal] = [p.project]
          } else {
            _principalProjectMap[principal] = [..._principalProjectMap[principal], p.project]
          }
        })
        setPrincipalProjectmap(_principalProjectMap)

        setPrincipals(projects.map(p => p.owner.id.toString()).filter((p, i, self) => self.indexOf(p) === i))
      })
      .catch(console.log)
  }, [backendWithAuth])

  useEffect(() => {
    const _conversations = principals.map(principal => {
      return { principal, messages: loadConversation(principal) }
    })
    setConversations(_conversations.filter(conv => conv.messages && conv.messages.length > 0))
  }, [principals, loadConversation])

  const columns = ['Principal', 'Project', 'Number of messages']

  return (
    <AdminPageLayout title='Messaging'>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                {columns.map(col => (
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                    {col}
                  </th>
                ))}
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {conversations.map(({ principal, messages }) => (
                <tr key={principal}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    {principal}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {principalProjectMap[principal].map(project => (
                      <p>{project.title}</p>
                    ))}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{messages.length}</td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <Link 
                      href={{
                        pathname: '/admin/conversation/[principal]',
                        query: { principal },
                      }}
                    >
                      <a className="text-gray-600 hover:text-gray-800 ml-3">
                        Go to conversation
                      </a>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </AdminPageLayout>
  )
}

export default Messaging
