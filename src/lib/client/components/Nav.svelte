<script lang="ts">
</script>

<div class="drawer">
	<input id="my-drawer" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content absolute top-4 right-4 w-fit">
		<label for="my-drawer" class="btn btn-content btn-outline drawer-button">Menu</label>
	</div>
	<aside class="drawer-side">
		<label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
		<ul class="menu bg-base-100 text-content flex min-h-full w-80 flex-col justify-between p-4">
			<div>
				<li><a href="/">Home</a></li>
				<li><a href="/">Pricing</a></li>
				<li><a href="/">My Organization</a></li>
				<li><a href="/">Task Manager</a></li>
			</div>
			<div class="space-y-2">
				<label class="flex cursor-pointer justify-between">
					<span class="label-text">Light Mode</span>
					<input type="checkbox" value="dim" class="toggle theme-controller" />
					<span class="label-text">Dark Mode</span>
				</label>

				<li>
					<a href="/auth/login" class="btn btn-content" aria-label="Login">Login</a>
				</li>
				<li>
					<a href="/" class="flex items-center justify-between">
						Profile
						<div class="avatar">
							<div class="w-8 rounded-full">
								<img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
							</div>
						</div>
					</a>
				</li>
			</div>
		</ul>
	</aside>
</div>
