export const handlePlugConnect = async (whitelist = []) => {
    if (!window?.ic?.plug) {
        window.open('https://plugwallet.ooo/', '_blank')
        return
    }

    await window?.ic?.plug?.requestConnect({
        whitelist,
    })
}

export const handleInfinityConnect = async (whitelist = []) => {
    if (!window?.ic?.infinityWallet) {
        window.open('https://wallet.infinityswap.one/', '_blank')
        return
    }

    await window?.ic?.infinityWallet?.requestConnect({
        whitelist,
    })
}

export const handleStoicConnect = async (whitelist=[]) => {
    const { StoicIdentity } = await import('ic-stoic-identity')

    await StoicIdentity.load().then(async identity => {
        if (identity === false) {
            await StoicIdentity.connect()
        }
    })
}