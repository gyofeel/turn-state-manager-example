<template>
  <div class="command-displayer"></div>
</template>

<script>
import EventBus from '../utils/EventBus';

export default {
	name: 'CommandDisplayer',
	created() {
		EventBus;
	}
}
</script>

<style lang="scss" scoped>

</style>