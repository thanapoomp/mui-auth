/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { useFormik } from "formik";
import { Grid, Button, Box, Paper } from "@material-ui/core/";
import FormikTextField from "../../Common/components/CustomFormik/FormikTextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Helmet } from "react-helmet";
import * as CONST from "../../../../Constant";
import * as authCrud from "../_redux/authCrud";
import * as swal from "../../Common/components/SweetAlert";

function Changepassword() {

	const useStyle = makeStyles((theme) => ({
		image: {
			width: 100,
			height: 100,
		},
	}));

	const classes = useStyle();

	const formik = useFormik({
		enableReinitialize: true,
		validate: (values) => {
			const errors = {};

			if (!values.oldPassword) {
				errors.oldPassword = "Required";
			}

			if (!values.newPassword) {
				errors.newPassword = "Required"
			}

			if (!values.confirmNewPassword) {
				errors.confirmNewPassword = "Required"
			}

			if (values.newPassword !== values.confirmNewPassword) {
				errors.confirmNewPassword = "Confirm Password Not Match"
			}

			return errors;
		},
		initialValues: {
			oldPassword: "",
			newPassword: "",
			confirmNewPassword: ""
		},
		onSubmit: (values) => {
			//submit ....
			authCrud.changepassword(values.oldPassword, values.oldPassword, values.newPassword, values.confirmNewPassword)
				.then((res) => {

					if (res.data.isSuccess) {
						swal.swalSuccess("Success", `success.`).then((res) => {
							if (res.isConfirmed) {
								let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
								width=300,height=450,left=200,top=200`;
								window.open(CONST.SSO_URL_LOGOUT, "_self", 'logout', params);
							}
						});
					} else {
						swal.swalError("Error", res.data.message);
						formik.setSubmitting(false);
					}
				})
				.catch((err) => {
					//network error
					swal.swalError("Error", err.message);
					formik.setSubmitting(false);
					formik.resetForm();
				});

		},
	});
	return (
		<form onSubmit={formik.handleSubmit}>
			<Helmet>
				<title>Login:{CONST.APP_INFO.name}</title>
			</Helmet>
			<Box display="flex" p={1} bgcolor="background.paper">
				<Grid container spacing={3}>
					{/* logo */}
					<Grid
						container
						item
						xs={12}
						lg={12}
						direction="row"
						justify="center"
						alignItems="center"
					>
						<Paper elevation={0} style={{ marginTop: 60, padding: 5 }}>
							<img
								className={classes.image}
								alt=""
								src={process.env.PUBLIC_URL + "/logo192.png"}
							/>
						</Paper>
					</Grid>

					{/*start old Password */}
					<Grid item xs={12} lg={12}>
						<FormikTextField
							formik={formik}
							name="oldPassword"
							label="Old Password"
							password
						/>
					</Grid>
					{/*end old Password */}

					{/*start new Password */}
					<Grid item xs={12} lg={12}>
						<FormikTextField
							formik={formik}
							name="newPassword"
							label="New Password"
							password
						/>
					</Grid>
					{/*end new Password */}

					{/*start confirm New Password */}
					<Grid item xs={12} lg={12}>
						<FormikTextField
							formik={formik}
							name="confirmNewPassword"
							label="Confirm New Password"
							password
						/>
					</Grid>
					{/*end confirm New Password */}

					<Grid
						item
						container
						xs={12}
						lg={12}
						direction="column"
						justify="center"
						alignItems="center"
					>
						{!formik.isSubmitting && (
							<Button
								type="submit"
								disabled={formik.isSubmitting}
								fullWidth
								color="primary"
								variant="contained"
							>
								Change Password
							</Button>
						)}

						{formik.isSubmitting && <CircularProgress size={24} />}
					</Grid>
				</Grid>
			</Box>
		</form>
	)
}

export default Changepassword
