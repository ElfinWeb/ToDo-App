import { createApp } from "vue";
import App from "./App.vue";

import BaseList from "./components/UI/BaseList.vue";
import BaseCard from "./components/UI/BaseCard.vue";

const app = createApp(App);

app.component('base-list', BaseList);
app.component('base-card', BaseCard);

app.mount("#app");
