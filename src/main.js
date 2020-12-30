import Vue from "vue";
import App from "./App.vue";
import "./style/reset.scss";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFontAwesome, faGithub, faNpm } from '@fortawesome/free-brands-svg-icons';
import { faUserSecret,  faChevronRight} from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faGithub, faNpm, faChevronRight);
library.add(faFontAwesome);
library.add(faUserSecret);

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App)
}).$mount("#app");
