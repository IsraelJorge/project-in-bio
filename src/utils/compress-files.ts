// eslint-disable-next-line import/named
import imageCompression, { Options } from 'browser-image-compression'

export const compressFiles = async (files: File[]) => {
  try {
    const compressPromises = files.map(async file => await compressImage(file))

    return (await Promise.all(compressPromises)).filter(Boolean) as File[]
  } catch (error) {
    console.log(error)
    return null
  }
}

export const compressImage = async (file: File) => {
  const options: Options = {
    maxSizeMB: 0.2, // 200KB,
    maxWidthOrHeight: 900,
    useWebWorker: true
  }

  return new Promise<File | null>(resolve => {
    imageCompression(file, options)
      .then(compressedFile => {
        resolve(compressedFile)
      })
      .catch(error => {
        console.log(error)
        resolve(null)
      })
  })
}
