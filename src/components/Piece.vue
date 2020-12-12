<template>
  <div
    class="piece"
    :class="{
      '--turned': isTurn,
    }"
    :style="{
      width: `${this.size}px`,
      height: `${this.size}px`,
      borderRadius: `${this.size / 2}px`,
      color: this.color,
    }"
  >
    <span class="name">{{ name }}</span>
    <TimeDisplayer 
      v-if="time > 0"
      :timeValue="time"
      :type="'small'" 
    />
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
      this.color = `rgb(${r}, ${g}, ${b})`;
    },
    setSize() {
      const innerWindowSize = Math.min(window.innerWidth, window.innerHeight);
      const size = innerWindowSize / 8;

      this.size = size;
    },
  },
};
</script>

<style scoped>
.piece {
  min-width: 30px;
  min-height: 30px;
  font-weight: bold;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  border: 2px solid darkslategray;
  background: white;
}
.name {
  font-size: 1.3em;
}
.piece.--turned {
  transform: scale(1.3);
  transition: 0.3s;
}
</style>