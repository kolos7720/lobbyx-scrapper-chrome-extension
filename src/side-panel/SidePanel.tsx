import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'

import StartButton from "./components/StartButton.tsx";
import TotalProgress from "./components/TotalProgress.tsx";
import { Stack, CssBaseline } from "@mui/material";

function SidePanel() {
  return (
    <>
      <CssBaseline />
      <Stack spacing={2} padding={3}>
        <StartButton />
        <TotalProgress />
      </Stack>
    </>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SidePanel />
  </StrictMode>,
)
