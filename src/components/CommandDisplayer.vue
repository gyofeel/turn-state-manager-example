<template>
<div class="command-wrap">
	<div class="event-display">
		<span class="title">Event</span>
		<span class="event-name" ref="eventName"><span ref="eventComplete">{{`'complete & '`}}</span>{{emittedEvent}}</span>
	</div>
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
</div>
</template>

<script>
import gsap from 'gsap';
import EventBus from '../utils/EventBus';

export default {
	name: 'CommandDisplayer',
	data() {
		return {
			commandList: [],
			emittedEvent: "'start'",
			animation: null,
			ref: null
		}
	},
	created() {
		EventBus.$on('event', this.onEvent);
		EventBus.$on('command', this.onCommand);
	},
	beforeDestroy() {
		EventBus.$off('event', this.onEvent);
		EventBus.$off('command', this.onCommand);
	},
	mounted() {
		this.ref = this.$refs.commandDisplayer;
	},
	methods: {
		onEvent(e) {
			const { type } = e;
			if (type === 'complete') {
				const { eventComplete } = this.$refs;
				const yellow = '#ffee38';
				const animationComplete = gsap.to(eventComplete, {
					color: yellow,
					scale: '1.1',
					duration: 0.3,
					ease: '"elastic.out(2.5, 0.5)"',
					opacity: 1,
					display: 'inline',
					onComplete: () => {
						animationComplete.reverse();
					}
				})
			}
			this.$nextTick(() => {
				this.emittedEvent = `'${type}'`;
				const { eventName } = this.$refs;
				const white = '#f5f5f5';
				const yellow = '#ffee38';
				if (this.animation) {
					this.animation.kill();
					this.animation = gsap.set(eventName, {
						color: white,
						scale: '1'
					});
				}
				this.animation = gsap.to(eventName, {
					color: yellow,
					scale: '1.1',
					duration: 0.3,
					ease: '"elastic.out(2.5, 0.5)"',
					onComplete: () => {
						this.animation.reverse();
					}
				})
			});
		},
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
.command-wrap {
	display: flex;
	flex-flow: column nowrap;
	align-items: center;
	font-size: 16px;
}
.event-display {
	width: 100%;
	display: flex;
	flex-flow: column nowrap;
	// justify-content: flex-end;
	// align-items: baseline;
	.title {
		font-style: italic;
		color: $red-orange;
		font-size: $font-m;
	}
	.event-name {
		white-space: nowrap;
		font-size: $font-xxxl;
		font-weight: bold;
		span {
			display: none;
			opacity: 0;
		}
	}
}
.command-displayer {
	width: 100%;
	height: 320px;
	margin-top: 10px;
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
	.command-wrap {
		font-size: 12px;
	}
	.command-displayer {
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