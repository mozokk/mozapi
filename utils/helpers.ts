import nodemailer from 'nodemailer'
import {
	config,
	logger
} from '..'
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';

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
		'image/gif': 'gif',
		'application/octet-stream': 'db3'
	}

    return `${getRandomString(1)}-${Date.now()}.${extensions[type]}`
}

export const comparePassword = (password, hash) =>
  new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, isMatch) => {
      if (err) {
        return reject(err);
      }
      return resolve(isMatch);
    });
  });

export const getAll = async (db, sql) => await new Promise((resolve, reject) => {
	db.all(sql, (err, rows) => {
		if (err) {
			return reject(err)
		}
		return resolve(rows)
	})
})

export const runSqlOnDb = (db, sql, params) =>
	new Promise((resolve, reject) => {
		db.run(sql, params, function (err, data) {
			if (err) {
				return reject(err)
			}
			return resolve(data)
		})
	})

export const fileExist = (filename) => {
	if(!fs.existsSync(path.join(__dirname,'..', '..', '..', 'storage', `${filename}`))) {
		return false
	}
	return true
}

export const getFromDb = (db, sql, params) =>
	new Promise((resolve, reject) => {
		db.get(sql, params, (err, row) => {
			if (err) {
				return reject(err)
			}
			return resolve(row)
		})
	})



export const hashPassword = password =>
  new Promise((resolve, reject) => {
    bcrypt.genSalt(12, (err, salt) => {
      if (err) {
        return reject(err);
      }
      return bcrypt.hash(password, salt, (error, hash) => {
        if (error) {
          return reject(error);
        }
        return resolve(hash);
      });
    });
  });

export const capitalize = (s) => {
	if (typeof s !== 'string') return ''
	return s.charAt(0).toUpperCase() + s.slice(1)
}

export const copyFile = (source, destination) =>
	new Promise((resolve, reject) => {
		fs.copyFile(source, destination, (err) => {
			if (err) {
				return reject(err)
			}

			return resolve()
		});
	})
