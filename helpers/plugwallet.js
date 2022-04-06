export const handleConnect = async (whitelist = []) => {
    if (!window?.ic?.plug) {
        window.open('https://plugwallet.ooo/', '_blank')
        return
    }

    await window?.ic?.plug?.requestConnect({
        whitelist,
    })
}
