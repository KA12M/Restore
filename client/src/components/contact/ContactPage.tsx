import React from "react";
import { ButtonGroup, Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from '../../app/store/store.config';
import { decrement, increment } from "../../app/store/couter.slice";

const ContactPage = () => {
  const dispatch = useAppDispatch();
  const {num} = useAppSelector(state => state.counter);

  return (
    <> 
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
      >
        <Button onClick={() => dispatch(decrement())}>-</Button>
        <Button>{num}</Button>
        <Button onClick={() => dispatch(increment(5))}>+</Button>
      </ButtonGroup>
    </>
  );
};

export default ContactPage;
