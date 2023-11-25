import React, { useState } from "react";
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

import SuccessModal from "@src/components/modal";
import { Seo } from "@src/components/seo";
import { useAppDispatch } from "@src/hooks/use-dispatch";
import { addNewPatient } from "@src/store/slices/patientsSlice";

import styled from "@emotion/styled";
import customColors from "@src/theme/colors";

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

  return (
    <>
      <Seo title="" />
      <Box component="main" paddingTop="42px" flexGrow="1">
        <Container maxWidth="xl">
          <Grid container>
            <Grid xs={12}>
              <TitleStack direction="row" justifyContent="space-between">
                <div>
                  <Typography variant="h4">Add new</Typography>
                </div>
              </TitleStack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Page;
