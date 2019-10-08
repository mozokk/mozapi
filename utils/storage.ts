import multer from 'multer'

export const getUploadCreator = (fileSize, destination, nameFunction) => {
    const getStorage = (destination, nameFunction) => {
        return multer.diskStorage({
            destination: (_req, _file, cb) => {
                cb(null, destination)
            },
            filename: nameFunction
        })
    }

    return multer({
        storage: getStorage(destination, nameFunction),
        limits: {
            fileSize
        }
    })
}
