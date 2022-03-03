import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useCont } from "../../context/appContext";

export default function RealEstateList() {
  const appContext = useCont();

  return (
    <div className="properties-container">
      {appContext.properties.length ? (
        appContext.properties.map((p, i) => {
          return (
            <Card key={i} sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="140"
                image={p.image}
                alt="property image"
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
        })
      ) : (
        <div className="empty-container">
          <h3>No Matching Results</h3>
        </div>
      )}
    </div>
  );
}
