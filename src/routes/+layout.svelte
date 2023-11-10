<script>
	import '../app.postcss';
	import {AppBar, LightSwitch} from '@skeletonlabs/skeleton'
	import { dev } from '$app/environment';
	import { inject } from  '@vercel/analytics'

	inject({ mode:dev? 'development': 'production'});
</script>

<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
	<svelte:fragment slot="lead">
		<img class="h-14 invert dark:invert-0" src="/img/maskable_icon_bgremoved.png" alt="">
	</svelte:fragment>
	<h1 class="sm:text-3xl text-md uppercase ">Free Games</h1>
	<svelte:fragment slot="trail">
		<LightSwitch></LightSwitch>
	</svelte:fragment>
</AppBar>

<slot />
