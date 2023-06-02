import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import CustomTextField from "@src/components/text-field";
import CustomSelectField from "@src/components/select-field";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/system/Unstable_Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import ArrowLeft from "@src/icons/arrow-left";

import SuccessModal from "@src/components/modal";
import { Seo } from "@src/components/seo";
import { paths } from "@src/paths";
import { useAppDispatch } from "@src/hooks/use-dispatch";
import { addNewPatient } from "@src/store/slices/patientsSlice";

import styled from "@emotion/styled";
import customColors from "@src/theme/colors";

const BackButton = styled(Button)({
  minWidth: "unset",
  padding: "0",
  marginBottom: "32px",

  "& svg": {
    width: "20px",
    height: "20px",
    marginTop: "4px",
    marginRight: "8px",
  },

  "& a": {
    display: "inline-flex",
    alignItem: "center",
    fontSize: "16px",
    fontWeight: "600",
    textDecoration: "none",
    color: customColors.text.primary,
  },
});

const TitleStack = styled(Stack)({
  marginBottom: "40px",
});

const CustomCard = styled(Card)({
  padding: "24px",
  borderRadius: "10px",
  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
});

const FormGrid = styled(Grid)({
  flexWrap: "nowrap",
  gap: "0 24px",
  marginBottom: "16px",
});

const SubmitButton = styled(Button)({
  backgroundColor: customColors.green.main,
  boxShadow: "none",
  borderRadius: "10px",
  marginTop: "24px",

  "&:hover": {
    backgroundColor: customColors.green.dark,
    boxShadow: "none",
  },
});

interface AddPatientFormValues {
  first_name: string;
  last_name: string;
  gender: string;
  date_of_birth: string;
  oib: string;
  mbo: string;
  address: string;
  city: string;
  country: string;
  email: string;
  phone_number: string;
  subscribed: boolean;
}

