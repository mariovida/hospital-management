import React from "react";
import { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "@src/store/store";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/system/Unstable_Grid";

import { Seo } from "@src/components/seo";
import { fetchPatientRecords } from "@src/store/slices/patientsSlice";

const Page = () => {
  const dispatch: AppDispatch = useDispatch();
  const { id } = useParams<{ id: string | any }>();
  const records = useSelector(
    (state: RootState) => state.patients.selectedRecords
  );

  useEffect(() => {
    try {
      dispatch(fetchPatientRecords(id));
    } catch (error) {
      console.error("Error getting statistics:", error);
    }
  }, [dispatch]);

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
                  <Typography variant="h4">Patients</Typography>
                </div>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Page;
