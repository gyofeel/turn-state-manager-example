<template>
  <div 
		class="command-displayer"
		ref="commandDisplayer"
	>
				<div 
					v-for ="(el, index) in commandList"
					:key="index"
					class="command-item"
					:class="{
						'--last': index === commandList.length - 1
					}"
				>
					<div class="title">{{el.title}}</div>
					<div class="command" v-html="el.command"></div>
			</div>
  </div>
</template>

<script>
import EventBus from '../utils/EventBus';

export default {
	name: 'CommandDisplayer',
	data() {
		return {
			commandList: [],
			ref: null
		}
	},
	created() {
		EventBus.$on('command', this.onCommand);
	},
	mounted() {
		this.ref = this.$refs.commandDisplayer;
	},
	watch: {
		commandList: {
			deep: true,
			handler: (list) => {
				if (list.length > 15) {
					list.shift();
				}
			}
		}
	},
	methods: {
		onCommand(e) {
			const { title, command } = e;

			this.commandList.push({
				title,
				command
			});

			this.$nextTick(() => {
				this.ref.scrollTo({
					top: this.ref.scrollHeight,
					behavior: 'smooth'
				});
			});
		}
	}
}
</script>

<style lang="scss" scoped>
@import 'src/style/main';

.command-displayer {
	font-size: 16px;
	width: 100%;
	min-width: 250px;
	height: 320px;
	padding: 10px 3% 10px;
	background: $white;
	display: flex;
	flex-flow: column nowrap;
	border-radius: 20px;
	overflow: scroll;
	& > :first-child {
		margin-top: auto !important;
	}
	.command-item {
		padding: 15px 5%;
		margin-top: 3%;
		background: $dark-gray;
		// border: 2px solid $dark-gray;
		border-radius: 10px;

		&.--last {
			animation-name: show;
			animation-duration: 0.7s;

			.title {
				color: $dark-gray;
			}
			background: $red-orange;
		}
		.title {
			font-weight: bold;
			font-style: italic;
			color: $red-orange;
		}
		.command {
			margin-top: 7px;
			font-weight: bold;
			font-size: $font-m;
			font-family: 'Courier New', Courier, monospace;
			word-wrap: break-word;
		}
	}
}

@media screen and (max-width: 890px) {
	.command-displayer {
		font-size: 12px;
		height: 250px;
	}
}

@keyframes show {
	0% {
		opacity: 0;
		transform: translateY(30px);
	}
	100% {
		opacity: 1;
		transform: translateY(0);
	}
}
</style>