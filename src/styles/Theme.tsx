import { createTheme } from "@mui/material/styles";

export const mainTheme = createTheme({
	typography: {
		button: {
			textTransform: "none",
		},
	},
	palette: {
		primary: {
			main: "#133052",
			dark: "#3e4756",
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
		MuiTypography: {
			styleOverrides: {
				root: { color: "#3e4756" },
				body1: { fontWeight: "300", marginBottom: "24px" },
				subtitle1: { fontWeight: "500", marginBottom: "8px" },
			},
		},
	},
});
