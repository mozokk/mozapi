import multer from 'multer'
import path from 'path'
import { createFilename } from '.'

export const getStorage = () => {
	return multer.diskStorage({
		destination: (_req, _file, cb) => {
			cb(null, path.join(__dirname,'..', '..', '..', 'storage'))
		},
		filename: (req: any, file, cb) => {
			req.body.filename = createFilename(file.mimetype)
			cb(null, req.body.filename)
		}
	})
}
