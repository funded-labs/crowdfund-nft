import { Principal } from '@dfinity/principal'

const natTobytes = (n) => {
    if (n < 256) {
        return [0, 0, 0, n]
    } else if (n < 65536) {
        return [0, 0, (n >> 8) & 0xff, n & 0xff]
    } else if (n < 16777216) {
        return [0, (n >> 16) & 0xff, (n >> 8) & 0xff, n & 0xff]
    } else {
        return [(n >> 24) & 0xff, (n >> 16) & 0xff, (n >> 8) & 0xff, n & 0xff]
    }
}

export const tokenIdentifierFromIndex = (canister, index) => {
    const p = Principal.fromText(canister)
    const arr = Array.from(p.toUint8Array())

    const tds = [10, 116, 105, 100] //b"\x0Atid"
    const whole = [...tds, ...arr, ...natTobytes(index)]

    return Principal.fromUint8Array(whole).toText()
}
