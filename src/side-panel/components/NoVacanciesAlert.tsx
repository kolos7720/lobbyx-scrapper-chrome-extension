import { Alert, Link } from "@mui/material";
import useSettingsContext from "../../context/settings/useSettingsContext.ts";

export default function NoVacanciesAlert() {
  const { openSettingsPage } = useSettingsContext();

  return (
    <Alert variant="outlined" severity="warning" sx={{ width: '100%' }}>
      No vacancies found. You can add them in the <Link onClick={openSettingsPage}>options</Link>.
    </Alert>
  )
}