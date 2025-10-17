import { Stack } from "@mui/material";
import StartButton from "./start-button.tsx";
// import TotalProgress from "./total-progress.tsx";

export default function ScrapperTab() {
  return (
    <Stack spacing={2}>
      <StartButton />
      {/*<TotalProgress />*/}
    </Stack>
  )
}