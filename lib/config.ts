import { IConfig } from '.';

export const config: IConfig = {
	name: process.env.APP_NAME || 'app',
    port: process.env.PORT || 3000,
	stage: process.env.STAGE || 'local',
	runtype: process.env.RUNTYPE || 'express',
    aws: {
        region: process.env.AWS_REGION || process.env.AWS_LOCAL_REGION,
        apiVersion: process.env.AWS_API_VERSION || '',
        params: {
            Bucket: process.env.AWS_S3_BUCKET_NAME
        },
        topic: process.env.SNS_CONTRACT_TOPIC
    },
    cognito: {
        region: process.env.AWS_REGION || process.env.AWS_LOCAL_REGION,
        cognitoUserPoolId: process.env.AWS_USER_POOL_ID,
        tokenUse: process.env.AWS_COGNITO_TOKEN_USE,
        tokenExpiration: 3600000
    },
    cognitoPool: {
        UserPoolId: process.env.AWS_USER_POOL_ID || '',
        ClientId: process.env.AWS_COGNITO_CLIENTID || ''
    },
    mysql: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
	},
	logger: {
		json: process.env.LOGGER_JSON == 'true' || false,
		stringify: process.env.LOGGER_STRINGIFY == 'true' || false,
		colorize: process.env.LOGGER_COLORIZE == 'true' || true,
		prettyPrint: process.env.LOGGER_PRETTIFY == 'true' || true,
		humanReadableUnhandledException: process.env.LOGGER_READABLE_EXCEPTION == 'true' || false,
		timestamp: process.env.LOGGER_TIMESTAMP == 'true' || true,
		level: parseInt(process.env.LOGGER_LEVEL || '1')
	}
}
