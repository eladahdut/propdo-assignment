import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { Button } from "@mui/material";
import { useCont } from "../../context/appContext";
import { getProperties, sorter } from "../../services/api.service";
import { useEffect, useRef } from "react";
import { debounce } from "lodash";

export default function RealEstateInputs() {
  const appContext = useCont();
  const searchRef = useRef();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value !== appContext.searchValue) {
      appContext.setSearchValue(e.target.value);
    }
  };

  const handleChangeRoomNum = (event: SelectChangeEvent) => {
    appContext.setNumOfRooms(+event.target.value);
  };

  const handleChangeSort = (event: SelectChangeEvent) => {
    appContext.setSortValue(event.target.value as sorter);
  };

  const handleReset = () => {
    //@ts-ignore
    searchRef.current.reset();
    appContext.setSearchValue("");
    appContext.setNumOfRooms(null);
    appContext.setSortValue("ASC");
  };

  useEffect(() => {
    async function fetchProperties() {
      const data = await getProperties(
        appContext.searchValue,
        appContext.numOfRooms,
        appContext.sortValue
      );
      appContext.setPropertiesList(data);
    }
    fetchProperties();
  }, [appContext.searchValue, appContext.numOfRooms, appContext.sortValue]);
  return (
    <div>
      <Box
        ref={searchRef}
        component="form"
        sx={{
          "& > :not(style)": { m: 5, width: "25ch" },
        }}
        noValidate
        autoComplete="off">
        <TextField
          defaultValue={appContext.searchValue}
          onChange={debounce(handleSearch, 1000)}
          label="Search by address"
        />
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="select-label">number of rooms</InputLabel>
          <Select
            labelId="select-label"
            value={
              appContext.numOfRooms ? appContext.numOfRooms.toString() : "All"
            }
            label="Sort By Price"
            onChange={handleChangeRoomNum}
            defaultValue={"All"}>
            <MenuItem value={"All"}>All</MenuItem>
            <MenuItem value={2}>2 rooms</MenuItem>
            <MenuItem value={3}>3 rooms</MenuItem>
            <MenuItem value={4}>4 rooms</MenuItem>
            <MenuItem value={5}>5 rooms</MenuItem>
            <MenuItem value={6}>6 rooms</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="select-label">Sort By Price</InputLabel>
          <Select
            labelId="select-label"
            value={appContext.sortValue}
            label="Sort By Price"
            onChange={handleChangeSort}>
            <MenuItem value={"ASC"}>Ascending</MenuItem>
            <MenuItem value={"DES"}>Descending</MenuItem>
          </Select>
        </FormControl>
        <Button onClick={handleReset}>Reset filters</Button>
      </Box>
    </div>
  );
}
