import { TextField } from "@mui/material";

export default function WebhookInput() {
  return (
    <TextField
      size="small"
      label="WebHook URL"
      variant="outlined"
      helperText="This endpoint must accept POST requests with a JSON body containing the event data."
    />
  )
}