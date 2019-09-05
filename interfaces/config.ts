export interface IConfig {
	name: string
	version: string
    port: string | number
	stage: string
	runtype: string
    aws: IAWSConfig
    cognito: ICognitoConfig
	cognitoPool: ICognitoUserPoolConfig
	mongo: IMongoConfig
	mysql: IMySQLConfig
	logger: ILoggerConfig
	mail: IMailConfig
	isCSRFProtected: boolean
}

export interface IPaymentConfig {
    braintree: IBrainTreeConfig
}

export interface IAWSConfig {
    region: string | undefined
    apiVersion: string
    params: any
    topic: string | undefined
}

export interface ICognitoConfig {
    region: string | undefined
    cognitoUserPoolId: string | undefined
    tokenUse: string | undefined
    tokenExpiration: number
}

export interface ICognitoUserPoolConfig {
    UserPoolId: string
    ClientId: string
}

export interface IMongoConfig {
	connection: string | undefined
}

export interface IMySQLConfig {
    host: string | undefined
    user: string | undefined
    password: string | undefined
    database: string | undefined
}

export interface IBrainTreeConfig {
    environment: string | undefined
    merchantId: string | undefined
    planId: string | undefined
    publicKey: string | undefined
    privateKey: string | undefined
}

export interface ILoggerConfig {
	json: boolean | undefined,
	stringify: boolean | undefined,
	colorize: boolean | undefined,
	prettyPrint: boolean | undefined,
	humanReadableUnhandledException: boolean | undefined,
	timestamp: boolean | undefined
	level: number | undefined
}

export interface IMailConfig {
	host: string
	port: number
	username: string
	password: string
}
