import React, { FC } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Grid, TextField, Button } from "@material-ui/core";
import * as Yup from "yup";
import TextError from "./TextError";

interface Props {
	submit: React.Dispatch<React.SetStateAction<number>>;
	setFormValues: React.Dispatch<React.SetStateAction<{}>>;
	prevValues: any;
}

interface personalInfo {
	firstName: string;
	lastName: string;
	fatherName: string;
	city: string;
	age: number;
	phoneNumber: number;
}

const validationSchema = Yup.object({
	firstName: Yup.string().required("Required"),
	lastName: Yup.string().required("Required"),
	fatherName: Yup.string().required("Required"),
	city: Yup.string().required("Required"),
	age: Yup.number()
		.required("Required")
		.moreThan(15, "Age Must br Greater than 15")
		.lessThan(70, "Age Must br Less than 15"),
	phoneNumber: Yup.string()
		.required("Required")
		.min(10, "Minimum of 11 numbers")
		.max(13, "Maximum of 11 numbers"),
});

const PersonalInformation: FC<Props> = ({
	submit,
	setFormValues,
	prevValues,
}) => {
	return (
		<Formik
			initialValues={prevValues}
			validationSchema={validationSchema}
			onSubmit={(values: personalInfo) => {
				submit(1);
				setFormValues({ ...values });
			}}
		>
			{(formik) => {
				return (
					<Form className="form_Content">
						<h1>Personal Information</h1>
						<Grid container spacing={3} justify="center">
							<Grid item sm={4} xs={5}>
								<Field
									name="firstName"
									as={TextField}
									label="First Name"
									variant="outlined"
									helperText={
										<ErrorMessage name="firstName" component={TextError} />
									}
									fullWidth
								/>
							</Grid>

							<Grid item sm={4} xs={5}>
								<Field
									name="lastName"
									as={TextField}
									label="Last Name"
									variant="outlined"
									helperText={
										<ErrorMessage name="lastName" component={TextError} />
									}
									fullWidth
								/>
							</Grid>

							<Grid item sm={8} xs={10}>
								<Field
									name="fatherName"
									as={TextField}
									label="Father Name"
									variant="outlined"
									helperText={
										<ErrorMessage name="fatherName" component={TextError} />
									}
									fullWidth
								/>
							</Grid>

							<Grid item sm={8} xs={10}>
								<Field
									name="city"
									as={TextField}
									label="City"
									variant="outlined"
									helperText={
										<ErrorMessage name="city" component={TextError} />
									}
									fullWidth
								/>
							</Grid>

							<Grid item sm={8} xs={10}>
								<Field
									name="age"
									as={TextField}
									label="Age"
									type="number"
									variant="outlined"
									helperText={<ErrorMessage name="age" component={TextError} />}
									fullWidth
								/>
							</Grid>

							<Grid item sm={8} xs={10}>
								<Field
									name="phoneNumber"
									as={TextField}
									label="Phone Number"
									type="number"
									variant="outlined"
									helperText={
										<ErrorMessage name="phoneNumber" component={TextError} />
									}
									fullWidth
								/>
							</Grid>
						</Grid>
						<div className="buttons">
							<Button variant="contained" color="primary" disabled>
								Back
							</Button>
							<Button
								variant="contained"
								color="primary"
								type="submit"
								disabled={!formik.dirty}
							>
								Next
							</Button>
						</div>
					</Form>
				);
			}}
		</Formik>
	);
};

export default PersonalInformation;
