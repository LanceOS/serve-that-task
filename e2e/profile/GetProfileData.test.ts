import { expect, test } from '@playwright/test';

test('Profile must exist', async ({ page }) => {
	const userId = 1234;

	await page.route(`/user/profile/${userId}`, async (route) => {
		const userId = route.request().url().split('/').pop();
		const mockProfileData = {
			id: userId,
			name: 'John',
			email: 'test@example.com'
		};

		await route.fulfill({
			status: 200,
			contentType: 'application/json',
			body: JSON.stringify(mockProfileData)
		});
	});

	const [response] = await Promise.all([
		page.waitForResponse('**/user/profile/*'),
		page.goto(`/user/profile/${userId}`)
	]);

	expect(response.status()).toBe(200);

	const profileData = await response.json();

	expect(profileData).toHaveProperty('id');
	expect(profileData).toHaveProperty('name', 'John');
	expect(profileData).toHaveProperty('email', 'test@example.com');

	await page.goto(`/user/profile/${userId}`);
	await expect(page.getByText('test@example.com')).toBeVisible();
});
