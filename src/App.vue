<template>
  <div id="app">
    <div 
      class="bg"
      ref="bg"
      :style="{
        width: `${bgWidth}px`,
        height: `${bgHeight}px`
      }"
    ></div> 
    <div class="main-wrap">
      <section class="header">
        <div class="title-wrap">
          <div class="logo"></div>
          <div class="title">
            Turn State Manager
            <font-awesome-icon 
              class="icon-github"
              :icon="['fab', 'github']"
              size="lg"
              @click="onClickIcon('https://github.com/gyofeel/turn-state-manager')"
            />
            <!-- <font-awesome-icon
              :icon="['fas', 'chevron-right']"
              size="2x"
            /> -->
            <font-awesome-icon 
              class="icon-npm"
              :icon="['fab', 'npm']" 
              size="lg"
              @click="onClickIcon('https://www.npmjs.com/package/turn-state-manager')"
            />
          </div>
        </div>
        <div class="total-timer-wrap">
          <!-- <div class="displayer-title">COUNT</div> -->
          <TimeDisplayer
            class="total-time-displayer"
            :timeValue="totalTime"
            :type="'large'"
          />
          <ArrowsLine 
            class="arrows-line"
            :direction="turnDirection"
          />
        </div>
      </section>
      <section class="content">
        <div class="players-container">
          <Piece
            class="turn-piece"
            v-for="(player, index) in playerList"
            :key="index"
            :name="player.name"
            :isTurn="index === turnIndex"
            :time="isAuto && index === turnIndex ? turnTime : 0"
          />
        </div>
        <div class="info-container">
            <CommandDisplayer
              class="turn-command-displayer"
            />
            <Controller
              class="turn-controller"
              @control="onControl"
            />
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { turnStateManager } from "turn-state-manager";
import { CONTROL_TYPE } from './config/constants'
import EventBus from './utils/EventBus';

import Piece from "./components/Piece";
import TimeDisplayer from "./components/TimeDisplayer";
import CommandDisplayer from './components/CommandDisplayer';
import Controller from './components/Controller';
import ArrowsLine from './components/ArrowsLine';

const PLAER_NAME_LIST = ["A", "B", "C", "D", "E", "F", "G", "H"];

