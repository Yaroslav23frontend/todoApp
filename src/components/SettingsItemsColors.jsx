import React from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useTranslation } from "react-i18next";
export default function SettingsItemsColors({ label, value, setValue, id }) {
  const { t } = useTranslation();
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
          <MenuItem value={"black"}>{t("colors.black")}</MenuItem>
          <MenuItem value={"white"}>{t("colors.white")}</MenuItem>
          <MenuItem value={"gray"}>{t("colors.gray")}</MenuItem>
          <MenuItem value={"red"}>{t("colors.red")}</MenuItem>
          <MenuItem value={"orange"}>{t("colors.orange")}</MenuItem>
          <MenuItem value={"yellow"}>{t("colors.yellow")}</MenuItem>
          <MenuItem value={"green"}>{t("colors.green")}</MenuItem>
          <MenuItem value={"azure"}>{t("colors.azure")}</MenuItem>
          <MenuItem value={"navy"}>{t("colors.navy")}</MenuItem>
          <MenuItem value={"purple"}>{t("colors.purple")}</MenuItem>
          <MenuItem value={"pink"}>{t("colors.pink")}</MenuItem>
          <MenuItem value={"brown"}>{t("colors.brown")}</MenuItem>
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
