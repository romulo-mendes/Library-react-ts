import { createTheme } from "@mui/material/styles";

export const mainTheme = createTheme({
	palette: {
		primary: {
			main: "#FFC501",
			dark: "#FFc000",
		},
		secondary: {
			main: "#167ce2",
		},
	},
	components: {
		MuiButton: {
			variants: [
				{
					props: { variant: "contained" },
					style: {
						boxShadow: "none",
						fontWeight: "700",
						fontSize: "16px",
					},
				},
			],
		},
	},
});
