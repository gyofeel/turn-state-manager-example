<template>
<div class="piece-wrap">
  <div 
    v-if="isTurn"
    class="turn-ring"
  ></div>
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
      const size = innerWindowSize / 10;

      this.size = size;
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'src/style/main';

.piece-wrap {
  position: relative;
  font-size: 16px;
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
  transition: 0.3s;
  overflow: hidden;
  &:hover {
    // cursor: pointer;
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
  &.--turned {
    transform: scale(1.3);

    &::before {
      animation: 0.5s infinite turn-flow;
      
    }
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

.turn-ring {
  width: 140%;
  height: 140%;
  position: absolute;
  transform: translate(-50%, -50%) scale(1);
  left: 50%;
  top: 50%;
  opacity: 0.5;
  background: $red-orange;
  border-radius: 50%;
  animation: 1s infinite turn-billow;
}

@media screen and (max-width: 890px) {
  .piece-wrap {
    font-size: 10px;
  }
}

@keyframes turn-billow {
  0% {
    transform: translate(-50%, -50%) scale(0.9);
  }
  50% {
    transform: translate(-50%, -50%) scale(1.2);
  }
  100% {
    transform: translate(-50%, -50%) scale(0.9);
  }
}
@keyframes turn-flow {
  0% {
    left: 50%;
    top: 40%;
  }
  12% {
    left: 55%;
    top: 45%;
  }
  25% {
    left: 60%;
    top: 50%;
  }
  37% {
    left: 55%;
    top: 55%;
  }
  50% {
    left: 50%;
    top: 60%;
  }
  67% {
    left: 45%;
    top: 55%;
  }
  75% {
    left: 40%;
    top: 50%;
  }
  87% {
    left: 45%;
    top: 45%;
  }
  100% {
    left: 50%;
    top: 40%;
  }
}
</style>