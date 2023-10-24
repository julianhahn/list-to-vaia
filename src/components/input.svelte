<script lang="ts">
	import { modes, type mode_type } from '$lib';
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	export let questions: string[] = [];
	export let answers: string[] = [];

	export let setMode: (newMode: mode_type) => void;
	let wordSeparator = ' ';
	let cardSeparator = '\n';
	let wordList = '';
	console.log('run after asign');
	let readFromStorage = false;

	onMount(() => {
		if (browser) {
			console.log(localStorage.length);

			const localStorageWordSeparator = localStorage.getItem('wordSeparator');
			const localStorageCardSeparator = localStorage.getItem('cardSeparator');
			const localStorageWordList = localStorage.getItem('wordList');
			console.log('run on mount');
			console.log('wordlist from local storage' + localStorageWordList);

			if (localStorageWordSeparator) {
				wordSeparator = localStorageWordSeparator;
			}

			if (localStorageCardSeparator) {
				cardSeparator = localStorageCardSeparator;
			}

			if (localStorageWordList) {
				wordList = localStorageWordList;
			}
			parseWordList();
			readFromStorage = true;
		}
	});

	onDestroy(() => {
		if (browser) {
			console.log('saving to local storage');
			localStorage.setItem('wordSeparator', wordSeparator);
			localStorage.setItem('cardSeparator', cardSeparator);
			localStorage.setItem('wordList', wordList);
		}
	});

	function parseWordList() {
		let cards = wordList.split(cardSeparator);
		for (const card of cards) {
			let [question, answer] = card.split(wordSeparator);
			questions.push(question);
			answers.push(answer);
		}
		if (questions.length > 10) {
			questions = questions.slice(0, 10);
			answers = answers.slice(0, 10);
		}
	}

	$: {
		if (browser && readFromStorage) {
			console.log('on change set local storage');
			localStorage.setItem('wordSeparator', wordSeparator);
			localStorage.setItem('cardSeparator', cardSeparator);
			localStorage.setItem('wordList', wordList);
			parseWordList();
		}
	}
</script>

<div class="content">
	<div class="title">list to vaia</div>
	<div class="input-wrapper">
		<textarea bind:value={wordList} class="input-text" />
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
					setMode(modes.OUTPUT);
				}}>to output</button
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
