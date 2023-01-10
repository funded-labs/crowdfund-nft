export const imgFileToInt8Array = async (file) => {
  const buffer = await file.arrayBuffer()
  var i8arr = new Uint8Array(buffer)
  return Array.prototype.slice.call(i8arr)
}
