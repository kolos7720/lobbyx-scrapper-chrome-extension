import { Button } from "@mui/material";
import useSettingsContext from "../../context/settings/useSettingsContext.ts";
import useScrapperContext from "../../context/scrapper/useScrapperContext.ts";

export default function StartButton() {
  const { vacanciesURLsList } = useSettingsContext();
  const { isScrapping, start } = useScrapperContext();

  const disabled = vacanciesURLsList.length === 0 || isScrapping;

  return (
    <Button
      variant="contained"
      disabled={disabled}
      onClick={start}
    >
      Start
    </Button>
  )
}