const Page = () => {
  const dispatch = useAppDispatch();
  const [openModal, setOpenModal] = useState(false);

  const validationSchema = Yup.object({
    first_name: Yup.string()
      .max(255, "First name is too long")
      .required("Required field"),
    last_name: Yup.string()
      .max(255, "Last name is too long")
      .required("Required field"),
    gender: Yup.string(),
    date_of_birth: Yup.string(),
    oib: Yup.string().max(11, "OIB cannot be longer than 11 characters"),
    mbo: Yup.string()
      .max(9, "MBO cannot be longer than 9 characters")
      .required("Required field"),
    address: Yup.string().required("Required field"),
    city: Yup.string().required("Required field"),
    country: Yup.string().required("Required field"),
    email: Yup.string().required("Required field"),
    phone_number: Yup.string(),
    subscribed: Yup.boolean(),
  });

  const formik = useFormik<AddPatientFormValues>({
    initialValues: {
      first_name: "",
      last_name: "",
      gender: "",
      date_of_birth: "",
      oib: "",
      mbo: "",
      address: "",
      city: "",
      country: "",
      email: "",
      phone_number: "",
      subscribed: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      const errors = await formik.validateForm();
      if (Object.keys(errors).length === 0) {
        try {
          await dispatch(addNewPatient(values));
          setOpenModal(true);
        } catch (error) {
          console.error("Failed", error);
        }
      }
    },
  });

  const handleCloseModal = () => {
    setOpenModal(false);
    window.location.reload();
  };

  const genderOptions = [
    { label: "Male", value: "M" },
    { label: "Female", value: "F" },
  ];

  const countryOptions = [
    { label: "Croatia", value: "Croatia" },
    { label: "Bosnia and Herzegovina", value: "BiH" },
    { label: "Slovenia", value: "Slovenija" },
    { label: "Srbija", value: "Slovenia" },
    { label: "Hungary", value: "Hungary" },
    { label: "Austria", value: "Austria" },
    { label: "Germany", value: "Germany" },
  ];

  return (
    <>
      <Seo title="" />
      <Box component="main" paddingTop="42px" flexGrow="1">
        <Container maxWidth="xl">
          <Grid container>
            <Grid xs={12}>
              <BackButton>
                <Box component={Link} to={paths.patients}>
                  <ArrowLeft />
                  Patients
                </Box>
              </BackButton>
            </Grid>
            <Grid xs={12}>
              <TitleStack direction="row" justifyContent="space-between">
                <div>
                  <Typography variant="h4">Add new patient</Typography>
                </div>
              </TitleStack>
            </Grid>

            <SuccessModal
              open={openModal}
              onConfirm={handleCloseModal}
              text="Novi pacijent je uspješno dodan."
              modalTitle="Uspješan unos"
            />
            <Grid xs={12}>
              <CustomCard>
                <CardContent sx={{ padding: "0 !important" }}>
                  <form onSubmit={formik.handleSubmit}>
                    <Typography variant="h5" sx={{ marginBottom: "24px" }}>
                      Patient information
                    </Typography>
                    <FormGrid container sx={{ gap: "0px !important" }}>
                      <Grid xs={12} md={6} sx={{ paddingRight: "16px" }}>
                        <CustomTextField
                          formik={formik}
                          name="first_name"
                          label="First name"
                          required={true}
                        />
                      </Grid>
                      <Grid xs={12} md={6}>
                        <CustomTextField
                          formik={formik}
                          name="last_name"
                          label="Last name"
                          required={true}
                        />
                      </Grid>
                    </FormGrid>
                    <FormGrid container sx={{ gap: "0px !important" }}>
                      <Grid xs={12} md={3} sx={{ paddingRight: "16px" }}>
                        <CustomSelectField
                          formik={formik}
                          name="gender"
                          label="Gender"
                          options={genderOptions}
                          defaultOptionLabel="Gender"
                        />
                      </Grid>
                      <Grid xs={12} md={3} sx={{ paddingRight: "16px" }}>
                        <CustomTextField
                          formik={formik}
                          name="date_of_birth"
                          label="Date of birth"
                        />
                      </Grid>
                      <Grid xs={12} md={3} sx={{ paddingRight: "16px" }}>
                        <CustomTextField
                          formik={formik}
                          name="oib"
                          label="OIB"
                        />
                      </Grid>
                      <Grid xs={12} md={3}>
                        <CustomTextField
                          formik={formik}
                          name="mbo"
                          label="MBO"
                          required={true}
                        />
                      </Grid>
                    </FormGrid>
                    <Typography
                      variant="h5"
                      sx={{ marginTop: "32px", marginBottom: "24px" }}
                    >
                      Contant information
                    </Typography>
                    <FormGrid container sx={{ gap: "0px !important" }}>
                      <Grid xs={12} md={4} sx={{ paddingRight: "16px" }}>
                        <CustomTextField
                          formik={formik}
                          name="address"
                          label="Address"
                          required={true}
                        />
                      </Grid>
                      <Grid xs={12} md={4} sx={{ paddingRight: "16px" }}>
                        <CustomTextField
                          formik={formik}
                          name="city"
                          label="City"
                          required={true}
                        />
                      </Grid>
                      <Grid xs={12} md={4}>
                        <CustomSelectField
                          formik={formik}
                          name="country"
                          label="Country"
                          options={countryOptions}
                          defaultOptionLabel="COUNTRY"
                        />
                      </Grid>
                    </FormGrid>
                    <FormGrid container sx={{ gap: "0px !important" }}>
                      <Grid xs={12} md={6} sx={{ paddingRight: "16px" }}>
                        <CustomTextField
                          formik={formik}
                          name="email"
                          label="Email adresa"
                          required={true}
                        />
                      </Grid>
                      <Grid xs={12} md={6}>
                        <CustomTextField
                          formik={formik}
                          name="phone_number"
                          label="Phone number"
                        />
                      </Grid>
                    </FormGrid>
                    <FormGrid container>
                      <Grid xs={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={formik.values.subscribed}
                              onChange={formik.handleChange}
                              name="subscribed"
                              color="primary"
                            />
                          }
                          label="Subscription to news, benefits, and discounts"
                        />
                      </Grid>
                    </FormGrid>
                    <FormGrid container>
                      <SubmitButton type="submit" variant="contained">
                        Submit
                      </SubmitButton>
                    </FormGrid>
                  </form>
                </CardContent>
              </CustomCard>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Page;
