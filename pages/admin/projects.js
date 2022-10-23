import { useBackend } from '@/context/backend'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import AdminPageLayout from './admin-layout'

const Projects = () => {
  const [projects, setProjects] = useState([])
  const { backendWithAuth } = useBackend()
  
  useEffect(() => {
    if (!backendWithAuth) return
    
    backendWithAuth
      .listProjects([], '', [])
      .then((projects) => {
        const sorted = projects.sort((a, b) => b.project.id - a.project.id)
        setProjects(sorted)
      })
      .catch(console.log)

  }, [backendWithAuth])

  const columns = ['ID', 'Creator', 'Category', 'Title']

  return (
    <AdminPageLayout title='Projects'>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
      <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col, index) => (
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6" key={index}>
                  {col}
                </th>
              ))}
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {projects.map(({ owner, project }) => (
              <tr key={project.id}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                  {project.id}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{owner.firstName}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{project.category}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{project.title}</td>
                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  <Link href={`/admin/edit-project?projectId=${project.id}`} as={`/admin/edit-project.html?projectId=${project.id}`}>
                    <a className="text-indigo-600 hover:text-indigo-900">
                      Edit
                    </a>
                  </Link>
                  <Link href={`/project?projectId=${project.id}`} as={`/project.html?projectId=${project.id}`}>
                    <a className="text-gray-600 hover:text-gray-800 ml-3">
                      View project
                    </a>
                  </Link>
                  <Link
                    href={`/admin/conversation?principal=${owner.id.toText()}`} as={`/admin/conversation.html?principal=${owner.id.toText()}`}
                  >
                    <a className="text-gray-600 hover:text-gray-800 ml-3">
                      Message
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

export default Projects
