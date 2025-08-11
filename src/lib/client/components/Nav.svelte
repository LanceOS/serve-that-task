<script lang="ts">
</script>

<div class="drawer">
	<input id="my-drawer" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content w-fit justify-self-end p-4">
		<label for="my-drawer" class="btn btn-primary drawer-button"></label>
	</div>
	<aside class="drawer-side">
		<label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
		<ul
			class="menu bg-base-200 text-base-content flex min-h-full w-80 flex-col justify-between p-4"
		>
			<div>
				<li><a href="/">Home</a></li>
				<li><a href="/">Sidebar Item 2</a></li>
			</div>
			<div>
				<li>
					<a href="/">Profile</a>
					<div class="avatar">
						<div class="w-24 rounded-full">
							<img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
						</div>
					</div>
				</li>
			</div>
		</ul>
	</aside>
</div>
