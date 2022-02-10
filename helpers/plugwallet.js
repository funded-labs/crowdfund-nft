export const handleConnect = async (
    onConnectCallback,
    whitelist = [],
    host = null,
    timeout = 120000
) => {
    if (!window?.ic?.plug) {
        window.open('https://plugwallet.ooo/', '_blank')
        return
    }

    const connected = await window?.ic?.plug?.requestConnect({
        whitelist,
        host,
        timeout,
    })

    if (!connected) return

    onConnectCallback(connected)
}
