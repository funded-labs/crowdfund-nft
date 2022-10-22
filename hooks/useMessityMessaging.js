import { useBackend } from "@/context/backend"
import { HttpAgent } from "@dfinity/agent"
import { Principal } from "@dfinity/principal"
import { Messity } from "messity-client"
import { useCallback, useEffect, useMemo, useState } from "react"

const useMessityMessaging = () => {
  const [refreshDate, setRefreshDate] = useState(new Date())
  const [sentMessages, setSentMessages] = useState([])
  const [receivedMessages, setReceivedMessages] = useState([])
  const { nnsIdentity } = useBackend()

  const agent = useMemo(() => {
    if (!nnsIdentity) return null
    
    return new HttpAgent({
      host: 'https://ic0.app',
      identity: nnsIdentity
    })
  }, [nnsIdentity])

  const messityClient = useMemo(() => {
    if (!agent) return null

    return new Messity(agent)
  }, [agent])

  useEffect(() => {
    if (!messityClient) return

    messityClient
      .getSentMessages()
      .then(setSentMessages)
      .catch(console.log)
    
    messityClient
      .getReceivedMessages()
      .then(setReceivedMessages)
      .catch(console.log)
  }, [messityClient, refreshDate])

  const formatConversation = useCallback((sentMessages, receivedMessages) => {
    return [
      ...sentMessages.map(m => ({ ...m, type: 'mine' })),
      ...receivedMessages.map(m => ({ ...m, type: 'theirs' }))
    ].sort((a, b) => {
      const aTimestamp = Number(a.header.timestamp)
      const bTimestamp = Number(b.header.timestamp)

      if(aTimestamp > bTimestamp) return 1
      if(aTimestamp < bTimestamp) return -1
      return 0
    })
  }, [])

  const loadConversation = useCallback((withPrincipal) => {
    if (!messityClient) return

    return formatConversation(
      sentMessages.filter(message => message.header.to[0].toText() === withPrincipal),
      receivedMessages.filter(message => message.header.sender.toText() === withPrincipal)
    )
  }, [messityClient, sentMessages, receivedMessages])

  const sendMessage = useCallback(({ toPrincipal, message }) => {
    if (!messityClient) return

    return messityClient.sendMessage({
      to: [Principal.fromText(toPrincipal)],
      from: [],
      messageChain: [],
      reference: [],
      messageType: [{
        mail: null
      }],
      externalId: [],
      subject: [],
      body: message
    })

  }, [messityClient])

  const refreshMessages = useCallback(() => {
    setRefreshDate(new Date())
  }, [setRefreshDate])

  return { loadConversation, sendMessage, refreshMessages }

}

export default useMessityMessaging
