import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Stack, CssBaseline } from "@mui/material";
import '../index.css'

import StartButton from "./components/StartButton.tsx";
import TotalProgress from "./components/TotalProgress.tsx";
import SettingsProvider from "../context/settings/provider.tsx";
import NoVacanciesAlert from "./components/NoVacanciesAlert.tsx";
import useSettingsContext from "../context/settings/useSettingsContext.ts";
import ScrapperProvider from "../context/scrapper/provider.tsx";

function SidePanel() {
  const { vacanciesURLsList } = useSettingsContext();

  const isVacanciesListEmpty = vacanciesURLsList.length === 0;

  return (
    <>
      <CssBaseline />
      <Stack spacing={2} padding={3}>
        <StartButton />
        {
          isVacanciesListEmpty ?
            <NoVacanciesAlert /> :
            <TotalProgress />
        }
      </Stack>
    </>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SettingsProvider>
      <ScrapperProvider>
        <SidePanel />
      </ScrapperProvider>
    </SettingsProvider>
  </StrictMode>
)
