import React, { ReactNode } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import {
  Box,
  Button,
  Card,
  CssBaseline,
  FormGroup,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import { Router } from "../types/router";

interface RouterFormProps {
  initialValues: Partial<Router>;
  onSubmit: (
    values: Partial<Router>,
    formikHelpers: FormikHelpers<any>
  ) => void | Promise<any>;
  children?: ReactNode;
}

const MuiCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "flex-start",
  width: "100%",
  padding: theme.spacing(2),
  gap: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    width: "60vh",
    height: "60vh",
  },
}));

export const SignInContainer = styled(Stack)(({ theme }) => ({
  minHeight: "100%",
  padding: theme.spacing(1),
}));

const RouterForm: React.FC<RouterFormProps> = ({
  initialValues,
  onSubmit,
  children,
}) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
  });

  return (
    <React.Fragment>
      <CssBaseline />
      <SignInContainer direction="column">
        <MuiCard variant="outlined">
          <Typography variant="h5" sx={{ width: "100%" }}>
            Edit Router
          </Typography>

          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            <Form>
              <Box
                sx={{
                  mt: 2,
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  height: "100%",
                  gap: 2,
                }}
              >
                <FormGroup>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <label htmlFor="name">Name: </label>
                    <Field
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Name"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="name"
                      className="d-block 
                                invalid-feedback"
                      component="span"
                    />
                  </Box>
                </FormGroup>

                <FormGroup>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <label htmlFor="type">Type: </label>

                    <Field as="select" name="type" className="form-control">
                      <option value="wifi">wifi</option>
                      <option value="enterprise">enterprise</option>
                      <option value="home">home</option>
                    </Field>

                    <ErrorMessage
                      name="name"
                      className="d-block 
                                invalid-feedback"
                      component="span"
                    />
                  </Box>
                </FormGroup>
              </Box>

              <Button
                variant="contained"
                type="submit"
                sx={{ mt: 4, width: "80%" }}
              >
                {children}
              </Button>
            </Form>
          </Formik>
        </MuiCard>
      </SignInContainer>
    </React.Fragment>
  );
};

export default RouterForm;
