import { createApp } from "vue";
import App from "./App.vue";

import "./styles/app.scss";
import GameSequence from "./GameSequence";

createApp(App).mount("#app");

new GameSequence();
