import { useEffect, useState } from "react";
import { getProperties, sorter } from "../services/api.service";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { useCont } from "../context/appContext";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function RealEstate() {
  const [sort, setSort] = useState<sorter>("ASC");
  const [roomNum, setRoomNum] = useState<number | null>(null);
  const [address, setAddress] = useState<string>("");
  const appContext = useCont();

  const handleChange = (event: SelectChangeEvent) => {
    setSort(event.target.value as sorter);
  };

  useEffect(() => {
    async function fetchProperties() {
      const data = await getProperties(address, roomNum, sort);
      appContext.setPropertiesList(data);
    }
    fetchProperties();
  }, [address, roomNum, sort]);

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
        <TextField
          onChange={(e) => setAddress(e.target.value)}
          label="Search by address"
        />
        <TextField
          onChange={(e) => setRoomNum(+e.target.value)}
          label="Search by num of rooms"
        />
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
      </Box>

      <div className="properties-container">
        {appContext.properties.map((p, i) => {
          return (
            <Card key={i} sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="140"
                image={p.image}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {p.address}
                </Typography>
                <Typography gutterBottom variant="subtitle2" component="div">
                  price: {p.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {`Apartment located in floor ${p.floor} out of ${p.num_floors} floors building, having ${p.elevator} elevator.s, and has ${p.num_rooms} rooms sums up to a ${p.sqm}sqm in total and has ${p.parking} parking slot.s`}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
