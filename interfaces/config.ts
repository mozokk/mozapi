export interface Config {
	name: string
	version: string
	port: string | number
	stage: string
	runtype: string
	domainPath: string
	aws: AWSConfig
	cognito: CognitoConfig
	cognitoPool: CognitoUserPoolConfig
	mongo: MongoConfig
	mysql: MySQLConfig
	logger: LoggerConfig
	mail: MailConfig
	isCSRFProtected: boolean
}

export interface PaymentConfig {
	braintree: BrainTreeConfig
}

export interface AWSBucketConfig {
	Bucket: string
}

export interface AWSConfig {
	region: string | undefined
	apiVersion: string
	params: AWSBucketConfig
	topic: string | undefined
}

export interface CognitoConfig {
	region: string | undefined
	cognitoUserPoolId: string | undefined
	tokenUse: string | undefined
	tokenExpiration: number
}

export interface CognitoUserPoolConfig {
	UserPoolId: string
	ClientId: string
}

export interface MongoConfig {
	connection: string | undefined
}

export interface MySQLConfig {
	host: string | undefined
	user: string | undefined
	password: string | undefined
	database: string | undefined
}

export interface BrainTreeConfig {
	environment: string | undefined
	merchantId: string | undefined
	planId: string | undefined
	publicKey: string | undefined
	privateKey: string | undefined
}

export interface LoggerConfig {
	json: boolean | undefined
	stringify: boolean | undefined
	colorize: boolean | undefined
	prettyPrint: boolean | undefined
	humanReadableUnhandledException: boolean | undefined
	timestamp: boolean | undefined
	level: number | undefined
	httpMeta: boolean | undefined
}

export interface MailConfig {
	host: string
	port: number
	username: string
	password: string
}
