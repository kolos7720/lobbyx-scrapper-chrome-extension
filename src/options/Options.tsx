import { StrictMode, useCallback, useMemo } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'

import { Stack, Typography, CssBaseline } from "@mui/material";
import { Form, Formik } from "formik";
import WebhookInput from "./components/WebhookInput.tsx";
import ListOfVacanciesInput from "./components/ListOfVacanciesInput.tsx";
import SaveButton from "./components/SaveButton.tsx";
import CancelButton from "./components/CancelButton.tsx";

function Options() {
  type FormikValues = {
    webHookURL: string;
    vacanciesURLs: string;
  }

  const initialValues: FormikValues = useMemo(() => ({
    webHookURL: '',
    vacanciesURLs: '',
  }), []);

  const handleSubmit = useCallback((values: FormikValues) => {
    console.log(values);
  }, []);

  return (
    <>
      <CssBaseline />
      <Stack spacing={2} padding={3} maxWidth={768}>
        <Typography variant="h5">LobbyX Scrapper Options</Typography>
        <Formik
          initialValues={initialValues}
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
      </Stack>
    </>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Options />
  </StrictMode>,
)
