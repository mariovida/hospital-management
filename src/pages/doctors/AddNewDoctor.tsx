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
import ArrowLeft from "@src/icons/arrow-left";

import SuccessModal from "@src/components/modal";
import { paths } from "@src/paths";
import { Seo } from "@src/components/seo";
import { useAppDispatch } from "@src/hooks/use-dispatch";
import { addNewDoctor } from "@src/store/slices/doctorsSlice";

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

interface AddDoctorFormValues {
  first_name: string;
  last_name: string;
  gender: string;
  date_of_birth: string;
  type: string;
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
    type: Yup.string().required("Required field"),
  });

  const formik = useFormik<AddDoctorFormValues>({
    initialValues: {
      first_name: "",
      last_name: "",
      gender: "",
      date_of_birth: "",
      type: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const errors = await formik.validateForm();
      if (Object.keys(errors).length === 0) {
        try {
          await dispatch(addNewDoctor(values));
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

  const typeOptions = [
    { label: "Anesthesiology", value: "Anesthesiology" },
    { label: "Cardiology", value: "Cardiology" },
    { label: "Dermatology", value: "Dermatology" },
    { label: "Family medicine", value: "Family medicine" },
    { label: "Gastroenterology", value: "Gastroenterology" },
    { label: "Oncology", value: "Oncology" },
    { label: "Ophthalmology", value: "Ophthalmology" },
    { label: "Otolaryngology", value: "Otolaryngology" },
    { label: "Pediatrics", value: "Pediatrics" },
    { label: "Radiology", value: "Radiology" },
    { label: "Urology", value: "Urology" },
  ];

  return (
    <>
      <Seo title="" />
      <Box component="main" paddingTop="42px" flexGrow="1">
        <Container maxWidth="xl">
          <Grid container>
            <Grid xs={12}>
              <BackButton>
                <Box component={Link} to={paths.doctors}>
                  <ArrowLeft />
                  Doctors
                </Box>
              </BackButton>
            </Grid>
            <Grid xs={12}>
              <TitleStack direction="row" justifyContent="space-between">
                <div>
                  <Typography variant="h4">Add new</Typography>
                </div>
              </TitleStack>
            </Grid>
            <SuccessModal
              open={openModal}
              onConfirm={handleCloseModal}
              text="New doctor added successfully."
              modalTitle="Success"
            />
            <Grid xs={12}>
              <CustomCard>
                <CardContent sx={{ padding: "0 !important" }}>
                  <form onSubmit={formik.handleSubmit}>
                    <Typography variant="h5" sx={{ marginBottom: "24px" }}>
                      Doctor information
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
                      <Grid xs={12} md={6}>
                        <CustomSelectField
                          formik={formik}
                          name="type"
                          label="Type"
                          options={typeOptions}
                          defaultOptionLabel="Type"
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
