import { Alert, AlertTitle, Button, ButtonGroup, Container, List, ListItem, ListItemText } from "@mui/material";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import agent from "../../app/api/agent";

const AboutPage = () => {
  const notify = () => toast("Wow so easy!");

  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  function getValidationError() {
    agent.TestError.getValidationError()
      .then(() => console.log("should not see this"))
      .catch((error) => setValidationErrors(error));
  }

  return (
    <Container>
      <ButtonGroup variant="contained" fullWidth>
        <Button onClick={() => agent.TestError.get400Error()}>400</Button>
        <Button onClick={() => agent.TestError.get401Error()}>401</Button>
        <Button onClick={() => agent.TestError.get404Error()}>404</Button>
        <Button onClick={() => agent.TestError.get500Error()}>500</Button>
        <Button onClick={getValidationError}>
          Get Validate Error
        </Button>
      </ButtonGroup>
      {validationErrors.length > 0 && (
        <Alert severity="error">
          <AlertTitle>Validation Errors</AlertTitle>
          <List>
            {validationErrors.map((error) => (
              <ListItem key={error}>
                <ListItemText>{error}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Alert>
      )}
    </Container>
  );
};

export default AboutPage;
