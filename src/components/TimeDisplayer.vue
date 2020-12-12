<template>
  <div
    class="timer"
    :class="{
      '--small': type === TYPE.SMALL,
    }"
  >
    <span>{{ (value / 1000).toFixed(1) }} sec</span>
  </div>
</template>
<script>
const TYPE = {
  LARGE: "large",
  SMALL: "small",
};

export default {
  name: "TimeDisplayer",
  props: {
    timeValue: [Number || String], // milliseconds
    type: {
      type: String,
      validator: (type) => Object.values(TYPE).includes(type),
    },
  },
  data() {
    return {
      isRunningOut: this.value <= 3,
      TYPE,
    };
  },
  computed: {
    value() {
      const _value = parseInt(this.timeValue, 10);
      if (isNaN(_value)) {
        return 0;
      }
      return _value;
    },
  },
};
</script>
<style scoped>
.timer {
  font-size: 2.5em;
  font-weight: bold;
}
.timer.--small {
  font-size: 1em;
}
</style>