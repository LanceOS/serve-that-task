import { writable } from 'svelte/store';

interface IToaster {
	message: string;
	type: 'success' | 'error' | 'info';
}

export const toastStore = writable({
	message: '',
	type: '',
	visible: false
});

export const Toaster = {
	ejectToast: (params: IToaster) => {
		toastStore.set({
			message: params.message,
			type: params.type!,
			visible: true
		});

		setTimeout(() => {
			Toaster.hideToast();
		}, 4000);
	},
	hideToast: () => {
		toastStore.set({
			message: '',
			type: '',
			visible: false
		});
	},
	subscribe: toastStore.subscribe
};
