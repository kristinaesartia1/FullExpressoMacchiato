import "@mdi/font/css/materialdesignicons.css";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { VFileUpload } from 'vuetify/labs/VFileUpload';
import { en } from 'vuetify/locale';
import "vuetify/styles";
import "./fonts/fonts.module.scss";
import "./styles/animations.module.scss";
import "./styles/rules.css";
import "./styles/rules.module.scss";
import theme from "./theme";

const vuetify = createVuetify({
	components: { ...components, VFileUpload },
	directives,
	icons: { defaultSet: "mdi" },
	theme,
	locale: {
		locale: 'en',
		fallback: 'en',
		messages: { en },
	},
});

export default vuetify;
