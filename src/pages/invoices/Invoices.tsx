import React from "react";
import { useCallback, useMemo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "@src/store/store";
import { subDays, subHours } from "date-fns";
import { useSelection } from "@src/hooks/use-selection";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/system/Unstable_Grid";

import { Seo } from "@src/components/seo";
import { InvoicesSummary } from "@src/pages/invoices/components/InvoicesStats";
import { InvoicesTable } from "@src/pages/invoices/components/InvoicesTable";
import { PatientsListSearch } from "@src/pages/patients/components/PatientsListSearch";
import { fetchInvoices } from "@src/store/slices/invoicesSlice";

import styled from "@emotion/styled";
import customColors from "@src/theme/colors";

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

  let total = 0;
  let total_paid = 0;
  let total_pending = 0;
  if (invoices) {
    for (const invoice of invoices) {
      total += Number(invoice.total_price);
      if (invoice.status === "paid") {
        total_paid += Number(invoice.total_price);
      }
      if (invoice.status === "pending") {
        total_pending += Number(invoice.total_price);
      }
    }
  }

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

  const addNewInvoice = () => {
    navigate("/invoices/add-new");
  };

  return (
    <>
      <Seo title="Invoices" />
      <Box component="main" paddingTop="42px" flexGrow="1">
        <Container maxWidth="xl">
          <Grid container>
            <Grid xs={12}>
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ marginBottom: "40px" }}
              >
                <div>
                  <Typography variant="h4" lineHeight={1.7}>
                    Invoices
                  </Typography>
                </div>
                <div>
                  <MainButton onClick={addNewInvoice}>Add new</MainButton>
                </div>
              </Stack>
            </Grid>
            <Grid xs={12}>
              {" "}
              <InvoicesSummary
                total={Number(total)}
                total_paid={Number(total_paid)}
                total_pending={Number(total_pending)}
              />
            </Grid>
            <Grid xs={12}>
              <InvoicesTable
                items={invoices}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                page={page}
                rowsPerPage={rowsPerPage}
                filters={state.filters}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Page;
