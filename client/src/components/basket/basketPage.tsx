import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useStoreContext } from "../../app/context/StroeContext";

const BaseUrl = import.meta.env.VITE_API_URL;
import { Box, Button, Grid } from "@mui/material";
import { currencyFormat } from "../../app/utility/uitl";
import { LoadingButton } from "@mui/lab";
import { Add, Delete, Remove } from "@mui/icons-material";
import agent from "../../app/api/agent";
import BasketSummary from "./basketSummary";
import { Link } from "react-router-dom";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const BasketPage = () => {
  const { basket, setBasket, removeItem } = useStoreContext();

  const [status, setStatus] = useState({
    loading: false,
    name: "",
  });

  function handleRemoveItem(
    productId: number,
    name: string,
    quantity: number = 1
  ) {
    setStatus({ loading: true, name });
    agent.Basket.removeBasket(productId, quantity)
      .then(() => removeItem(productId, quantity))
      .catch((error) => console.log(error))
      .finally(() => setStatus({ loading: false, name: "" }));
  }

  function handleAddItem(productId: number, name: string) {
    setStatus({ loading: true, name });
    agent.Basket.addBasket(productId)
      .then((basket) => setBasket(basket))
      .catch((error) => console.log(error))
      .finally(() => setStatus({ loading: false, name: "" }));
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Subtotal</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket &&
              basket.items.map((item, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Box display="flex" alignItems="center">
                      <img
                        src={BaseUrl + item.pictureUrl}
                        style={{
                          width: "80px",
                          height: "80px",
                          padding: "5px",
                          objectFit: "cover",
                        }}
                        alt={item.name}
                      />
                      {item.name}
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    {currencyFormat(item.price)}
                  </TableCell>
                  <TableCell align="center">
                    <LoadingButton
                      loading={
                        status.loading &&
                        status.name === "rem" + item.productId.toString()
                      }
                      onClick={() =>
                        handleRemoveItem(
                          item.productId,
                          "rem" + item.productId.toString()
                        )
                      }
                    >
                      <Remove />
                    </LoadingButton>
                    {item.quantity}
                    <LoadingButton
                      loading={
                        status.loading &&
                        status.name === "add" + item.productId.toString()
                      }
                      onClick={() =>
                        handleAddItem(
                          item.productId,
                          "add" + item.productId.toString()
                        )
                      }
                    >
                      <Add />
                    </LoadingButton>
                  </TableCell>
                  <TableCell align="right">
                    {currencyFormat(item.quantity * item.price)}
                  </TableCell>
                  <TableCell align="right">
                    <LoadingButton
                      loading={
                        status.loading &&
                        status.name === "del" + item.productId.toString()
                      }
                      onClick={() =>
                        handleRemoveItem(
                          item.productId,
                          "del" + item.productId.toString(),
                          item.quantity
                        )
                      }
                    >
                      <Delete />
                    </LoadingButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <BasketSummary />
          <Button
            component={Link}
            to="/checkout"
            variant="contained"
            size="large"
            fullWidth
          >
            Checkout
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default BasketPage;
