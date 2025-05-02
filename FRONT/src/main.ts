import { createPinia } from "pinia";
import { createApp } from "vue";
import Toast from "vue3-toastify";
import App from "./App.vue";
import { router } from "./router/_init";
import { toastOption } from "./theme/toasts";
import vuetify from "./theme/vuetify";
import { Cazzios } from "./utils/axios.utils";

const pinia = createPinia();
(async () =>
{
    await Cazzios.setInstance()
    createApp(App)
        .use(pinia)
        .use(router)
        .use(vuetify)
        .use(Toast, toastOption)
        .mount("#app");
})
();
