import { App, StorageOptions, config } from '../exports'
import { Connection } from 'mysql'
import { Connection as MongooseConnection } from 'mongoose'

abstract class Database {
	public connection: Connection | MongooseConnection

	public abstract _connect()
	public abstract _close()
}

class Mongo extends Database {
	static async init() {
		const mongo = new Mongo()

		await mongo._connect()

		return mongo
	}

	async _connect() {
		const mongoose = (await import('mongoose')).default

		mongoose.set('useCreateIndex', true)

		await mongoose.connect(config.mongo.connection || '', { useNewUrlParser: true })

		this.connection = mongoose.connection
	}

	_close() {
		this.connection.close()
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

	_close() {
		this.connection.end()
	}
}

export class Storage {
	database?: Database
	type?: string

	static async init(app: App, options: StorageOptions) {
		const storage = new Storage()

		storage.type = options.type

		switch (storage.type) {
			case 'mongo':
				storage.database = await Mongo.init()
				break
			case 'mysql':
				storage.database = await MySQL.init()
				break
			default:
				throw new Error('Invalid Database Type')
		}

		app.storage = storage

		return storage
	}

	public close(): void {
		if (!this.database) {
			throw new Error('Can not close undefined database')
		}

		this.database._close()
	}
}
