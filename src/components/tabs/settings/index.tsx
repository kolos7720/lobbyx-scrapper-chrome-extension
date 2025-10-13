import { Stack } from "@mui/material";
import WebhookInput from "./webhook-input.tsx";
import ListOfVacanciesInput from "./list-of-vacancies-input.tsx";

export default function SettingsTab() {
  return (
    <Stack spacing={2}>
      <WebhookInput />
      <ListOfVacanciesInput />
    </Stack>
  )
}
