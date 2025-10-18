import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'

import { Stack, Typography, CssBaseline } from "@mui/material";
import WebhookInput from "./components/webhook-input.tsx";
import ListOfVacanciesInput from "./components/list-of-vacancies-input.tsx";

function SidePanel() {
  return (
    <>
      <CssBaseline />
      <Stack spacing={2} padding={3} maxWidth={768}>
        <Typography variant="h5">LobbyX Scrapper Options</Typography>
        <WebhookInput />
        <ListOfVacanciesInput />
      </Stack>
    </>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SidePanel />
  </StrictMode>,
)
