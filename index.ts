import { Application, AppOptions } from './exports'

export * from './exports'

export default (options: AppOptions) => {
	return Application.init(options)
}
