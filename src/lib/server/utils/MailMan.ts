import { ResendMailer } from '../Providers/Resend';

interface MailerOptions {
	from?: string;
	to: string[];
	type?: string;
	otp?: string;
	html?: string;
	subject?: string;
}

interface IMailer {
	send: (options: MailerOptions) => Promise<any>;
}

// Additional mailer types would be added here
type CommProviders = 'Resend';

export const MailerFactory = {
	getMailer: (provider: CommProviders): IMailer => {
		try {
			switch (provider) {
				case 'Resend':
					return {
						send: async (options: MailerOptions) => {
							if (!options.to || !options.subject || !options.html) {
								throw new Error('Missing required email fields');
							}
							const { data, error } = await ResendMailer.emails.create({
								from: options.from || 'Acme <onboarding@resend.dev>',
								to: options.to,
								subject: options.subject,
								html: options.html
							});

							if (error) {
								throw new Error(error.message);
							}

							return data;
						}
					};
			}
		} catch (error: unknown) {
			console.error(error);
			throw new Error(`Error sending out email`, { cause: error });
		}
	},

	sendMail: async (mailer: IMailer, options: MailerOptions) => {
		try {
			return await mailer.send(options);
		} catch (error) {
			console.error(error);
			throw new Error('Error sending out email', { cause: error });
		}
	}
};
