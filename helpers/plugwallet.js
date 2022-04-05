export const handleConnect = async (whitelist = []) => {
    if (!window?.ic?.plug) {
        window.open('https://plugwallet.ooo/', '_blank')
        return
    }

    const connected = await window?.ic?.plug?.requestConnect({
        whitelist,
    })

    if (!connected) return
}
