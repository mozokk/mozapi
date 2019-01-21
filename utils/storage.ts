import multer from 'multer'
import { createFilename } from '.'

export const getStorage = () => {
	return multer.diskStorage({
		destination: (_req, _file, cb) => {
			cb(null, './storage')
		},
		filename: (req: any, file, cb) => {
			req.body.filename = createFilename(file.mimetype)
			cb(null, req.body.filename)
		}
	})
}
