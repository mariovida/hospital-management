import * as React from "react";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useAppDispatch } from "@src/hooks/use-dispatch";
import { useFormik } from "formik";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/system/Unstable_Grid";

import { Seo } from "@src/components/seo";
import { registerUser } from "@src/store/slices/usersSlice";
import styled from "@emotion/styled";
import customColors from "@src/theme/colors";

const FormCard = styled(CardContent)({
  maxWidth: "600px",
  width: "100%",
  justifyContent: "center",
  padding: "0",
  color: customColors.primary.darkest,

  "& form": {
    width: "100%",

    "& input:focused": {
      border: "3px solid red !important",
    },

    "& button": {
      marginTop: "60px",
      color: customColors.info.contrastText,
      backgroundColor: customColors.primary.main,

      "&:hover": {
        backgroundColor: customColors.primary.dark,
      },
    },
  },
});

const SubmitButton = styled(Button)`
  margin-top: 1.5rem;
`;

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required("Required"),
  last_name: Yup.string().required("Required"),
  username: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

const Page: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = React.useState<string | null>(
    null
  );

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await dispatch(registerUser(values));
        setSuccessMessage("Registration successful!");
      } catch (error) {
        // Handle any errors here
        console.error("Registration error:", error);
      }
    },
  });

  return (
    <>
      <Seo title="Register user" />
      <Box component="main" paddingTop="42px" flexGrow="1">
        <Container maxWidth="xl">
          <Grid
            container
            disableEqualOverflow
            spacing={{
              xs: 3,
              lg: 4,
            }}
          >
            <Grid xs={12}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="h4">Add new client</Typography>
              </Stack>
            </Grid>
            <Grid xs={12}>
              <FormCard>
                {successMessage && (
                  <Typography variant="body1" color="success">
                    {successMessage}
                  </Typography>
                )}
                <form onSubmit={formik.handleSubmit}>
                  <Stack spacing={3}>
                    <TextField
                      label="Ime"
                      name="first_name"
                      type="text"
                      value={formik.values.first_name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.first_name &&
                        Boolean(formik.errors.first_name)
                      }
                      helperText={
                        formik.touched.first_name && formik.errors.first_name
                      }
                    />
                    <TextField
                      label="Prezime"
                      name="last_name"
                      type="text"
                      value={formik.values.last_name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.last_name &&
                        Boolean(formik.errors.last_name)
                      }
                      helperText={
                        formik.touched.last_name && formik.errors.last_name
                      }
                    />
                    <TextField
                      label="Korisničko ime"
                      name="username"
                      type="username"
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.username &&
                        Boolean(formik.errors.username)
                      }
                      helperText={
                        formik.touched.username && formik.errors.username
                      }
                    />
                    <TextField
                      label="Email adresa"
                      name="email"
                      type="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      helperText={formik.touched.email && formik.errors.email}
                    />
                    <TextField
                      label="Lozinka"
                      name="password"
                      type="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                      }
                      helperText={
                        formik.touched.password && formik.errors.password
                      }
                    />
                  </Stack>
                  <SubmitButton fullWidth size="large" type="submit">
                    Registriraj korisnika
                  </SubmitButton>
                </form>
              </FormCard>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Page;
