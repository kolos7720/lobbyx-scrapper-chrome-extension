import { Button } from "@mui/material";
import useSettingsContext from "../../context/settings/useSettingsContext.ts";

export default function StartButton() {
  const { vacanciesURLsList } = useSettingsContext();

  const disabled = vacanciesURLsList.length === 0;

  return (
    <Button
      variant="contained"
      disabled={disabled}
    >
      Start
    </Button>
  )
}