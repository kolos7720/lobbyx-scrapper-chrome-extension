import * as React from "react";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import ScrapperTab from "./scrapper";
import SettingsTab from "./settings";

export function Tabs() {
  const [activeTabIndex, setActiveTabIndex] = React.useState(1);

  const handleChange = (_event: React.SyntheticEvent, tabValue: number) => {
    setActiveTabIndex(tabValue);
  };

  const tabs = React.useMemo(() => [
    {
      name: 'Scrapper',
      content: <ScrapperTab/>,
    },
    {
      name: 'Settings',
      content: <SettingsTab/>
    }
  ], []);

  return (
    <TabContext value={activeTabIndex}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList onChange={handleChange}>
          {
            tabs.map((tab, index) => {
              return (
                <Tab
                  label={tab.name}
                  value={index}
                  sx={{
                    flex: 'auto',
                    outline: 'none',
                  }}
                />
              )
            })
          }
        </TabList>
      </Box>
      {
        tabs.map((tab, index) => (
          <TabPanel key={tab.name} value={index}>
            {tab.content}
          </TabPanel>
        ))
      }
    </TabContext>
  );
}