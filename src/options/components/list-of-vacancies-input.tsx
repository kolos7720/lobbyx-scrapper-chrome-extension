import { TextField } from "@mui/material";

export default function ListOfVacanciesInput() {
  return (
    <TextField
      size="small"
      label="Vacancies URLs"
      variant="outlined"
      helperText="Each URL should be on a new line."
      multiline
    />
  )
}