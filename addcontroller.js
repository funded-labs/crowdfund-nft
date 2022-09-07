const { exec } = require('child_process')
const fs = require('fs')

execute = (cmd) => {
    exec(cmd, (err, stdout, stderr) => {
        if (err) return console.error(err)
        console.log(`stdout: ${stdout}`)
        console.log(`stderr: ${stderr}`)
    })
}

addController = (canister, controller) => {
    execute(
        `dfx canister --network ic --wallet xohn2-daaaa-aaaak-aadvq-cai update-settings ${canister} --add-controller ${controller}`
    )
}

addControllerToAllCanisters = (controller) => {
    fs.readFile('canister_ids.json', 'utf8', (err, data) => {
        if (err) return console.error(err)
        const canisters = Object.keys(JSON.parse(data))
        console.log(canisters)
        canisters.forEach((canister) => addController(canister, controller))
    })
}

addControllerToAllCanisters('kkrsm-2qaaa-aaaao-aajza-cai')
