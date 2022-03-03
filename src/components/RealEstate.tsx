import { useEffect, useState } from "react";
import { getProperties, sorter } from "../services/api.service";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import { useCont } from "../context/appContext";

export default function RealEstate() {
  //   const [data, setData] = useState<IProperty | null>(null);
  const [sort, setSort] = useState<sorter>("ASC");
  const appContext = useCont();

  const handleChange = (event: SelectChangeEvent) => {
    setSort(event.target.value as sorter);
  };

  useEffect(() => {
    async function fetchProperties() {
      const data = await getProperties("", null, "DES");
      console.log(data);
      appContext.setPropertiesList(data);
      console.log(appContext.properties);
    }
    fetchProperties();
  }, [appContext.properties]);

  return (
    <div className="main-container">
      <div className="header">
        <h1>Propdo Home Assignment</h1>
      </div>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 5, width: "25ch" },
        }}
        noValidate
        autoComplete="off">
        <TextField label="Search by address" />
        <TextField label="Search by num of rooms" />
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="select-label">Sort By Price</InputLabel>
          <Select
            labelId="select-label"
            value={sort}
            label="Sort By Price"
            onChange={handleChange}>
            <MenuItem value={"ASC"}>Ascending</MenuItem>
            <MenuItem value={"DES"}>Descending</MenuItem>
          </Select>
        </FormControl>
        <Button color="secondary" size="large" variant="outlined">
          Search!
        </Button>
      </Box>

      <div className="properties-container">
        text
        {appContext.properties.map((p, i) => {
          console.log(p);
          return <div>{i}</div>;
        })}
      </div>
    </div>
    // data && (
    //   <div>
    //     <img src={data.image} alt="" />
    //   </div>
    // )
  );
}
