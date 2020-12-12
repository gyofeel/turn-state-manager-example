<template>
  <div id="app">
    <div class="main-wrap">
      <section class="header">
        <TimeDisplayer
          class="total-time-displayer"
          :timeValue="totalTime"
          :type="'small'"
        />
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
      </section>
      <div class="controll-container">
        <label class="auto-turnover-controller"
          ><input type="checkbox" />Auto Turnover</label
        >
        <label class="loop-controller"><input type="checkbox" />Loop</label>
        <button class="">Turn Over!</button>
        <button class="">Finish The Game</button>
      </div>
    </div>
  </div>
</template>

<script>
import { TurnStateManager, EVENT } from "turn-state-manager";

import TimeDisplayer from "./components/TimeDisplayer";
import Piece from "./components/Piece";

const PLAER_NAME_LIST = ["Kim", "Noh", "Seo", "Jang", "Choi"];

export default {
  name: "App",
  components: {
    TimeDisplayer,
    Piece,
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
    };
  },
  created() {
    const turnStateManager = TurnStateManager.getInstance();
    this.turnGame = turnStateManager.setGame("turnGameId", {
      turnIndex: 0,
      turnNumber: this.playerList.length,
      turnTime: 5000,
      totalTime: 30000,
      turnTimeTickCallback: this.onTurnTimeTick,
      totalTimeTickCallback: this.onTotalTimeTick,
      auto: true,
      loop: true,
    });
    this.turnGame.on(EVENT.START, this.onStart);
    this.turnGame.on(EVENT.PREV_TURN, this.onPrevTurn);
    this.turnGame.on(EVENT.NEXT_TURN, this.onNextTurn);
    this.turnGame.on(EVENT.COMPLETE, this.onComplete);
    this.turnGame.on(EVENT.END, this.onEnd);
    this.turnGame.start();

    setTimeout(() => {
      this.turnGame.emit(EVENT.PREV_TURN);
    }, 15000);
  },
  methods: {
    onStart(e) {
      this.turnIndex = e.index;
    },
    onPrevTurn(e) {
      this.turnIndex = e.index;
    },
    onNextTurn(e) {
      this.turnIndex = e.index;
    },
    onComplete(e) {},
    onEnd(e) {},
    onTurnTimeTick(e) {
      this.turnTime = e.timerCount;
    },
    onTotalTimeTick(e) {
      this.totalTime = e.timerCount;
    },
  },
};
</script>

<style>
.main-wrap {
  padding: 15% 10%;
  display: flex;
  flex-flow: column nowrap;
}
.players-container {
  width: 95%;
  display: flex;
  justify-content: space-around;
}
</style>
