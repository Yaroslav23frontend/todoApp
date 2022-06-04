import React, { useMemo } from "react";
import FormGroup from "@mui/material/FormGroup";
import Item from "./item";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
export default function Items({
  completed,
  search,
  searchData,
  filterDate,
  sort,
  boardName,
  loading,
  error,
}) {
  const { t } = useTranslation();
  const styles = {
    formGroup: {
      width: "calc(100% )",
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
    if (typeof completed == "boolean") {
      const filter = [...data.filter((el) => el.completed === completed)];
      return filter;
    }
    if (search) {
      const search = data.filter((el) => el.item.includes(searchData));
      return search;
    }

    if (sort === "A to Z") {
      const sorted = data.sort((a, b) => {
        return a.days - b.days;
      });
      return sorted;
    }
    if (sort === "Z to A") {
      const sorted = data.sort((a, b) => {
        return b.days - a.days;
      });
      return sorted;
    }
    return data;
  }, [searchData, completed, data, sort]);
  const filterdByDate = useMemo(() => {
    if (filterDate !== "") {
      const filter = [
        ...filteredData.filter((el) => {
          console.log(filterDate);
          if (filterDate === "Today") {
            return el.days === 0;
          }
          if (filterDate === "Overdue") {
            return el.days < 0;
          }
          if (filterDate === "Upcoming") {
            return el.days > 0 && el.days <= 5;
          }
        }),
      ];
      return filter;
    }
    return filteredData;
  }, [filterDate, filteredData]);

  if (loading === false) {
    return (
      <FormGroup sx={styles.formGroup}>
        {data.length === 0 ? (
          <Typography sx={styles.text} variant="h6" component="h2">
            {error ? error : t("messagesItems.noTasks")}
          </Typography>
        ) : (
          <>
            {filterdByDate?.map((el, id) => {
              return (
                <Item
                  key={el.id}
                  data={el}
                  id={el.id}
                  listId={id}
                  boardName={boardName}
                />
              );
            })}
          </>
        )}
      </FormGroup>
    );
  }
  return <></>;
}
