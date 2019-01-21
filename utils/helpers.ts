import nodemailer from 'nodemailer'
import {
	config,
	logger
} from '..'

export const sendMail = async (to: string, subject: string, html: string) => {
	const transporter = await getMailTransporter()
	const options = {
		from: '"MOZOK 🧠" <moz@mozok.de>',
		to: to,
		subject: subject,
		html: html
	}

	transporter.sendMail(options, (error, info) => {
		if (error) {
			return logger.error(error)
		}

		logger.log(`Message sent: ${info.messageId}`)
		logger.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`)
	})
}

export const getMailTransporter = async () => {
	const account: any = await getTestAccount()

	return nodemailer.createTransport({
		host: 'smtp.ethereal.email' || config.mail.host,
		port: config.mail.port,
		secure: config.mail.port === 465, // true for 465, false for other ports
		auth: {
			user: account.user || config.mail.username,
			pass: account.pass || config.mail.password
		}
	})
}

const getTestAccount = () => {
	return new Promise((resolve, reject) => {
		nodemailer.createTestAccount((err, account) => {
			if (err) return reject(err)
			return resolve(account)
		})
	})
}

export const getRandomString = (length: number) => {
	return Math.random().toString(36).substring(length + 1)
}

export let createFilename: Function = (type: string): string => {
	const extensions = {
		'image/png': 'png',
		'image/jpeg': 'jpg',
		'image/gif': 'gif'
	}

    return `${getRandomString(33)}-${Date.now()}.${extensions[type]}`
}
