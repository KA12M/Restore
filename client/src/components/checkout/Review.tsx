import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import BasketTable from "../basket/basketTable";
import { useAppDispatch, useAppSelector } from "../../app/store/store.config";
import BasketSummary from "../basket/basketSummary";
import { Box } from "@mui/material";
  
export default function Review() {
  const { basket } = useAppSelector((state) => state.basket);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>

      <BasketTable items={basket!.items} isBasket={false} />
  
      <Grid container mt={2}>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <BasketSummary />
        </Grid>
      </Grid> 
    </React.Fragment>
  );
}
