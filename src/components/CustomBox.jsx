import { createStyles, makeStyles } from "@mui/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    scroll: {
      width: "95%",
      maxHeight: "calc(100vh - 340px)",
      overflowY: "auto",
      marginTop: 10,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      "&::-webkit-scrollbar": {
        width: "0.4em",
      },
      "&::-webkit-scrollbar-track": {
        boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
        webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "rgba(0,0,0,.1)",
        outline: "1px solid slategrey",
      },
    },
  })
);

const theme = createTheme();

export default function CustomBox({ children, maxHeight }) {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.scroll} style={{ maxHeight: maxHeight }}>
        {children}
      </div>
    </ThemeProvider>
  );
}
