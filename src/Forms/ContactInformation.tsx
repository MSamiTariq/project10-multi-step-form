import React, { FC, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Grid, TextField, Button } from "@material-ui/core";
import * as Yup from "yup";
import TextError from "./TextError";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

interface Props {
  submit: React.Dispatch<React.SetStateAction<number>>;
  setFormValues: React.Dispatch<React.SetStateAction<{}>>;
  prevValues: any;
}

interface accountInfo {
  emailID: string;
  userName: string;
  password: string;
  confirmPassword: string;
}




const validationSchema = Yup.object({
  emailID: Yup.string().required("Required").email("Invalid Email"),
  userName: Yup.string().required("Required"),
  password: Yup.string()
    .required("Required")
    .min(6, "Password is too shot")
    .max(15, "Password is to long"),
  confirmPassword: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("password")], "Password is not matching"),
});

const AccountInformation: FC<Props> = ({
  submit,
  setFormValues,
  prevValues,
}) => {

const [showPassword, setShowPassword] = React.useState<boolean>(false);


  return (
    <Formik
      initialValues={prevValues}
      validationSchema={validationSchema}
      onSubmit={(values: accountInfo) => {
        setFormValues({ ...values, ...prevValues });
        submit(2);
      }}
    >
      {(formik) => {
        return (
          <Form className="form_Content" autoComplete = 'off'>
            <h1>Account Information</h1>
            <Grid container spacing={3} justify="center">
              <Grid item sm={8} xs={10}>
                <Field
                  name="emailID"
                  as={TextField}
                  label="E-mail ID"
                  variant="outlined"
                  helperText={
                    <ErrorMessage name="emailID" component={TextError} />
                  }
                  fullWidth
                />
              </Grid>

              <Grid item sm={8} xs={10}>
                <Field
                  name="userName"
                  as={TextField}
                  label="User Name"
                  variant="outlined"
                  helperText={
                    <ErrorMessage name="userName" component={TextError} />
                  }
                  fullWidth
                />
              </Grid>

              <Grid item sm={8} xs={10}>
                <Field
                  name="password"
                  as={TextField}
                  label="Password"
                  variant="outlined"
                  type = {showPassword? "text" : "password"}
                  helperText={
                    <ErrorMessage name="password" component={TextError} />
                  }
                  fullWidth
                />
                <button onClick={(e) =>{
                  e.preventDefault();
                  setShowPassword(!showPassword)}}>{showPassword ? <VisibilityOff /> : <Visibility />}</button>
              </Grid>

              <Grid item sm={8} xs={10}>
                <Field
                  name="confirmPassword"
                  as={TextField}
                  label="Confirm Password"
                  variant="outlined"
                  type = {showPassword? "text" : "password"}
                  helperText={
                    <ErrorMessage
                      name="confirmPassword"
                      component={TextError}
                    />
                  }
                  fullWidth
                />
              </Grid>
            </Grid>
            <div className= 'buttons'>
              <Button
                variant="contained"
                color="primary"
                onClick={() => submit(0)}
              >
                Back
              </Button>
              <Button variant="contained" color="primary" type="submit">
                Next
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AccountInformation;
