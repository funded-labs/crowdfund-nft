import { createContext, useContext } from 'react'
import { useBackend } from '@/context/backend'
import { makeEscrowActor } from '@/ui/service/actor-locator'
import { useQuery } from 'react-query'

const INITIAL_STATE = {
    projectId: null,
    project: null,
    isLoading: true,
    isError: true,
    isFetching: true
}

export const ProjectDetailsContext = createContext(INITIAL_STATE)

export function ProjectDetailsProvider({
    children,
    projectId
}) {
    const { backend } = useBackend()
    const escrowActor = makeEscrowActor()
    
    const {
        data: _project,
        isLoading,
        isError,
        isFetching,
    } = useQuery(
        ['project-details', projectId, backend, escrowActor],
        async () => {
            if (!backend) return null
            if (!projectId) return null
            if (!escrowActor) return null

            const { project, owner } = await backend.getProjectWithOwner(
                projectId
            )

            let stats = {
                nftNumber: Number(project.nftVolume),
                nftPriceE8S:
                    Number(BigInt(project?.goal) / project?.nftVolume) *
                    100_000_000,
                endTime: 0,
                nftsSold: 0,
                openSubaccounts: 0,
            }

            if (
                Object.keys(project?.status?.[0] || { submitted: null })[0] !==
                'fully_funded'
            ) {
                const newStats = await escrowActor.getProjectStats(+project.id)

                if (newStats?.nftNumber > 0) {
                    stats = {
                        nftNumber: Number(newStats.nftNumber),
                        nftPriceE8S: Number(newStats.nftPriceE8S),
                        endTime: Number(newStats.endTime),
                        nftsSold: Number(newStats.nftsSold),
                        openSubaccounts: Number(newStats.openSubaccounts),
                    }
                }
            }

            return {
                ...project,
                stats,
                owner,
            }
        },
        {
            refetchOnWindowFocus: false,
        }
    )

    const value = {
        project: _project,
        isLoading,
        isError,
        isFetching
    }

    return (
        <ProjectDetailsContext.Provider value={value}>
            {children}
        </ProjectDetailsContext.Provider>
    )
}

export function useProjectDetails() {
    const context = useContext(ProjectDetailsContext)
    return context
}
