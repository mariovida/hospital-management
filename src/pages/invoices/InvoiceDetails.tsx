import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@src/store/store";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/system/Unstable_Grid";
import ArrowLeft from "@src/icons/arrow-left";

import { Seo } from "@src/components/seo";
import { paths } from "@src/paths";
import { fetchInvoiceDetails } from "@src/store/slices/invoicesSlice";
import styled from "@emotion/styled";
import customColors from "@src/theme/colors";
import { CardContent } from "@mui/material";

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

const Page = () => {
  const dispatch: AppDispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const invoice = useSelector(
    (state: RootState) => state.invoices.selectedInvoice
  );
  console.log(invoice);

  useEffect(() => {
    try {
      if (id) {
        dispatch(fetchInvoiceDetails(id));
      }
    } catch (error) {
      console.error("Error getting invoice:", error);
    }
  }, [dispatch]);

  return (
    <>
      <Seo title="Invoices" />
      <Box component="main" paddingTop="42px" flexGrow="1">
        <Container maxWidth="xl">
          <Grid container>
            <Grid xs={12}>
              <BackButton>
                <Box component={Link} to={paths.invoices}>
                  <ArrowLeft />
                  Invoices
                </Box>
              </BackButton>
            </Grid>
            <Grid xs={12}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ marginBottom: "40px" }}
              >
                <Stack>
                  <Typography
                    variant="h4"
                    sx={{
                      color: customColors.green.main,
                      marginBottom: "8px",
                    }}
                  >
                    INV-{invoice.inv_number}
                  </Typography>
                  <Typography sx={{ fontSize: "18px", fontWeight: "500" }}>
                    {invoice.patient_name} {invoice.patient_surname}
                  </Typography>
                </Stack>
                <Typography></Typography>
              </Stack>
            </Grid>
            <Grid xs={12}>
              <Divider />
            </Grid>
            <Grid xs={12}>
              <Card
                sx={{
                  marginTop: "24px",
                  borderRadius: "10px",
                  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                }}
              >
                <CardContent>
                  <Typography>ss</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Page;
