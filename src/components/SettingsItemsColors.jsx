import React from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
export default function SettingsItemsColors({ label, value, setValue, id }) {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 150,
      },
    },
  };
  return (
    <Box sx={styles.box}>
      <Typography sx={styles.text}>{id}</Typography>
      <FormControl variant="standard" sx={styles.select}>
        <InputLabel id={id}>{value}</InputLabel>
        <Select
          sx={styles.selectList}
          labelId={id}
          id={id}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          label={label}
          MenuProps={MenuProps}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"black"}>black</MenuItem>
          <MenuItem value={"white"}>white</MenuItem>
          <MenuItem value={"gray"}>gray</MenuItem>
          <MenuItem value={"red"}>red</MenuItem>
          <MenuItem value={"orange"}>orange</MenuItem>
          <MenuItem value={"yellow"}>yellow</MenuItem>
          <MenuItem value={"green"}>green</MenuItem>
          <MenuItem value={"azure"}>azure</MenuItem>
          <MenuItem value={"navy"}>navy</MenuItem>
          <MenuItem value={"purple"}>purple</MenuItem>
          <MenuItem value={"pink"}>pink</MenuItem>
          <MenuItem value={"brown"}>brown</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
const styles = {
  box: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "baseline",
    gap: "20px",
  },
  select: {
    minWidth: 120,
    marginLeft: 5.5,
    maxHeight: 100,
  },
  selectList: {
    maxHeight: 100,
  },
  text: {
    width: 150,
  },
};
