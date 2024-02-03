import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import { Box } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// const names = ["Breakfast", "Pool", "Parking"];

function getStyles(name, spesifics, theme) {
  return {
    fontWeight:
      spesifics?.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelect({
  spesifics,
  setSpesifics,
  listToMap,
  name,
}) {
  const theme = useTheme();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSpesifics(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <Box sx={{ width: "fit-content" }}>
      <FormControl sx={{ width: 222.4 }}>
        <InputLabel id="demo-multiple-name-label">{name}</InputLabel>
        <Select
          // defaultValue={spesifics}
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={spesifics}
          onChange={handleChange}
          input={<OutlinedInput label={name} />}
          MenuProps={MenuProps}
        >
          {listToMap?.map((list) => {
            return (
              <MenuItem
                key={list}
                value={list}
                style={getStyles(list, spesifics, theme)}
              >
                {list}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
