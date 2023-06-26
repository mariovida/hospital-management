import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import numeral from "numeral";
import { AppDispatch, RootState } from "@src/store/store";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Grid from "@mui/system/Unstable_Grid";
import ArrowLeft from "@src/icons/arrow-left";

import { Seo } from "@src/components/seo";
import { paths } from "@src/paths";
import { fetchInvoiceDetails } from "@src/store/slices/invoicesSlice";
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

const StatusBadge = styled(Typography)({
  display: "inline-block",
  fontSize: "21px",
  fontWeight: "600",
  letterSpacing: "1px",
  textTransform: "uppercase",

  ".status-paid": {
    color: customColors.green.main,
  },

  ".status-pending": {
    color: customColors.warning.dark,
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
                  <Stack
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                    sx={{ marginBottom: "32px" }}
                  >
                    {invoice.status === "paid" ? (
                      <StatusBadge>
                        <span className="status-paid">{invoice.status}</span>
                      </StatusBadge>
                    ) : (
                      <StatusBadge>
                        <span className="status-pending">{invoice.status}</span>
                      </StatusBadge>
                    )}
                  </Stack>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                  >
                    <Stack>
                      <Typography sx={{ fontWeight: "600" }}>
                        PATIENT
                      </Typography>
                      <Typography>
                        {invoice.patient_name} {invoice.patient_surname}
                      </Typography>
                    </Stack>
                    <Stack>
                      <Typography sx={{ fontWeight: "600" }}>
                        DATE OF BIRTH
                      </Typography>
                      <Typography>{invoice.patient_dob}</Typography>
                    </Stack>
                    <Stack>
                      <Typography sx={{ fontWeight: "600" }}>OIB</Typography>
                      <Typography>{invoice.patient_oib}</Typography>
                    </Stack>
                    <Stack alignItems="flex-end">
                      <Typography sx={{ fontWeight: "600" }}>
                        ADDRESS
                      </Typography>
                      <Typography>{invoice.patient_address}</Typography>
                      <Typography>
                        {invoice.patient_city}, {invoice.patient_country}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Stack sx={{ marginTop: "32px" }}>
                    <Table>
                      <TableHead
                        sx={{ backgroundColor: customColors.green.lightest }}
                      >
                        <TableRow>
                          <TableCell>#</TableCell>
                          <TableCell>DESCRIPTION</TableCell>
                          <TableCell>QUANTITY</TableCell>
                          <TableCell>UNIT PRICE</TableCell>
                          <TableCell>TOTAL</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {invoice.items ? (
                          invoice.items.map((item: any, index: number) => (
                            <TableRow hover key={index}>
                              <TableCell>{index + 1}</TableCell>
                              <TableCell>{item.name}</TableCell>
                              <TableCell width={150}>{item.quantity}</TableCell>
                              <TableCell width={200}>
                                € {numeral(item.price / 100).format(`0,0.00`)}
                              </TableCell>
                              <TableCell width={200}>
                                €{" "}
                                {numeral(
                                  (item.quantity * item.price) / 100
                                ).format(`0,0.00`)}
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={4}>No items found</TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </Stack>
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
