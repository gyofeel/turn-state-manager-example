<template>
  <div
    class="timer"
    :class="{
      '--small': type === TYPE.SMALL,
    }"
  >
    <span class="time">{{ (value / 1000).toFixed(1) }} <span class="unit">sec</span></span>
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
<style lang="scss" scoped>
@import 'src/style/main';

.timer {
  font-weight: bold;
  font-size: 16px;
  .time {
    font-size: $font-xxl;
    text-align: right;
  }
  .unit {
    font-size: $font-xs;
    font-weight: normal;
  }
  &.--small {
    .time {
      font-size: $font-s;
    }
    .unit {
      font-size: $font-xs;
    }
  }
}

@media screen and (max-width: 890px) {
  .timer {
    font-size: 10px;
    .time {
      font-size: $font-xxxl;
    }
    .--small {
      .time {
        font-size: $font-xs;
      }
    }
  }
}
</style>