import { Box, LinearProgress, Typography } from "@mui/material";

export default function TotalProgress() {
  const total = 82;
  const value = 12;

  const percent = (value / total) * 100;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" value={percent} />
      </Box>
      <Box>
        <Typography
          variant="body2"
          sx={{ color: 'text.secondary' }}
        >{`${value}/${total}`}</Typography>
      </Box>
    </Box>
  );
}