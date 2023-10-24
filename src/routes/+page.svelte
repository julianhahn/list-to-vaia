<script lang="ts">
	import { modes } from '$lib';
	import type { mode_type } from '$lib';
	import type { SvelteComponent } from 'svelte';

	import Input from '../components/input.svelte';
	import Output from '../components/output.svelte';

	let questions: string[] = [];
	let answers: string[] = [];

	let mode: mode_type = modes.INPUT;

	function setMode(newMode: mode_type) {
		console.log('set mode', newMode);
		mode = newMode;
	}
</script>

<slot>
	{#if mode === modes.INPUT}
		<Input bind:questions bind:answers {setMode} />
	{:else if mode === modes.OUTPUT}
		<Output {questions} {answers} {setMode} />
	{/if}
</slot>
