<template>
  <div 
		class="arrows-line"
		:class="{
			'--prev': direction === 'prev'
		}"
  >
		<font-awesome-icon
			class="icon"
			:icon="['fas', 'long-arrow-alt-right']"
			size="4x"
			ref="fontAwesomeIcon"
		/>
	</div>
</template>

<script>
export default {
	name: 'arrowsLine',
	props: {
		direction: {
			type: String,
			validator: (dir) => ['prev', 'next'].findIndex(el => el === dir) > -1
		}
	}
}
</script>

<style lang="scss" scoped>
@import 'src/style/main';

.arrows-line {
	font-size: 16px;
	width: fit-content;
	display: flex;
	justify-content: flex-end;
	transform-origin: left;
	animation: 2s infinite direction;
	&.--prev {
		transform-origin: right;
		.icon {
			transform: rotate(-180deg);
		}
	}

	.icon {
		transition: 1s;
		color: $red-orange;
		// animation: 3s linear infinite emphasis;
	}
}
@media screen and (max-width: 890px) {
	.arrows-line {
		font-size: 12px;
	}
}

@keyframes direction {
	0% {
		transform: scale(1.5, 1);
	}
	50% {
		transform: scale(1, 1);
	}
	100% {
		transform: scale(1.5, 1);
	}
}

// @keyframes emphasis {
// 	0% { 
// 		color: $red-orange;
// 	}
// 	50% {
// 		color: $white;
// 	}
// 	100% {
// 		color: $red-orange;
// 	}
// }
</style>