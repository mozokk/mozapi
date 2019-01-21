import {
	App,
	IAppOptions
} from './exports'

export * from './exports'

export default (options: IAppOptions) => {
	return App.init(options)
}
