import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Stack, CssBaseline, Box } from "@mui/material";
import '../index.css'

import StartButton from "./components/StartButton.tsx";
import TotalProgress from "./components/TotalProgress.tsx";
import SettingsProvider from "../context/settings/provider.tsx";
import NoVacanciesAlert from "./components/NoVacanciesAlert.tsx";
import useSettingsContext from "../context/settings/useSettingsContext.ts";
import ScrapperProvider from "../context/scrapper/provider.tsx";
import SettingsButton from "./components/SettingsButton.tsx";
import useScrapperContext from "../context/scrapper/useScrapperContext.ts";
import FailedAlert from "./components/FailedAlert.tsx";

function SidePanel() {
  const { vacanciesURLsList } = useSettingsContext();
  const { isFailed } = useScrapperContext();

  const isVacanciesListEmpty = vacanciesURLsList.length === 0;

  return (
    <>
      <CssBaseline />
      <Stack spacing={2} padding={3}>
        <Box sx={{ position: 'absolute', top: 0, right: 0 }}>
          <SettingsButton />
        </Box>
        <StartButton />
        {
          isVacanciesListEmpty ?
            <NoVacanciesAlert /> :
            <TotalProgress />
        }
        {
          isFailed && <FailedAlert />
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
