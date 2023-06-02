import React from "react";
import { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { AppDispatch, RootState } from "@src/store/store";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/system/Unstable_Grid";
import ArrowLeft from "@src/icons/arrow-left";

import { Seo } from "@src/components/seo";
import { paths } from "@src/paths";
import { fetchInvoices } from "@src/store/slices/invoicesSlice";

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

const MainButton = styled(Button)({
  height: "fill",
  padding: "15px 20px",
  fontSize: "14px",
  fontWeight: "500",
  lineHeight: "24px",
  textAlign: "center",
  borderRadius: "10px",
  color: customColors.info.contrastText,
  backgroundColor: customColors.green.main,

  "&:hover": {
    backgroundColor: customColors.green.dark,
  },
});

const Page = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const invoices = useSelector((state: RootState) => state.invoices.invoices);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    try {
      dispatch(fetchInvoices());
    } catch (error) {
      console.error("Error getting statistics:", error);
    }
  }, [dispatch]);

  const handlePageChange = useCallback((event: any, value: any) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event: any) => {
    setRowsPerPage(event.target.value);
  }, []);

  const [state, setState] = useState({
    filters: {
      query: "",
    },
  });

  const addNewRecord = () => {
    navigate("/invoices/add-new");
  };

  return (
    <>
      <Seo title="New appointment" />
      <Box component="main" paddingTop="42px" flexGrow="1">
        <Container maxWidth="xl">
          <Grid container>
            <Grid xs={12}>
              <BackButton>
                <Box component={Link} to={paths.appointments}>
                  <ArrowLeft />
                  Appointments
                </Box>
              </BackButton>
            </Grid>
            <Grid xs={12}>
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ marginBottom: "40px" }}
              >
                <div>
                  <Typography variant="h4" lineHeight={1.7}>
                    Add new appointment
                  </Typography>
                </div>
              </Stack>
            </Grid>
            <Grid xs={12}></Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Page;
