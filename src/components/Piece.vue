<template>
<div class="piece-wrap">
  <div
    class="piece"
    :class="{
      '--turned': isTurn,
    }"
    :style="{
      width: `${this.size}px`,
      height: `${this.size}px`,
      borderRadius: `${this.size / 2}px`,
      background: this.background,
    }"
  >
    <span class="name">{{ name }}</span>
    <TimeDisplayer
      class="time-displayer"
      v-if="time > 0"
      :timeValue="time"
      :type="'small'" 
    />
  </div>
  <div 
    v-if="isTurn"
    class="turn-ring"
  ></div>
</div>
</template>

<script>
import TimeDisplayer from "./TimeDisplayer";

export default {
  name: "Piece",
  components: {
    TimeDisplayer,
  },
  props: {
    name: String,
    time: [Number || String],
    isTurn: Boolean,
  },
  data() {
    return {
      color: null,
      size: 0,
    };
  },
  created() {
    this.setColor();
    window.addEventListener("resize", () => {
      this.setSize();
    });
    this.setSize();
  },
  methods: {
    setColor() {
      const asciiChar = this.name.charCodeAt([0]);
      const r = (asciiChar * (Math.random() * 255 + 1)) % 255;
      const g = (asciiChar * (Math.random() * 255 + 1)) % 255;
      const b = (asciiChar * (Math.random() * 255 + 1)) % 255;
      this.background = `rgb(${r}, ${g}, ${b})`;
    },
    setSize() {
      const innerWindowSize = Math.min(window.innerWidth, window.innerHeight);
      const size = innerWindowSize / 8;

      this.size = size;
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'src/style/main';
.piece-wrap {
  position: relative;
}
.piece {
  min-width: 30px;
  min-height: 30px;
  font-weight: bold;
  position: relative;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  // outline: 3px solid $primary-color;
  // background: transparent;
  transition: 0.3s;
  overflow: hidden;
  &:hover {
    cursor: pointer;
  }

  &::before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 40%;
    background: white;
    border-radius: 50%;
  }
}
.name {
  font-size: 1.3em;
  color: $dark-gray;
  z-index: 10;
}
.time-displayer {
  color: $dark-gray;
  z-index: 10;
}
.piece.--turned {
  transform: scale(1.3);
}

.turn-ring {
  width: 140%;
  height: 140%;
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  border: 3px dotted $primary-color;
  border-radius: 50%;
}
</style>