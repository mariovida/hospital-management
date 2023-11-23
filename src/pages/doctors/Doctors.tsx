import React from "react";
import { useCallback, useMemo, useState, useEffect } from "react";
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
import { PatientsListTable } from "@src/pages/patients/components/PatientsListTable";
import { PatientsListSearch } from "@src/pages/patients/components/PatientsListSearch";
import { applyPagination } from "@src/utils/apply-pagination";
import { fetchPatients } from "@src/store/slices/patientsSlice";

const Page = () => {
  const dispatch: AppDispatch = useDispatch();
  const patients = useSelector((state: RootState) => state.patients.patients);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    try {
      dispatch(fetchPatients());
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

  const handleFiltersChange = useCallback(
    (filters: any) => {
      setState((prevState) => ({
        ...prevState,
        filters,
      }));
    },
    [dispatch]
  );

  return (
    <>
      <Seo title="" />
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
                  <Typography variant="h4">Doctors</Typography>
                </div>
              </Stack>
            </Grid>
            <Grid xs={12}>
              <PatientsListSearch onFiltersChange={handleFiltersChange} />
              <PatientsListTable
                count={patients.length}
                items={patients}
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
