import path from 'path'

import { Config } from './exports'

require('dotenv').config()

export const config: Config = {
	name: process.env.APP_NAME || 'app',
	version: process.env.VERSION || '0.0.1',
	port: process.env.PORT || 3000,
	stage: process.env.STAGE || 'development',
	runtype: process.env.RUNTYPE || 'express',
	domainPath: process.env.DOMAIN_PATH || path.join(__dirname, '..', 'domains'),
	aws: {
		region: process.env.AWS_REGION || process.env.AWS_LOCAL_REGION,
		apiVersion: process.env.AWS_API_VERSION || '',
		params: {
			Bucket: process.env.AWS_S3_BUCKET_NAME || 'AWSBUCKETNAME',
		},
		topic: process.env.SNS_CONTRACT_TOPIC,
	},
	cognito: {
		region: process.env.AWS_REGION || process.env.AWS_LOCAL_REGION,
		cognitoUserPoolId: process.env.AWS_USER_POOL_ID,
		tokenUse: process.env.AWS_COGNITO_TOKEN_USE,
		tokenExpiration: 3600000,
	},
	cognitoPool: {
		UserPoolId: process.env.AWS_USER_POOL_ID || '',
		ClientId: process.env.AWS_COGNITO_CLIENTID || '',
	},
	mongo: {
		connection: process.env.NODE_ENV === 'test' ? process.env.MONGO_CONNECTION_TEST || '' : process.env.MONGO_CONNECTION || '',
	},
	mysql: {
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.NODE_ENV === 'test' ? process.env.DB_DATABASE_TEST : process.env.DB_DATABASE,
	},
	logger: {
		json: process.env.LOGGER_JSON == 'true',
		stringify: process.env.LOGGER_STRINGIFY == 'true',
		colorize: process.env.LOGGER_COLORIZE == 'true' || true,
		prettyPrint: process.env.LOGGER_PRETTIFY == 'true' || true,
		humanReadableUnhandledException: process.env.LOGGER_READABLE_EXCEPTION == 'true',
		timestamp: process.env.LOGGER_TIMESTAMP == 'true' || true,
		level: parseInt(process.env.LOGGER_LEVEL || '1'),
		httpMeta: process.env.LOGGER_HTTP_META == 'true',
	},
	mail: {
		host: 'smtp.gmail.com',
		port: 587, // Change to 465 for https
		username: process.env.MAIL_USERNAME || '',
		password: process.env.MAIL_PASSWORD || '',
	},
	isCSRFProtected: process.env.IS_CSRF_PROTECTED == 'true',
}
