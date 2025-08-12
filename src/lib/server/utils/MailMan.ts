import { Resend } from 'resend';
import type { ResendClient } from '../Providers/Resend';

interface MailerOptions {
	from?: string;
	email: string[];
	type?: string;
	otp?: string;
	html?: string;
	subject?: string;
}

interface IMailer {
    send: (options: MailerOptions) => Promise<any>;
}

// Additional mailer types would be added here
type CommProviders = ResendClient;

const sendMail = async (mailer: IMailer, options: MailerOptions) => {
        try {
        return await mailer.send(options);
    } catch (error) {
        console.error(error);
        throw new Error('Error sending out email', { cause: error });
    }
}

export const MailerFactory = {
	createMail: async (provider: CommProviders): IMailer => {
		try {
            switch(provider) {
                case Resend:
                    sendMail
            }
		} catch (error: unknown) {
			console.error(error);
			throw new Error(`Error sending out email`, { cause: error });
		}
	},

    
};
