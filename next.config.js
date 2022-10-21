const DFXWebPackConfig = require("./dfx.webpack.config")
DFXWebPackConfig.initCanisterIds()
const withTM = require('next-transpile-modules')(['messity-client']);

const webpack = require("webpack")

// Make DFX_NETWORK available to Web Browser with default "local" if DFX_NETWORK is undefined
const EnvPlugin = new webpack.EnvironmentPlugin({
    DFX_NETWORK: "local",
})

module.exports = withTM({
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        // Plugin
        config.plugins.push(EnvPlugin)

        // Important: return the modified config
        return config
    },
})
