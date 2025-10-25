import { Alert } from "@mui/material";
import useScrapperContext from "../../context/scrapper/useScrapperContext.ts";

export default function FailedAlert() {
  const { error } = useScrapperContext();

  return (
    <Alert variant="outlined" severity="error">
      { error?.toString() || 'Something went wrong.' }
    </Alert>
  )
}