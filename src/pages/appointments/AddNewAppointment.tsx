import React from "react";
import { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { AppDispatch, RootState } from "@src/store/store";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/system/Unstable_Grid";
import ArrowLeft from "@src/icons/arrow-left";

import { Seo } from "@src/components/seo";
import { paths } from "@src/paths";
import PatientsSearch from "@src/pages/appointments/components/PatientsSearch";
import { fetchPatients } from "@src/store/slices/patientsSlice";

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

const AppointmentCard = styled(Card)({
  padding: "24px",
  marginTop: "24px",
  borderRadius: "10px",
  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
});

const SubmitButton = styled(Button)({
  padding: "12px 24px",
  fontSize: "14px",
  fontWeight: "500",
  lineHeight: "24px",
  textAlign: "center",
  marginTop: "24px",
  borderRadius: "10px",
  color: customColors.info.contrastText,
  backgroundColor: customColors.green.main,

  "&:hover": {
    backgroundColor: customColors.green.dark,
  },
});

const Page = () => {
  const dispatch: AppDispatch = useDispatch();
  const patients = useSelector((state: RootState) => state.patients.patients);
  const [selectedPatient, setSelectedPatient] = useState({
    name: "",
    id: 0,
    mbo: "",
  });

  useEffect(() => {
    try {
      dispatch(fetchPatients());
    } catch (error) {
      console.error("Error getting statistics:", error);
    }
  }, [dispatch]);

  const handlePatientSearch = (query: string) => {};

  const handlePatientSelect = (name: string, id: number, mbo: string) => {
    setSelectedPatient({
      name: `${name}`,
      id: id,
      mbo: mbo,
    });
    console.log(mbo);
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
            <Grid xs={12}>
              <PatientsSearch
                onFiltersChange={handlePatientSearch}
                onSelectPatient={handlePatientSelect}
                patients={patients}
              />
            </Grid>
            {selectedPatient.name !== "" && (
              <Grid xs={12}>
                <AppointmentCard>
                  <Stack direction="row" justifyContent="space-between">
                    <div>
                      <Typography
                        fontFamily={"Plus Jakarta Sans"}
                        fontSize={24}
                        fontWeight={"bold"}
                      >
                        {selectedPatient.name}
                      </Typography>
                    </div>
                    <Stack textAlign="right">
                      <Typography
                        sx={{
                          fontSize: "16px",
                          color: customColors.text.secondary,
                        }}
                      >
                        MBO
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "18px",
                          fontWeight: "500",
                        }}
                      >
                        {selectedPatient.mbo}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Stack direction="row" justifyContent="flex-end">
                    <SubmitButton>Make appointment</SubmitButton>
                  </Stack>
                </AppointmentCard>
              </Grid>
            )}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Page;
