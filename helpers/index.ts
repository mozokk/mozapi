import nodemailer from 'nodemailer'
import bcrypt from 'bcryptjs'
import fs from 'fs'
import path from 'path'
import uuidV4 from 'uuid/v4'

import { config, extensions } from '..'
import { EARTH_RADIUS } from '../constants/location'

interface MailOption {
	from: string
	to: string
	subject: string
	html: string
}

const getTestAccount = () => {
	return new Promise((resolve, reject) => {
		nodemailer.createTestAccount((err, account) => {
			if (err) return reject(err)
			return resolve(account)
		})
	})
}

export const getMailTransporter = async () => {
	const account: any = await getTestAccount()

	return nodemailer.createTransport({
		host: 'smtp.ethereal.email' || config.mail.host,
		port: config.mail.port,
		secure: config.mail.port === 465,
		auth: {
			user: account.user || config.mail.username,
			pass: account.pass || config.mail.password,
		},
	})
}

export const sendMail = async (options: MailOption, transporter?: any) => {
	if (!transporter) {
		transporter = await getMailTransporter()
	}

	await new Promise((resolve, reject) => {
		transporter.sendMail(options, (error, info) => {
			if (error) {
				return reject(error)
			}

			return resolve(`Message sent: ${info.messageId}`)
		})
	})
}

export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

export const getRandomString = (length: number) =>
	Math.random()
		.toString(36)
		.substring(length + 1)

export const createFilename: Function = (type: string): string => {
	return `${uuidV4()}.${extensions[type]}`
}

export const hashPassword = password =>
	new Promise((resolve, reject) => {
		bcrypt.genSalt(12, (err, salt) => {
			if (err) {
				return reject(err)
			}

			return bcrypt.hash(password, salt, (error, hash) => {
				if (error) {
					return reject(error)
				}
				return resolve(hash)
			})
		})
	})

export const comparePassword = (password, hash) =>
	new Promise((resolve, reject) => {
		bcrypt.compare(password, hash, (err, isMatch) => {
			if (err) {
				return reject(err)
			}
			return resolve(isMatch)
		})
	})

const deg2rad = deg => deg * (Math.PI / 180)

export const getDistanceInKm = (lat1, lon1, lat2, lon2) => {
	const dLat = deg2rad(lat2 - lat1)
	const dLon = deg2rad(lon2 - lon1)
	const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)

	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

	return EARTH_RADIUS * c
}

export const getAll = async (db, sql) =>
	await new Promise((resolve, reject) => {
		db.all(sql, (err, rows) => {
			if (err) {
				return reject(err)
			}
			return resolve(rows)
		})
	})

export const runSqlOnDb = (db, sql, params) =>
	new Promise((resolve, reject) => {
		db.run(sql, params, function(err, data) {
			if (err) {
				return reject(err)
			}
			return resolve(data)
		})
	})

export const fileExist = filename => fs.existsSync(path.join(__dirname, '..', '..', '..', 'storage', `${filename}`))

export const getFromDb = (db, sql, params) =>
	new Promise((resolve, reject) => {
		db.get(sql, params, (err, row) => {
			if (err) {
				return reject(err)
			}
			return resolve(row)
		})
	})

export const copyFile = (source, destination) =>
	new Promise((resolve, reject) => {
		fs.copyFile(source, destination, err => {
			if (err) {
				return reject(err)
			}
			return resolve()
		})
	})

export const cleanModel = doc => {
	if (doc) {
		delete doc._id
		delete doc.__v
	}
}
