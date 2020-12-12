<template>
  <div id="app">
    <div class="main-wrap">
      <section class="header">
        <div class="displayer-title">TOTAL</div>
        <TimeDisplayer
          class="total-time-displayer"
          :timeValue="totalTime"
          :type="'large'"
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
        <button 
          class=""
          @click="onClickNextTurn"
        >
          Next Turn!
        </button>
        <button 
          class=""
          @click="onClickPrevTurn"
        >
          Prev Turn!
        </button>
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
      totalTime: 0
    };
  },
  created() {
    const turnStateManager = TurnStateManager.getInstance();
    this.turnGame = turnStateManager.setGame("turnGameId", {
      turnIndex: 0,
      turnNumber: this.playerList.length,
      turnTime: 5000,
      // totalTime: 30000,
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
    onClickNextTurn() {
      this.turnGame.emit(EVENT.NEXT_TURN);
    },
    onClickPrevTurn() {
      this.turnGame.emit(EVENT.PREV_TURN);
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
    // onComplete(e) {},
    // onEnd(e) {},
    onTurnTimeTick(e) {
      this.turnTime = e.timerCount;
    },
    onTotalTimeTick(e) {
      this.totalTime = e.timerCount;
    },
  },
};
</script>

<style scoped>
.main-wrap {
  display: flex;
  flex-flow: column nowrap;
}
.header {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  position: absolute;
  transform: translate(-50%, 0);
  top: 25px;
  left: 50%;
}
.displayer-title {
  padding-bottom: 10px;
}

.content {
  width: 100%;
  display: flex;
  justify-content: center;
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 40%;
}

.players-container {
  width: 85%;
  display: flex;
  justify-content: space-around;
}

.controll-container {
  position: absolute;
  transform: translate(-50%, 0);
  bottom: 50px;
  left: 50%;
}
</style>
