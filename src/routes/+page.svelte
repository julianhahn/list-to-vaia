<script lang="ts">
	import { modes } from '$lib';
	import type { mode_type } from '$lib';
	import { browser } from '$app/environment';
	import Input from '../components/input.svelte';
	import Output from '../components/output.svelte';

	interface card {
		question: string;
		answer: string;
	}

	let input = {
		wordList: '',
		wordSeparator: ',',
		cardSeparator: '\n'
	};

	let outputVariables = {
		wordSeparator: ';',
		cardSeparator: '\n'
	};

	let cardList: card[] = [];

	if (browser) {
		const inputStored = localStorage.getItem('inputStored');
		if (inputStored) {
			const { wordList, wordSeparator, cardSeparator } = JSON.parse(inputStored);
			input = { wordList, wordSeparator, cardSeparator };
			parseInputToCards();
		}
		const outputStored = localStorage.getItem('outputStored');
		if (outputStored) {
			const { wordSeparator, cardSeparator } = JSON.parse(outputStored);
			outputVariables = { wordSeparator, cardSeparator };
		}
	}

	let mode: mode_type = modes.INPUT;

	function setMode(newMode: mode_type) {
		mode = newMode;
	}

	function updateInput(wordList: string, wordSeparator: string, cardSeparator: string) {
		if (!browser) return;
		localStorage.setItem('inputStored', JSON.stringify({ wordList, wordSeparator, cardSeparator }));
		input = { wordList, wordSeparator, cardSeparator };

		parseInputToCards();
	}

	function updateOutput(wordSeparator: string, cardSeparator: string) {
		if (!browser) return;
		localStorage.setItem('outputStored', JSON.stringify({ wordSeparator, cardSeparator }));
		outputVariables = { wordSeparator, cardSeparator };
	}

	function parseInputToCards() {
		let splittedCards = [];
		if (input.cardSeparator == '\\n') {
			splittedCards = input.wordList.split(/\r?\n/);
		} else {
			splittedCards = input.wordList.split(input.cardSeparator);
		}
		cardList = splittedCards.map((card) => {
			const splittedCard = card.split(input.wordSeparator);
			return {
				question: splittedCard[0],
				answer: splittedCard[1]
			};
		});
	}
</script>

<slot>
	{#if mode === modes.INPUT}
		<Input {input} {setMode} {updateInput} />
	{:else if mode === modes.OUTPUT}
		<Output {cardList} output={outputVariables} {updateOutput} {setMode} />
	{/if}
</slot>
