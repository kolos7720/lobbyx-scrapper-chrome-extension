import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useFormikContext } from "formik";
import type { Settings } from "../../types.ts";
import type { PickerValue } from "@mui/x-date-pickers/internals";
import dayjs from "dayjs";

export default function EarlierThanDatePicker() {
  const formik = useFormikContext<Settings>();

  const handleChange = async (date: PickerValue) => {
    await formik.setFieldValue('skipBefore', date?.valueOf() || null)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={formik.values.skipBefore ? dayjs(formik.values.skipBefore) : null}
        onChange={handleChange}
        label="Skip before"
        slotProps={{
          textField: {
            id: "skipBefore",
            name: "skipBefore",
            size: 'small',
            helperText: 'Skip applications added earlier than.',
          }
        }}
        sx={{
          maxWidth: 300
        }}
      />
    </LocalizationProvider>
  )
}
