import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";

import {history} from "../../main";

const ServerError = () => {
  const { state } = useLocation();

  const json = JSON.stringify(state);

  const obj = JSON.parse(json);

  return (
    <Container component={Paper}>
      {obj ? (
        <>
          <Typography variant="h3" color="error" gutterBottom>
            {obj.state.title}
          </Typography>
          <Divider />
          <Typography>
            {obj.state.detail || "Internal server error"}
          </Typography>
        </>
      ) : (
        <Typography variant="h5" gutterBottom>
          {obj.state.title}
        </Typography>
      )}
      <Button onClick={() => history.push("/catalog")}>
        Go back to the store
      </Button>
    </Container>
  );
};

export default ServerError;