export default {
  name: "App",
  components: {
    Piece,
    TimeDisplayer,
    CommandDisplayer,
    Controller,
    ArrowsLine
  },
  data() {
    return {
      bgWidth: 0,
      bgHeight: 0,
      turnStateManager: null,
      playerList: PLAER_NAME_LIST.map((playerName, index) => {
        return {
          name: playerName,
          id: `${playerName}_${index}`,
        };
      }),
      turnIndex: 0,
      turnDirection: turnStateManager.NEXT_TURN,
      turnTime: 0,
      totalTime: 0,
      isAuto: true,
      isLoop: true
    };
  },
  created() {
    this.turnGame = turnStateManager.setGame("turnGameId", {
      turnIndex: 0,
      turnNumber: this.playerList.length,
      turnTime: 3000,
      totalTime: 50000,
      turnTimeTickCallback: this.onTurnTimeTick,
      totalTimeTickCallback: this.onTotalTimeTick,
      auto: this.isAuto,
      loop: this.isLoop,
    });
    this.$nextTick(() => {
      EventBus.$emit('command', {
        title: 'Set Game.',
        command: `const turnGame = turnStateManager.setGame("id", {<br />
         turnIndex: 0,<br />
         turnNumber: 8,<br />
         turnTime: 3000,<br />
         totalTime: 50000,<br />
        });`
      });
    });
    const { START, PREV_TURN, NEXT_TURN, COMPLETE, END } = turnStateManager;
    this.turnGame.on(START, this.onStart);
    this.turnGame.on(PREV_TURN, this.onPrevTurn);
    this.turnGame.on(NEXT_TURN, this.onNextTurn);
    this.turnGame.on(COMPLETE, this.onComplete);
    this.turnGame.on(END, this.onEnd);
    this.turnGame.start();
  },
  mounted() {
    window.addEventListener('resize', this.setBg);
    this.setBg();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.setBg);

    const { START, PREV_TURN, NEXT_TURN, COMPLETE, END } = turnStateManager;
    this.turnGame.off(START, this.onStart);
    this.turnGame.off(PREV_TURN, this.onPrevTurn);
    this.turnGame.off(NEXT_TURN, this.onNextTurn);
    this.turnGame.off(COMPLETE, this.onComplete);
    this.turnGame.off(END, this.onEnd);
  },
  methods: {
    setBg() {
      const bgWidth = Math.max(document.body.scrollWidth, window.innerWidth);
      const bgHeight = Math.max(document.body.scrollHeight, window.innerHeight);

      this.bgWidth = bgWidth;
      this.bgHeight = bgHeight;
    },
    onControl(e) {
      const { type } = e;
      let title = '';
      let command = '';
    const { PREV_TURN, NEXT_TURN, END } = turnStateManager;
      if (type === CONTROL_TYPE.PREV) {
        this.turnGame.emit(PREV_TURN);
        this.turnDirection = this.turnGame.getAutoDirection();
        title = 'Go to the turn as small as 1.';
        command = 'turnGame.emit(turnStateManager.PREV_TURN);';
      } else if (type === CONTROL_TYPE.NEXT) {
        this.turnGame.emit(NEXT_TURN);
        this.turnDirection = this.turnGame.getAutoDirection();
        title = 'Go to the turn as big as 1.'
        command = 'turnGame.emit(turnStateManager.NEXT_TURN);';
      } else if (type === CONTROL_TYPE.AUTO) {
        this.isAuto = e.value.auto;
        this.turnGame.setAutoOption(this.isAuto);
        title = `Set auto option to ${this.isAuto}.`;
        command = `turnGame.setAutoOption(${this.isAuto});`
      } else if (type === CONTROL_TYPE.LOOP) {
        this.isLoop = e.value.loop;
        this.turnGame.setLoopOption(this.isLoop);
        title = `Set loop option to ${this.isLoop}.`;
        command = `turnGame.setLoopOption(${this.isLoop});`;
      } else if (type === CONTROL_TYPE.START) {
        this.turnGame.emit(END);
        this.turnGame.start();
        title = 'Let the game start.';
        command = 'turnGame.emit(turnStateManager.END);<br />turnGame.start();';
      } else if (type === CONTROL_TYPE.END) {
        this.turnGame.emit(END);
        title = 'Let the game over.'
        command = 'turnGame.emit(turnStateManager.END);';
      }

      EventBus.$emit('command', {
        title,
        command
      });
    },
    onClickIcon(url) {
      window.open(url);
    },
    onStart(e) {
      const { type } = e;
      this.turnIndex = e.index;
      EventBus.$emit('event', { type });
    },
    onPrevTurn(e) {
      const { type } = e;
      this.turnIndex = e.index;
      EventBus.$emit('event', { type });
    },
    onNextTurn(e) {
      const { type } = e;
      this.turnIndex = e.index;
      EventBus.$emit('event', { type });
    },
    onComplete(e) {
      const { type } = e;
      EventBus.$emit('event', { type });
    },
    onEnd(e) {
      const { type } = e;
      EventBus.$emit('event', { type });
    },
    onTurnTimeTick(e) {
      this.turnTime = 3000 - e.timerCount;
    },
    onTotalTimeTick(e) {
      this.totalTime = 50000 - e.timerCount;
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'src/style/main';

.bg {
  position: absolute;
  width: 100%;
  height: 100%;
  background: $bg-color;
  z-index: -1;
}
.main-wrap {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  color: $text-color;
  width: 100%;
  overflow: scroll;
  padding-bottom: 30px;
}
.header {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  margin-top: 25px;
  width: 85%;
  height: 100px;
  .title-wrap {
    display: flex;
  }
  .logo {
    width: 36px;
    height: 36px;
    position: relative;
    background: $red-orange;
    border-radius: 18px;
    overflow: hidden;
    &::after {
      content: '';
      width: 36px;
      height: 36px;
      position: absolute;
      transform: translate(-50%, -50%);
      background:$yellow; 
      border-radius: 18px;
      left: 50%;
      top: 30%;
    }
  }
  .title {
    font-size: $font-l;
    font-weight: bold;
    display: flex;
    align-items: baseline;
    margin-left: 10px;
    font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande';
  }
  .icon-github {
    padding-left: 15px;
    cursor: pointer;
  }
  .icon-npm {
    padding-left: 10px;
    cursor: pointer;
  }
  .total-timer-wrap {
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-end;
    .displayer-title {
      padding-bottom: 10px;
    }
  }
}

.content {
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;

  .players-container {
    width: 85%;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    .turn-piece {
      margin: 2%;
    }
  }
  .info-container {
    width: 85%;
    margin-top: 5%;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: flex-end;
    .turn-command-displayer {
      width: 30%;
      margin: 0 3%;
    }
    .turn-controller {
      width: 30%;
      margin: 0 3%;
    }
  }
}

@media screen and (max-width: 890px) {
  .main-wrap {
    padding-bottom: 240px;
  }
  .header {
    flex-flow: column nowrap;
    align-items: center;

    .logo {
      width: 24px;
      height: 24px;
      border-radius: 12px;
      &::after {
        width: 24px;
        height: 24px;
        border-radius: 12px;
      }
    }
    .title {
      font-size: $font-s;
    }
    .total-timer-wrap {
      margin-top: 20px;
      width: 90%;
    }
  }

  .content {
    .players-container {
      width: 90%;
    }
    .info-container {
      width: 90%;
      .turn-command-displayer {
        width: 100%;
      }
      .turn-controller {
        width: 100%;
        position: fixed;
        left: 0;
        bottom: 0;
        background: $dark-gray;
        border-top: 5px solid $red-orange;
        border-radius: 15px;
        margin: 0;
      }
    }
  }
}
</style>
