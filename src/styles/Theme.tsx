import { createTheme } from "@mui/material/styles";

export const mainTheme = createTheme({
	palette: {
		primary: {
			main: "#133052",
			contrastText: "#000",
		},
		secondary: {
			main: "#FFC501",
			dark: "#FFc000",
			contrastText: "#000",
		},
	},
	components: {
		MuiButton: {
			variants: [
				{
					props: { variant: "contained" },
					style: {
						height: "53px",
						boxShadow: "none",
						fontWeight: "700",
						fontSize: "16px",
					},
				},
				{
					props: { variant: "outlined" },
					style: {
						height: "53px",
						boxShadow: "none",
						fontWeight: "700",
						fontSize: "16px",
					},
				},
			],
		},
	},
});
