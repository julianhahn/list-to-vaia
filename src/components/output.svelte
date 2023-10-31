<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { modes, type mode_type } from '$lib';
	import { browser } from '$app/environment';

	export let questions: string[] = [];
	export let answers: string[] = [];
	let wordSeparator = ';';
	let cardSeparator = '\n';
	let output = '';
	console.log('component root', wordSeparator, cardSeparator, output);

	let readFromStorage = false;

	export let setMode: (newMode: mode_type) => void;

	onMount(() => {
		if (browser) {
			const outputStored = localStorage.getItem('outputStored');
			if (outputStored === null) {
				return;
			}
			const {
				output: storedOutput,
				wordSeparator: storedWordSeparator,
				cardSeparator: storedCardSeparator
			} = JSON.parse(outputStored);
			output = storedOutput;
			wordSeparator = storedWordSeparator;
			cardSeparator = storedCardSeparator;
			readFromStorage = true;
			console.log('read from output storage', outputStored);
		}
	});

	interface card {
		question: string;
		answer: string;
	}

	function assembleOutput() {
		if (questions.length !== answers.length) {
			console.warn('question and answer length mismatch', questions.length, answers.length);
			return;
		}
		let cards: card[] = [];
		for (let i = 0; i < questions.length; i++) {
			cards.push({ question: questions[i], answer: answers[i] });
		}
		for (const card of cards) {
			output += `${card.question}${wordSeparator}${card.answer}${cardSeparator}`;
		}
		console.log('end of assemble method', output);
	}

	$: {
		if (browser && readFromStorage) {
			let outputStored = { output, wordSeparator, cardSeparator };
			localStorage.setItem('outputStored', JSON.stringify(outputStored));
			assembleOutput();
		}
	}
</script>

<div class="content">
	<div class="title">list to vaia</div>
	<div class="input-wrapper">
		<textarea bind:value={output} class="input-text" />
		<div class="controlGroup">
			<div class="word-seperator-input">
				<div class="input-label">word separator</div>
				<input
					type="text"
					bind:value={wordSeparator}
					placeholder={wordSeparator === ' ' ? 'space' : wordSeparator}
				/>
			</div>
			<div class="card-seperator-input">
				<div class="input-label">card separator</div>
				<input
					type="text"
					bind:value={cardSeparator}
					placeholder={cardSeparator === '\n' ? 'new line' : cardSeparator}
				/>
			</div>
		</div>
		<div class="nextButton">
			<button
				on:click={() => {
					setMode(modes.INPUT);
				}}>to input</button
			>
		</div>
	</div>
</div>

<style lang="scss">
	:global(html, body) {
		margin: 0;
		padding: 0;
	}

	.content {
		height: 100vh;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;

		.title {
			font-size: 2rem;
			font-weight: bold;
			margin-bottom: 1rem;
			margin-top: 1rem;
			margin-left: auto;
			margin-right: auto;
			margin-bottom: 1rem;
		}

		.input-wrapper {
			width: 90%;
			flex-grow: 1;
			display: flex;
			flex-direction: column;

			.input-text {
				border: solid 1px black;
				padding: 0px;
				width: 100%;
				height: 60%;
				resize: none;
			}

			.controlGroup {
				margin-top: 1rem;
				display: flex;
				width: 100%;
				justify-content: space-between;
				padding-left: 4px;
				padding-right: 4px;
			}
			.nextButton {
				margin-top: 2rem;
				display: flex;
				width: 100%;
				justify-content: center;
				padding-left: 4px;
				padding-right: 4px;

				button {
					background: none;
					border: solid 1px black;
					border-radius: 10px;
					background-color: black;
					color: white;
					font-size: 1.5rem;
				}
			}
		}
	}
</style>
