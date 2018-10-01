import {
	App,
	Router,
	IAppOptions
} from './exports'

export default (router: Router, options?: IAppOptions) => {
	return App.init(router, options)
}
