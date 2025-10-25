import { Box, LinearProgress, Typography } from "@mui/material";
import useSettingsContext from "../../context/settings/useSettingsContext.ts";
import useScrapperContext from "../../context/scrapper/useScrapperContext.ts";

export default function TotalProgress() {
  const { vacanciesURLsList } = useSettingsContext();
  const { currentVacancyIndex } = useScrapperContext();

  const total = vacanciesURLsList.length;
  const current = currentVacancyIndex;

  const percent = (current / total) * 100;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" value={percent} />
      </Box>
      <Box>
        <Typography
          variant="body2"
          sx={{ color: 'text.secondary' }}
        >{`${current}/${total}`}</Typography>
      </Box>
    </Box>
  );
}