import { IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import useSettingsContext from "../../context/settings/useSettingsContext.ts";

export default function SettingsButton() {
  const { openSettingsPage } = useSettingsContext();

  return (
    <IconButton onClick={openSettingsPage}>
      <SettingsIcon />
    </IconButton>
  )
}