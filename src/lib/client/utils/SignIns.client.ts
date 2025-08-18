import { goto } from '$app/navigation';
import { authClient } from '$lib/auth-client';
import { Toaster } from '../components/toaster/Toaster';

export const SignIns = {
	sendOTP: async (email: string) => {
		if (!email || !email.includes('@')) {
			Toaster.ejectToast({
				message: 'Your email must be valid!',
				type: 'error'
			});
			return false;
		}

		try {
			const { data, error } = await authClient.emailOtp.sendVerificationOtp({
				email,
				type: 'sign-in'
			});

			if (error) {
				console.error(error);
				return error;
			}

			Toaster.ejectToast({
				message: 'Email Sent',
				type: 'info'
			});
		} catch (error) {
			Toaster.ejectToast({
				message: `${error}`,
				type: 'error'
			});
		}
	},

	confirmOTP: async (email: string, otp: string) => {
		if (!otp || otp.length !== 6) {
			Toaster.ejectToast({
				message: 'Incorrect Code',
				type: 'error'
			});
			return;
		}

		try {
			const { data, error } = await authClient.signIn.emailOtp({
				email,
				otp
			});

			if(error) {
				throw new Error();
			}

			goto(`/profile/${data.user.id}`)
		} catch (error: unknown) {
			console.error(error)
			Toaster.ejectToast({
				message: 'Failed to log in',
				type: 'error'
			});
			return;
		}
	}
};
