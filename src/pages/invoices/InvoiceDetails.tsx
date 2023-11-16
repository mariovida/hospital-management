import React from "react";
import { useCallback, useMemo, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
import { PDFDownloadLink } from "@react-pdf/renderer";
import { InvoicesSummary } from "@src/pages/invoices/components/InvoicesStats";
import { InvoicesTable } from "@src/pages/invoices/components/InvoicesTable";
import { PatientsListSearch } from "@src/pages/patients/components/PatientsListSearch";
import { applyPagination } from "@src/utils/apply-pagination";
import { fetchInvoiceDetails } from "@src/store/slices/invoicesSlice";

const Page = () => {
  const dispatch: AppDispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const invoice = useSelector(
    (state: RootState) => state.invoices.selectedInvoice
  );
  console.log(invoice);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ marginBottom: "40px" }}
              >
                <div>
                  <Typography variant="h4">Invoice details</Typography>
                </div>
              </Stack>
            </Grid>
            <Grid xs={12}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ marginBottom: "40px" }}
              >
                <Stack>
                  <Typography variant="h4">INV-{invoice.inv_number}</Typography>
                  <Typography>
                    {invoice.patient_name} {invoice.patient_surname}
                  </Typography>
                </Stack>
                <Typography>ss</Typography>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Page;
