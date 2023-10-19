<script>
	let wordList = '';
	let questions = [];
	let answers = [];
	let wordSeparator = ' ';
	let cardSeparator = '\n';
</script>

<div class="content">
	<div class="title">list to vaia</div>
	<div class="input-wrapper">
		<textarea bind:value={wordList} class="input-text" />
		<div class="controlGroup">
			<div class="word-seperator-input">
				<div class="input-label">word separator</div>
				<input type="text" placeholder={wordSeparator === ' ' ? 'space' : wordSeparator} />
			</div>
			<div class="card-seperator-input">
				<div class="input-label">card separator</div>
				<input type="text" placeholder={cardSeparator === '\n' ? 'new line' : cardSeparator} />
			</div>
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
				display: flex;
				width: 100%;
				justify-content: space-between;
				padding-left: 4px;
				padding-right: 4px;
			}
		}
	}
</style>
