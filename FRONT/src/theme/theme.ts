import { UI } from "@/_CONFIGS";

const theme = {
	defaultTheme: UI.DefaultTheme,
	themes: {
		light: {
			"dark": false,
			"colors": {
				"background": "#FEFFFD",
				"surface": "#FDFCFC",
				"primary": "#FFCF40",
				"secondary": "#AAB4FD",
				"error": "#F44336",
				"info": "#2196F3",
				"success": "#4CAF50",
				"warning": "#FFAC07",
				"on-background": "#212121",
				"on-surface": "#212121"
			}
		},
		dark: {
			"dark": true,
			"colors": {
				"background": "#121212",
				"surface": "#212121",
				"primary": "#FCF686",
				"secondary": "#C577F7",
				"error": "#CF6679",
				"info": "#2196F3",
				"success": "#4CAF50",
				"warning": "#FB8C00",
				"on-background": "#fff",
				"on-surface": "#fff"
			}
		}
	}
};


export default theme;
