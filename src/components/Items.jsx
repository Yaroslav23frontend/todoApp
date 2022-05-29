import React, { useMemo } from "react";
import FormGroup from "@mui/material/FormGroup";
import Item from "./item";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
export default function Items({ filter, completed, search, searchData }) {
  const styles = {
    formGroup: {
      width: "95%",
    },
    text: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      textAlign: "center",
    },
  };
  let data = useSelector((state) => state.items);
  console.log(data);
  const filteredData = useMemo(() => {
    if (filter) {
      data = data.filter((el) => el.completed === completed);
    }
    if (search) {
      data = data.filter((el) => el.item.includes(searchData));
    }
    return data;
  }, [searchData, completed, data]);

  // if (filter) {
  //   return (
  //     <FormGroup sx={styles.formGroup}>
  //       {data.length === 0 ? (
  //         <Typography sx={styles.text} variant="h6" component="h2">
  //           You don't have any tasks yet
  //         </Typography>
  //       ) : (
  //         <>
  //           {data
  //             ?.filter((el) => el.completed === completed)
  //             .map((el) => {
  //               return <Item key={el.id} data={el} id={el.id} />;
  //             })}
  //         </>
  //       )}
  //     </FormGroup>
  //   );
  // }
  return (
    <FormGroup sx={styles.formGroup}>
      {data.length === 0 ? (
        <Typography sx={styles.text} variant="h6" component="h2">
          You don't have any tasks yet
        </Typography>
      ) : (
        <>
          {filteredData?.map((el) => {
            return <Item key={el.id} data={el} id={el.id} />;
          })}
        </>
      )}
    </FormGroup>
  );
}
