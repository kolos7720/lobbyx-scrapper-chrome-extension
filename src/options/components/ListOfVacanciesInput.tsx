import { TextField } from "@mui/material";
import { useFormikContext } from "formik";
import type { Settings } from "../../types.ts";

export default function ListOfVacanciesInput() {
  const formik = useFormikContext<Settings>();

  return (
    <TextField
      id="vacanciesURLs"
      name="vacanciesURLs"
      value={formik.values.vacanciesURLs}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      size="small"
      label="Vacancies URLs"
      variant="outlined"
      helperText="Each URL should be on a new line."
      multiline
    />
  )
}