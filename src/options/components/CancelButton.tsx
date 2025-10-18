import { Button } from "@mui/material";
import { useFormikContext } from "formik";
import { isEqual } from "lodash";

export default function CancelButton() {
  const { initialValues, values } = useFormikContext();

  const isValuesChanged = !isEqual(initialValues, values);
  const disabled = !isValuesChanged;

  return (
    <Button variant="outlined" disabled={disabled}>
      Cancel
    </Button>
  )
}