<template>
  <div id="app">
    <div class="bg"></div> 
    <div class="main-wrap">
      <section class="header">
        <div class="title-wrap">
          <span class="title">Turn State Manager</span>
        </div>
        <div class="total-timer-wrap">
          <!-- <div class="displayer-title">COUNT</div> -->
          <TimeDisplayer
            class="total-time-displayer"
            :timeValue="totalTime"
            :type="'large'"
          />
        </div>
      </section>
      <section class="content">
        <div class="players-container">
          <Piece
            v-for="(player, index) in playerList"
            :key="index"
            :name="player.name"
            :isTurn="index === turnIndex"
            :time="index === turnIndex ? turnTime : 0"
          />
        </div>
        <div class="info-container">
            <Controller
              class="turn-controller"
              @control="onControl"
            />
          <div class="command-wrap">
            <CommandDisplayer
              class="turn-command-displayer"
            />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { turnStateManager, EVENT } from "turn-state-manager";

import Piece from "./components/Piece";
import TimeDisplayer from "./components/TimeDisplayer";
import CommandDisplayer from './components/CommandDisplayer';
import Controller from './components/Controller';

const PLAER_NAME_LIST = ["A", "B", "C", "D", "E"];

export default {
  name: "App",
  components: {
    Piece,
    TimeDisplayer,
    CommandDisplayer,
    Controller
  },
  data() {
    return {
      turnStateManager: null,
      playerList: PLAER_NAME_LIST.map((playerName, index) => {
        return {
          name: playerName,
          id: `${playerName}_${index}`,
        };
      }),
      turnIndex: 0,
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
      turnTime: 2000,
      totalTime: 50000,
      turnTimeTickCallback: this.onTurnTimeTick,
      totalTimeTickCallback: this.onTotalTimeTick,
      auto: this.isAuto,
      loop: this.isLoop,
    });
    this.turnGame.on(EVENT.START, this.onStart);
    this.turnGame.on(EVENT.PREV_TURN, this.onPrevTurn);
    this.turnGame.on(EVENT.NEXT_TURN, this.onNextTurn);
    this.turnGame.on(EVENT.COMPLETE, this.onComplete);
    this.turnGame.on(EVENT.END, this.onEnd);
    this.turnGame.start();

    // setTimeout(() => {
    //   this.turnGame.emit(EVENT.PREV_TURN);
    // }, 15000);
  },
  methods: {
    // onToggleAuto() {
    //   this.isAuto = !this.isAuto;
    //   this.turnGame.setAutoOption(this.isAuto);
    // },
    // onToggleLoop() {
    //   this.isLoop = !this.isLoop;
    //   this.turnGame.setLoopOption(this.isLoop);
    // },
    // onClickNextTurn() {
    //   this.turnGame.emit(EVENT.NEXT_TURN);
    // },
    // onClickPrevTurn() {
    //   this.turnGame.emit(EVENT.PREV_TURN);
    // },
    // onClickBegin() {
    //   this.turnGame.emit(EVENT.END);
    //   this.turnGame.start();
    // },  
    // onClickFinish() {
    //   this.turnGame.emit(EVENT.END);
    // },
    onControl(e) {
      console.log(e);
    },
    onStart(e) {
      this.turnIndex = e.index;
    },
    onPrevTurn(e) {
      this.turnIndex = e.index;
    },
    onNextTurn(e) {
      this.turnIndex = e.index;
    },
    onComplete(e) {
      console.log(e.type);
    },
    onEnd(e) {
      console.log(e.type);
    },
    onTurnTimeTick(e) {
      this.turnTime = 2000 - e.timerCount;
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
}
.header {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  height: 100px;
  .title {
    font-size: $font-m;
    font-weight: bold;
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
  margin-top: 130px;
  
  .players-container {
    width: 85%;
    display: flex;
    justify-content: space-between;
  }
  .info-container {
    width: 85%;
    margin-top: 15%;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
  }
}
</style>
