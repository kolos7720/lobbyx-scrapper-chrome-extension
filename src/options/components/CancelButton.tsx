import { Button } from "@mui/material";
import { useFormikContext } from "formik";
import { isEqual } from "lodash";

export default function CancelButton() {
  const { initialValues, values, resetForm } = useFormikContext();

  const isValuesChanged = !isEqual(initialValues, values);
  const disabled = !isValuesChanged;

  const handleCancel = () => {
    resetForm()
  }

  return (
    <Button
      variant="outlined"
      disabled={disabled}
      onClick={handleCancel}
    >
      Cancel
    </Button>
  )
}