import { TextField } from "@mui/material";
import { useFormikContext } from "formik";
import type { Settings } from "../../types.ts";

export default function WebhookInput() {
  const formik = useFormikContext<Settings>();

  return (
    <TextField
      id="webHookURL"
      name="webHookURL"
      value={formik.values.webHookURL}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      size="small"
      label="WebHook URL"
      variant="outlined"
      helperText="This endpoint must accept POST requests with a JSON body containing the event data."
    />
  )
}