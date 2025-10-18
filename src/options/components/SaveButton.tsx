import { Button } from "@mui/material";
import { useFormikContext } from "formik";
import { isEqual } from "lodash";

export default function SaveButton() {
  const { initialValues, values } = useFormikContext();

  const isValuesChanged = !isEqual(initialValues, values);
  const disabled = !isValuesChanged;

  return (
    <Button
      type="submit"
      variant="contained"
      disabled={disabled}
    >
      Save
    </Button>
  )
}