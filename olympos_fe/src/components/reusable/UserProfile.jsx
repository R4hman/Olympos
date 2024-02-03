import { Box } from "@mui/material";
import { CustomContainer, FlexBetween } from "../../theme";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState } from "react";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function UserProfile({ tabsData, children }) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <CustomContainer
      sx={{ width: "100%  !important", padding: "0 !important" }}
    >
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              {tabsData?.map((tab, index) => (
                <Tab
                  key={index}
                  sx={{ textTransform: "Capitalize" }}
                  label={tab.label}
                  {...a11yProps(index)}
                />
              ))}
            </Tabs>
          </Box>
          {children}
        </Box>
        {tabsData.map((tab, index) => (
          <CustomTabPanel key={index} value={value} index={index}>
            {tab.content}
          </CustomTabPanel>
        ))}
      </Box>
    </CustomContainer>
  );
}

export default UserProfile;
