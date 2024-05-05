import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import React, { useState, useEffect } from "react";
import { addToCart, removeFromCart } from "redux/productSlice";

const Cart = () => {
  const { cart } = useAppSelector((state: any) => state.productStore);
  const [eCart, seteCart] = useState([]);
  const apiHost = process.env.REACT_APP_API_HOST;

  useEffect(() => {
    seteCart(
      cart
        .map((c: any) => {
          //this will add a quantity property in the product JSON
          return {
            ...c,
            quantity: cart.filter((f: any) => f._id === c._id).length,
          };
        })
        .filter((v: any, i: any, s: any) => {
          // This will remove the duplicate value from the array
          return i === s.findIndex((t: any) => t._id === v._id);
        })
        .map((fc: any) => {
          // This will calculate the total price i.e. price * quantity
          return { ...fc, price: fc.quantity * fc.price };
        })
    );
  }, [cart]);

  const total = eCart.reduce(
    (partialSum: any, a: any) => partialSum + a.price,
    0
  );
  const dispatch = useAppDispatch();

  const increaseQuantity = (product: any) => {
    dispatch(addToCart(product));
  };

  const decreseQuantity = (product: any) => {
    dispatch(removeFromCart(product));
  };
  return (
    <div className="cart">
      <TableContainer component={Paper}>
        <h4>Total Price: {total} DKK </h4>
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={total === 0}
        >
          Proceed to payment
        </Button>
        <Table
          sx={{ minWidth: 200 }}
          aria-label="simple table"
          style={{ textAlign: "center" }}
        >
          <TableHead>
            <TableRow>
              <TableCell align="right">Image</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {eCart &&
              eCart.map((c: any, index: number) => (
                <TableRow key={index}>
                  <TableCell align="right">
                    <img
                      style={{ width: "60px", height: "60px" }}
                      src={apiHost + "/product/image/" + c.image}
                      alt="product"
                    />
                  </TableCell>
                  <TableCell align="right">{c.name}</TableCell>
                  <TableCell align="right">{c.price} DKK</TableCell>
                  <TableCell align="right">
                    <button onClick={() => increaseQuantity(c)}>+</button>
                    {c.quantity}
                    <button onClick={() => decreseQuantity(c)}>-</button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Cart;
