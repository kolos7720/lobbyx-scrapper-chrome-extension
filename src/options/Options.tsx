import { StrictMode, useCallback } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'

import { Stack, Typography, CssBaseline, CircularProgress } from "@mui/material";
import { Form, Formik } from "formik";
import WebhookInput from "./components/WebhookInput.tsx";
import ListOfVacanciesInput from "./components/ListOfVacanciesInput.tsx";
import SaveButton from "./components/SaveButton.tsx";
import CancelButton from "./components/CancelButton.tsx";
import type { FormikHelpers } from "formik/dist/types";
import type { Settings } from "../types.ts";
import SettingsProvider from "../context/settings/provider.tsx";
import useSettingsContext from "../context/settings/useSettingsContext.ts";

function Options() {
  const { settings, isLoading, setSettings } = useSettingsContext();

  const handleSubmit = useCallback(async (values: Settings, helpers: FormikHelpers<Settings>) => {
    await setSettings(values)

    helpers.resetForm({
      values,
    });
  }, []);

  return (
    <>
      <CssBaseline />
      <Stack spacing={2} padding={3} maxWidth={768}>
        <Typography variant="h5">LobbyX Scrapper Options</Typography>
        {
          isLoading ?
            <CircularProgress /> :
            <Formik
              initialValues={settings}
              onSubmit={handleSubmit}
            >
              <Form>
                <Stack spacing={2}>
                  <WebhookInput />
                  <ListOfVacanciesInput />
                  <Stack direction="row" spacing={2} alignSelf="flex-end">
                    <SaveButton />
                    <CancelButton />
                  </Stack>
                </Stack>
              </Form>
            </Formik>
        }
      </Stack>
    </>
  );
}

createRoot(document.getElementById('root')!).render(
  <SettingsProvider>
    <StrictMode>
      <Options />
    </StrictMode>
  </SettingsProvider>
)
