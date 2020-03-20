import swaggerJsdoc from 'swagger-jsdoc'
import { config } from '../config'

const options = {
	swaggerDefinition: {
		info: {
			title: `${config.name} api documentation`,
			version: config.version,
			description: `API Documentation for ${config.name} v${config.version}`,
		},
	},
	basePath: '/api/v1',
	apis: ['../**/*.router.ts'],
}

export default swaggerJsdoc(options)
