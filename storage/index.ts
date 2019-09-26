import {
	IApp,
	IStorageOptions,
	config
} from '../exports'

export class Storage {
	database?: Database

	static async init(app: IApp, options: IStorageOptions) {
		const storage = new Storage()

		switch (options.type) {
			case 'mongo':
				storage.database = await Mongo.init()
				break;
			case 'mysql':
				storage.database = await MySQL.init()
				break;
			default:
				throw new Error('Invalid Database Type')
		}

		app.storage = storage
	}
}

abstract class Database {
	public connection: any

	abstract _connect()
}

class Mongo extends Database {
	static async init() {
		const mongo = new Mongo()

		await mongo._connect()

		return mongo
	}

	async _connect() {
		const mongoose = (await import('mongoose')).default

		mongoose.set('useCreateIndex', true);
		console.log(config.mongo.connection)
		this.connection = await mongoose.connect(config.mongo.connection || '', { useNewUrlParser: true })
	}
}

class MySQL extends Database {
	static async init() {
		const mysql = new MySQL()

		await mysql._connect()

		return mysql
	}

	async _connect() {
		const mysql = await import('mysql')

		this.connection = mysql.createConnection(config.mysql)
	}
}
