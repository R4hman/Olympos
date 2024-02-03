import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useTheme } from "@emotion/react";

export default function SelectComponent({ list, onChange, value }) {
  const modeTheme = useTheme();
  const isDarkMode = modeTheme.palette.mode === "dark";
  return (
    <FormControl
      sx={{
        m: 1,
        width: { xs: 300, sm: 300 },
        border: isDarkMode ? "1px solid #D3D3D3" : null,
        borderRadius: isDarkMode ? "2px" : null,
      }}
    >
      <InputLabel
        sx={{
          color: isDarkMode ? "#D1D1D1" : "null",
        }}
        id="demo-simple-select-label"
      >
        Şəhər seç
      </InputLabel>
      <Select
        label="Şəhər seç"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
      >
        {[...new Set(list)].map((l, i) => (
          <MenuItem value={l} key={l + i}>
            {l}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
