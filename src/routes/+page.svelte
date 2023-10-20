<script lang="ts">
	import Input from './input.svelte';
	let questions: string[] = [];
	let answers: string[] = [];
	$: {
		console.log('questions in parent', questions);
	}

	const modes = {
		INPUT: 'INPUT',
		OUTPUT: 'OUTPUT'
	} as const;

	let mode = modes.INPUT;
	let currentComponent = Input;
	if (mode === modes.INPUT) {
		currentComponent = Input;
	} else if (mode === modes.OUTPUT) {
		//currentComponent = Output;
		console.log('output');
	}
</script>

<slot>
	<Input bind:questions bind:answers />
</slot>
