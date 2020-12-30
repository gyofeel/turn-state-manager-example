<template>
	<div class="controller">
		<div class="btn-wrap">
			<div class="dir-btn --prev" @click="onClickPrevTurn">
				<span class="text">Prev Turn</span>
			</div>
			<div class="state-wrap">
				<div 
					class="state-btn" 
					:class="{
						'--on': isAuto
					}"
					@click="onToggleAuto"
				>
					<div class="text">Auto</div>
					<div class="ball"></div>
				</div>
				<div 
					class="state-btn" 
					:class="{
						'--on': isLoop
					}"
					@click="onToggleLoop"
				>
					<div class="text">Loop</div>
					<div class="ball"></div>
				</div>
			</div>
			<div class="dir-btn --next" @click="onClickNextTurn">
				<span class="text">Next Turn</span>
			</div> 
		</div>
		<div class="power-btn" @click="onClickBegin">
			<span class="text">{{	isStarted ? 'END': 'START' }}</span>
		</div>
		<!-- <div class="" @click="onClickFinish">Finish the game!</div> -->
	</div>
</template>

<script>
import { CONTROL_TYPE } from '../config/constants';

export default {
	name: 'Controller',
	data() {
		return {
			isAuto: true,
			isLoop: true,
			isStarted: true
		}
	},
	methods: {
		onClickPrevTurn() {
			this.$emit('control', {
				type: CONTROL_TYPE.PREV
			});
		},
		onClickNextTurn() {
			this.$emit('control', {
				type: CONTROL_TYPE.NEXT
			});

		},
		onToggleAuto() {
			this.isAuto = !this.isAuto;
			this.$emit('control', {
				type: CONTROL_TYPE.AUTO,
				value: {
					auto: this.isAuto
				}
			});
		},
		onToggleLoop() {
			this.isLoop = !this.isLoop;
			this.$emit('control', {
				type: CONTROL_TYPE.LOOP,
				value: {
					loop: this.isLoop
				}
			});
		},
		onClickBegin() {
			this.$emit('control', {
				type: this.isStarted ? CONTROL_TYPE.END : CONTROL_TYPE.START
			});
			this.isStarted = !this.isStarted;
		}
	}
}
</script>

<style lang="scss" scoped>
@import 'src/style/main';

.controller {
	font-size: 16px;
	width: 100%;
	min-width: 370px;
	display: flex;
	flex-flow: column nowrap;
	align-items: center;
	padding: 3% 0;
	-webkit-user-select: none;
	user-select: none;
	// border: 3px dotted $yellow;
	// border-radius: 30px;
	color: $dark-gray;

	.btn-wrap {
		width: 100%;
		display: flex;
		justify-content: space-around;
		
		.dir-btn:hover, .state-btn:hover {
			cursor: pointer;
		}

		.dir-btn {
			width: 25%;
			height: 100px;
			background: $white;
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			overflow: hidden;
			
			.text {
				font-size: $font-m;
				font-weight: bold;
				z-index: 10;
			}

			&::before {
				content: '';
				width: 100%;
				height: 100%;
				position: absolute;
				transform: translate(-50%, -50%);
				background: $yellow;
				transition: 0.5s;
			}

			&:hover {
				&.--prev::before {
					left: 60%;
					top: 40%;
				}

				&.--next::before {
					left: 40%;
					top: 40%;
				}
			}

			&:active {
				&.--prev::before {
					// left: 60%;
					// top: 40%;
					background: $red-orange;
				}

				&.--next::before {
					// left: 40%;
					// top: 40%;
					background: $red-orange;
				}
			}

			&.--prev {
				border-radius: 100% 15px 15px 100%;

				&::before {
					border-radius: 100% 15px 15px 100%;
					left: 150%;
					top: -50%;
				}
			}

			&.--next {
				border-radius: 15px 100% 100% 15px;

				&::before {
					border-radius: 15px 100% 100% 15px;
					left: -50%;
					top: -50%;
				}
			}
		}

		.state-wrap {
			display: flex;
			flex-flow: column nowrap;
			justify-content: space-around;
			align-items: center;
			width: 25%;
			
			.state-btn {
				width: 100%;
				height: 35px;
				background: $white;
				position: relative;
				// display: flex;
				// justify-content: center;
				// align-items: center;
				border-radius: 17px;
				transition: 0.3s;
				&:hover {
					.ball {
						&::after {
							top: 25%;
						}
					}
				}

				.ball {
					width: 30px;
					height: 30px;
					background: $dark-gray;
					border-radius: 50%;
					position: absolute;
					transform: translate(-50%, -50%);
					left: 20px;
					top: 50%;
					transition: 0.5s;
					overflow: hidden;
				
					&::after {
						content: '';
						width: 32px;
						height: 32px;
						position: absolute;
						transform: translate(-50%, -50%);
						left: 50%;
						top: -55%;
						// border: 7px solid $yellow;
						// box-sizing: border-box;
						background: $yellow;
						border-radius: 50%;
						transition: 0.3s;
					}
				}

				.text {
					font-size: $font-s;
					font-weight: bold;
					position: absolute;
					transform: translate(-50%, -50%);
					left: calc(100% - 30px);
					top: 50%;
					transition: 0.3s;
				}

				&.--on {
					background: $red-orange;
					.ball {
						left: calc(100% - 20px);
					}

					.text {
						left: 30px;
					}
				}
			}
		}
	}

	.power-btn {
		width: 100%;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 7%;
		background: $white;
		height: 80px;
		border-radius: 25px;
		overflow: hidden;
		
		.text {
			font-size: $font-xxl;
			font-weight: bold;
			z-index: 10;
		}

		&:hover {
			cursor: pointer;

			&::before {
				top: 13%;
			}
		}

		&:active {
			&::before {
				background: $red-orange;
			}
		}
		
		&::before {
			content: '';
			width: 100%;
			height: 100%;
			position: absolute;
			transform: translate(-50%, 0);
			left: 50%;
			top: 100%;
			background: $yellow;
			border-radius: 25px;
			transition: 0.5s;
		}
	}
}

@media screen and (max-width: 890px) {
	.controller {
		font-size: 12px;
		.power-btn {
			margin-top: 5%;
			width: 90%;
			height: 65px;
		}
	}
}
</style>