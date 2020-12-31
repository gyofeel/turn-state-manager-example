(function(t){function e(e){for(var i,o,r=e[0],c=e[1],l=e[2],m=0,d=[];m<r.length;m++)o=r[m],Object.prototype.hasOwnProperty.call(s,o)&&s[o]&&d.push(s[o][0]),s[o]=0;for(i in c)Object.prototype.hasOwnProperty.call(c,i)&&(t[i]=c[i]);u&&u(e);while(d.length)d.shift()();return a.push.apply(a,l||[]),n()}function n(){for(var t,e=0;e<a.length;e++){for(var n=a[e],i=!0,r=1;r<n.length;r++){var c=n[r];0!==s[c]&&(i=!1)}i&&(a.splice(e--,1),t=o(o.s=n[0]))}return t}var i={},s={app:0},a=[];function o(e){if(i[e])return i[e].exports;var n=i[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=t,o.c=i,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)o.d(n,i,function(e){return t[e]}.bind(null,i));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/turn-state-manager-example/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],c=r.push.bind(r);r.push=e,r=r.slice();for(var l=0;l<r.length;l++)e(r[l]);var u=c;a.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"10ca":function(t,e,n){"use strict";n("29f8")},"231a":function(t,e,n){"use strict";n("3b7c")},"29f8":function(t,e,n){},"398e":function(t,e,n){"use strict";n("820c")},"3b7c":function(t,e,n){},"3db4":function(t,e,n){"use strict";n("f9e1")},4256:function(t,e,n){},"486d":function(t,e,n){"use strict";n("4256")},"56d7":function(t,e,n){"use strict";n.r(e);var i=n("2b0e"),s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("div",{ref:"bg",staticClass:"bg",style:{width:t.bgWidth+"px",height:t.bgHeight+"px"}}),n("div",{staticClass:"main-wrap"},[n("section",{staticClass:"header"},[n("div",{staticClass:"title-wrap"},[n("div",{staticClass:"logo"}),n("div",{staticClass:"title"},[t._v(" Turn State Manager "),n("font-awesome-icon",{staticClass:"icon-github",attrs:{icon:["fab","github"],size:"lg"},on:{click:function(e){return t.onClickIcon("https://github.com/gyofeel/turn-state-manager")}}}),n("font-awesome-icon",{staticClass:"icon-npm",attrs:{icon:["fab","npm"],size:"lg"},on:{click:function(e){return t.onClickIcon("https://www.npmjs.com/package/turn-state-manager")}}})],1)]),n("div",{staticClass:"total-timer-wrap"},[n("TimeDisplayer",{staticClass:"total-time-displayer",attrs:{timeValue:t.totalTime,type:"large"}}),n("ArrowsLine",{staticClass:"arrows-line",attrs:{direction:t.turnDirection}})],1)]),n("section",{staticClass:"content"},[n("div",{staticClass:"players-container"},t._l(t.playerList,(function(e,i){return n("Piece",{key:i,staticClass:"turn-piece",attrs:{name:e.name,isTurn:i===t.turnIndex,time:t.isAuto&&i===t.turnIndex?t.turnTime:0}})})),1),n("div",{staticClass:"info-container"},[n("CommandDisplayer",{staticClass:"turn-command-displayer"}),n("Controller",{staticClass:"turn-controller",on:{control:t.onControl}})],1)])])])},a=[],o=n("97ef");const r={PREV:"prev",NEXT:"next",AUTO:"auto",LOOP:"loop",START:"start",END:"end"},c=new i["a"];var l=c,u=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"piece-wrap"},[t.isTurn?n("div",{staticClass:"turn-ring"}):t._e(),n("div",{staticClass:"piece",class:{"--turned":t.isTurn},style:{width:this.size+"px",height:this.size+"px",borderRadius:this.size/2+"px",background:this.background}},[n("span",{staticClass:"name"},[t._v(t._s(t.name))]),t.time>0?n("TimeDisplayer",{staticClass:"time-displayer",attrs:{timeValue:t.time,type:"small"}}):t._e()],1)])},m=[],d=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"timer",class:{"--small":t.type===t.TYPE.SMALL}},[n("span",{staticClass:"time"},[t._v(t._s((t.value/1e3).toFixed(1))+" "),n("span",{staticClass:"unit"},[t._v("sec")])])])},p=[];const h={LARGE:"large",SMALL:"small"};var f={name:"TimeDisplayer",props:{timeValue:[Number||String],type:{type:String,validator:t=>Object.values(h).includes(t)}},data(){return{isRunningOut:this.value<=3,TYPE:h}},computed:{value(){const t=parseInt(this.timeValue,10);return isNaN(t)?0:t}}},v=f,T=(n("9f59"),n("2877")),g=Object(T["a"])(v,d,p,!1,null,"7c508d1a",null),C=g.exports,b={name:"Piece",components:{TimeDisplayer:C},props:{name:String,time:[Number||String],isTurn:Boolean},data(){return{color:null,size:0}},created(){this.setColor(),window.addEventListener("resize",()=>{this.setSize()}),this.setSize()},methods:{setColor(){const t=this.name.charCodeAt([0]),e=t*(255*Math.random()+1)%255,n=t*(255*Math.random()+1)%255,i=t*(255*Math.random()+1)%255;this.background=`rgb(${e}, ${n}, ${i})`},setSize(){const t=Math.min(window.innerWidth,window.innerHeight),e=t/10;this.size=e}}},y=b,E=(n("486d"),Object(T["a"])(y,u,m,!1,null,"06a0cb70",null)),_=E.exports,w=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"command-wrap"},[n("div",{staticClass:"event-display"},[n("span",{staticClass:"title"},[t._v("Event")]),n("span",{ref:"eventName",staticClass:"event-name"},[n("span",{ref:"eventComplete"},[t._v(t._s("'complete & '"))]),t._v(t._s(t.emittedEvent))])]),n("div",{ref:"commandDisplayer",staticClass:"command-displayer"},t._l(t.commandList,(function(e,i){return n("div",{key:i,staticClass:"command-item",class:{"--last":i===t.commandList.length-1}},[n("div",{staticClass:"title"},[t._v(t._s(e.title))]),n("div",{staticClass:"command",domProps:{innerHTML:t._s(e.command)}})])})),0)])},x=[],N=n("cffa"),S={name:"CommandDisplayer",data(){return{commandList:[],emittedEvent:"'start'",animation:null,ref:null}},created(){l.$on("event",this.onEvent),l.$on("command",this.onCommand)},beforeDestroy(){l.$off("event",this.onEvent),l.$off("command",this.onCommand)},mounted(){this.ref=this.$refs.commandDisplayer},watch:{commandList:{deep:!0,handler:t=>{t.length>15&&t.shift()}}},methods:{onEvent(t){const{type:e}=t;if("complete"===e){const{eventComplete:t}=this.$refs,e="#ffee38",n=N["a"].to(t,{color:e,scale:"1.1",duration:.3,ease:'"elastic.out(2.5, 0.5)"',opacity:1,display:"inline",onComplete:()=>{n.reverse()}})}this.$nextTick(()=>{this.emittedEvent=`'${e}'`;const{eventName:t}=this.$refs,n="#f5f5f5",i="#ffee38";this.animation&&(this.animation.kill(),this.animation=N["a"].set(t,{color:n,scale:"1"})),this.animation=N["a"].to(t,{color:i,scale:"1.1",duration:.3,ease:'"elastic.out(2.5, 0.5)"',onComplete:()=>{this.animation.reverse()}})})},onCommand(t){const{title:e,command:n}=t;this.commandList.push({title:e,command:n}),this.$nextTick(()=>{this.ref.scrollTo({top:this.ref.scrollHeight,behavior:"smooth"})})}}},L=S,$=(n("10ca"),Object(T["a"])(L,w,x,!1,null,"966a0f16",null)),k=$.exports,A=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"controller"},[n("div",{staticClass:"btn-wrap"},[n("div",{staticClass:"dir-btn --prev",on:{click:t.onClickPrevTurn}},[n("span",{staticClass:"text"},[t._v("Prev Turn")])]),n("div",{staticClass:"state-wrap"},[n("div",{staticClass:"state-btn",class:{"--on":t.isAuto},on:{click:t.onToggleAuto}},[n("div",{staticClass:"text"},[t._v("Auto")]),n("div",{staticClass:"ball"})]),n("div",{staticClass:"state-btn",class:{"--on":t.isLoop},on:{click:t.onToggleLoop}},[n("div",{staticClass:"text"},[t._v("Loop")]),n("div",{staticClass:"ball"})])]),n("div",{staticClass:"dir-btn --next",on:{click:t.onClickNextTurn}},[n("span",{staticClass:"text"},[t._v("Next Turn")])])]),n("div",{staticClass:"power-btn",on:{click:t.onClickBegin}},[n("span",{staticClass:"text"},[t._v(t._s(t.isRun?"END":"START"))])])])},G=[],R={name:"Controller",data(){return{isAuto:!0,isLoop:!0,isRun:!0}},created(){l.$on("event",this.onEvent)},beforeDestroy(){l.$off("event",this.onEvent)},methods:{onClickPrevTurn(){this.$emit("control",{type:r.PREV})},onClickNextTurn(){this.$emit("control",{type:r.NEXT})},onToggleAuto(){this.isAuto=!this.isAuto,this.$emit("control",{type:r.AUTO,value:{auto:this.isAuto}})},onToggleLoop(){this.isLoop=!this.isLoop,this.$emit("control",{type:r.LOOP,value:{loop:this.isLoop}})},onClickBegin(){this.$emit("control",{type:this.isRun?r.END:r.START})},onEvent(t){const{type:e}=t;"end"===e?this.isRun=!1:"start"===e&&(this.isRun=!0)}}},O=R,P=(n("231a"),Object(T["a"])(O,A,G,!1,null,"ebf25b66",null)),M=P.exports,D=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"arrows-line",class:{"--prev":t.direction===t.turnStateManager.PREV_TURN}},[n("font-awesome-icon",{ref:"fontAwesomeIcon",staticClass:"icon",attrs:{icon:["fas","long-arrow-alt-right"],size:"4x"}})],1)},j=[],I={name:"arrowsLine",props:{direction:{type:String,validator:t=>[o["turnStateManager"].PREV_TURN,o["turnStateManager"].NEXT_TURN].findIndex(e=>e===t)>-1}},data(){return{turnStateManager:o["turnStateManager"]}}},U=I,z=(n("3db4"),Object(T["a"])(U,D,j,!1,null,"3683f7ba",null)),V=z.exports;const H=["A","B","C","D","E","F","G","H"];var X={name:"App",components:{Piece:_,TimeDisplayer:C,CommandDisplayer:k,Controller:M,ArrowsLine:V},data(){return{bgWidth:0,bgHeight:0,turnStateManager:null,playerList:H.map((t,e)=>({name:t,id:`${t}_${e}`})),turnIndex:0,turnDirection:o["turnStateManager"].NEXT_TURN,turnTime:0,totalTime:0,isAuto:!0,isLoop:!0}},created(){this.turnGame=o["turnStateManager"].setGame("turnGameId",{turnIndex:0,turnNumber:this.playerList.length,turnTime:3e3,totalTime:5e4,turnTimeTickCallback:this.onTurnTimeTick,totalTimeTickCallback:this.onTotalTimeTick,auto:this.isAuto,loop:this.isLoop}),this.$nextTick(()=>{l.$emit("command",{title:"Set Game.",command:'const turnGame = turnStateManager.setGame("id", {<br />\n         turnIndex: 0,<br />\n         turnNumber: 8,<br />\n         turnTime: 3000,<br />\n         totalTime: 50000,<br />\n        });'})});const{START:t,PREV_TURN:e,NEXT_TURN:n,COMPLETE:i,END:s}=o["turnStateManager"];this.turnGame.on(t,this.onStart),this.turnGame.on(e,this.onPrevTurn),this.turnGame.on(n,this.onNextTurn),this.turnGame.on(i,this.onComplete),this.turnGame.on(s,this.onEnd),this.turnGame.start()},mounted(){window.addEventListener("resize",this.setBg),this.setBg()},beforeDestroy(){window.removeEventListener("resize",this.setBg);const{START:t,PREV_TURN:e,NEXT_TURN:n,COMPLETE:i,END:s}=o["turnStateManager"];this.turnGame.off(t,this.onStart),this.turnGame.off(e,this.onPrevTurn),this.turnGame.off(n,this.onNextTurn),this.turnGame.off(i,this.onComplete),this.turnGame.off(s,this.onEnd)},methods:{setBg(){const t=Math.max(document.body.scrollWidth,window.innerWidth),e=Math.max(document.body.scrollHeight,window.innerHeight);this.bgWidth=t,this.bgHeight=e},onControl(t){const{type:e}=t;let n="",i="";const{PREV_TURN:s,NEXT_TURN:a,END:c}=o["turnStateManager"];e===r.PREV?(this.turnGame.emit(s),this.turnDirection=this.turnGame.getAutoDirection(),n="Go to the turn as small as 1.",i="turnGame.emit(turnStateManager.PREV_TURN);"):e===r.NEXT?(this.turnGame.emit(a),this.turnDirection=this.turnGame.getAutoDirection(),n="Go to the turn as big as 1.",i="turnGame.emit(turnStateManager.NEXT_TURN);"):e===r.AUTO?(this.isAuto=t.value.auto,this.turnGame.setAutoOption(this.isAuto),n=`Set auto option to ${this.isAuto}.`,i=`turnGame.setAutoOption(${this.isAuto});`):e===r.LOOP?(this.isLoop=t.value.loop,this.turnGame.setLoopOption(this.isLoop),n=`Set loop option to ${this.isLoop}.`,i=`turnGame.setLoopOption(${this.isLoop});`):e===r.START?(this.turnGame.emit(c),this.turnGame.start(),n="Let the game start.",i="turnGame.emit(turnStateManager.END);<br />turnGame.start();"):e===r.END&&(this.turnGame.emit(c),n="Let the game over.",i="turnGame.emit(turnStateManager.END);"),l.$emit("command",{title:n,command:i})},onClickIcon(t){window.open(t)},onStart(t){const{type:e}=t;this.turnIndex=t.index,l.$emit("event",{type:e})},onPrevTurn(t){const{type:e}=t;this.turnIndex=t.index,l.$emit("event",{type:e})},onNextTurn(t){const{type:e}=t;this.turnIndex=t.index,l.$emit("event",{type:e})},onComplete(t){const{type:e}=t;l.$emit("event",{type:e})},onEnd(t){const{type:e}=t;l.$emit("event",{type:e})},onTurnTimeTick(t){this.turnTime=3e3-t.timerCount},onTotalTimeTick(t){this.totalTime=5e4-t.timerCount}}},B=X,W=(n("398e"),Object(T["a"])(B,s,a,!1,null,"7f40ce46",null)),F=W.exports,J=(n("63bf"),n("ecee")),Y=n("f2d1"),q=n("c074"),K=n("ad3d");J["c"].add(Y["b"],Y["c"],q["a"]),J["c"].add(Y["a"]),J["c"].add(q["b"]),i["a"].component("font-awesome-icon",K["a"]),i["a"].config.productionTip=!1,new i["a"]({render:t=>t(F)}).$mount("#app")},"63bf":function(t,e,n){},7286:function(t,e,n){},"820c":function(t,e,n){},"9f59":function(t,e,n){"use strict";n("7286")},f9e1:function(t,e,n){}});
//# sourceMappingURL=app.817c5657.js.map