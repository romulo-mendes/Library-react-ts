import { Alert, Snackbar, AlertColor } from "@mui/material";
import { useState } from "react";

type AlertsProps = {
	isOpen: boolean;
	alertMsg: string;
	typeError: AlertColor | undefined;
};

const Alerts = ({ isOpen, alertMsg, typeError }: AlertsProps) => {
	const [open, setOpen] = useState(false);
	const [msg, setMsg] = useState("");
	const [alert, setAlert] = useState<AlertColor>();

	setMsg(alertMsg);
	setAlert(typeError);
	setOpen(isOpen);

	return (
		<Snackbar
			open={open}
			autoHideDuration={4000}
			onClose={() => {
				setOpen(false);
			}}
			anchorOrigin={{ vertical: "top", horizontal: "center" }}
		>
			<Alert severity={alert} sx={{ width: "100%" }}>
				{msg}
			</Alert>
		</Snackbar>
	);
};

export default Alerts;
