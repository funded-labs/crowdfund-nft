export const imgFileToInt8Array = async (file) => {
    const buffer = await file.arrayBuffer()
    var i8arr = new Int8Array(buffer)
    return Array.prototype.slice.call(i8arr)
}

function convertUint8ArrayToBinaryString(u8Array) {
    var i,
        len = u8Array.length,
        b_str = ''
    for (i = 0; i < len; i++) {
        b_str += String.fromCharCode(u8Array[i])
    }
    return b_str
}

export const imgInt8ArrayToDataURL = (arr) => {
    try {
        return (
            'data:image/png;base64,' +
            btoa(
                convertUint8ArrayToBinaryString(
                    new Uint8Array(new Int8Array(arr).buffer)
                )
            )
        )
    } catch (e) {
        console.error(e)
        return ''
    }
}
