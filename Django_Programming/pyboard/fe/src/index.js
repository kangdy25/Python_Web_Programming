import { createApp } from "vue";
import Root from "./client/Root.vue";
import router from "./shared/router";

const app = createApp(Root);
app.use(router);
app.mount("#root");
