import * as React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import {
  LoginStack,
  FormCard,
  ErrorStack,
  IllustrationStack,
} from "@src/pages/auth/styles/login";
import { Seo } from "@src/components/seo";
import { useAuth } from "@src/contexts/auth/AuthProvider";
import { useAppDispatch } from "@src/hooks/use-dispatch";
import { loginUser } from "@src/store/slices/usersSlice";
import Grid from "@mui/system/Unstable_Grid";
import { useNavigate } from "react-router-dom";
import { UserCredentials } from "@src/types/users";
import customColors from "@src/theme/colors";

interface FormValues {
  username: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
}

const validationSchema = Yup.object({
  username: Yup.string().max(255).required("Unesite korisničko ime"),
  password: Yup.string().max(255).required("Unesite lozinku"),
});

const Page: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { setAuth, setLoading } = useAuth();
  const [errorMessage, setErrorMessage] = React.useState("");

  const formik = useFormik<FormValues>({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values: UserCredentials) => {
      try {
        const response = await dispatch(loginUser(values));
        const data: LoginResponse = response.payload;
        if (data && data.accessToken) {
          localStorage.setItem("token", data.accessToken);
          setAuth(true);
          navigate("/");
        } else {
          console.error("Token was not found in the response");
          setErrorMessage("Incorrect username or password. Please try again.");
        }
      } catch (error) {
        console.error("Login failed", error);
      }
    },
  });

  return (
    <>
      <Seo title="Login" />
      <Box component="main">
        <Grid xs={12} container>
          <Grid
            xs={12}
            md={4}
            sx={{ backgroundColor: customColors.green.main }}
          >
            <LoginStack>
              <div>
                <FormCard>
                  {errorMessage && (
                    <ErrorStack>
                      <Typography>{errorMessage}</Typography>
                    </ErrorStack>
                  )}
                  <Typography variant="h3" sx={{ marginBottom: "16px" }}>
                    Login into system
                  </Typography>
                  <form noValidate onSubmit={formik.handleSubmit}>
                    <Stack spacing={3}>
                      <TextField
                        fullWidth
                        label="Korisničko ime"
                        name="username"
                        type="username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.username &&
                          Boolean(formik.errors.username)
                        }
                        helperText={
                          formik.touched.username && formik.errors.username
                        }
                      />
                      <TextField
                        fullWidth
                        label="Lozinka"
                        name="password"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.password &&
                          Boolean(formik.errors.password)
                        }
                        helperText={
                          formik.touched.password && formik.errors.password
                        }
                      />
                    </Stack>
                    <Button fullWidth size="large" type="submit">
                      Login
                    </Button>
                  </form>
                </FormCard>
              </div>
            </LoginStack>
          </Grid>
          <Grid xs={12} md={8} sx={{ position: "relative" }}>
            <IllustrationStack>
              <img src="./login_illustration2.svg" />
            </IllustrationStack>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Page;
