export * from './interfaces'
export * from './config'
export * from './logger'
export * from './middleware'
export * from './router'
export * from './app'

import {
	App,
	Router,
	IAppOptions
} from '.'

export default (router: Router, options?: IAppOptions) => {
	App
	.init(router, options)
	.start()
}
