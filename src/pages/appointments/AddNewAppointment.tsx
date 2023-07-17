import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { AppDispatch, RootState } from "@src/store/store";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import CustomTextField from "@src/components/text-field";
import CustomSelectField from "@src/components/select-field";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/system/Unstable_Grid";
import ArrowLeft from "@src/icons/arrow-left";
import SuccessModal from "@src/components/modal";

import { Seo } from "@src/components/seo";
import { paths } from "@src/paths";
import PatientsSearch from "@src/pages/appointments/components/PatientsSearch";
import { fetchPatients } from "@src/store/slices/patientsSlice";
import { addNewAppointment } from "@src/store/slices/appointmentsSlice";

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

const FormGrid = styled(Grid)({
  flexWrap: "nowrap",
  gap: "0 24px",
  marginBottom: "16px",
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
  boxShadow: "none",

  "&:hover": {
    backgroundColor: customColors.green.dark,
    boxShadow: "none",
  },
});

interface AddAppointmentFormValues {
  type: string;
  status: string;
}

const Page = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const patients = useSelector((state: RootState) => state.patients.patients);
  const [scheduleDate, setScheduleDate] = useState<Date | null>(null);
  const [selectedPatient, setSelectedPatient] = useState({
    name: "",
    id: 0,
    mbo: "",
  });
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);

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
  };

  const validationSchema = Yup.object({
    type: Yup.string().required("Required field"),
    status: Yup.string().required("Required field"),
  });

  const formik = useFormik<AddAppointmentFormValues>({
    initialValues: {
      type: "",
      status: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const errors = await formik.validateForm();
      let formattedDate;
      if (Object.keys(errors).length === 0) {
        if (scheduleDate) {
          formattedDate = `${scheduleDate.getFullYear()}-${String(
            scheduleDate.getMonth() + 1
          ).padStart(2, "0")}-${String(scheduleDate.getDate()).padStart(
            2,
            "0"
          )} ${String(scheduleDate.getHours()).padStart(2, "0")}:${String(
            scheduleDate.getMinutes()
          ).padStart(2, "0")}:${String(scheduleDate.getSeconds()).padStart(
            2,
            "0"
          )}`;
        }
        try {
          await dispatch(
            addNewAppointment({
              appointmentData: values,
              id: selectedPatient.id,
              date: formattedDate,
            })
          );
          setConfirmationModalOpen(true);
        } catch (error) {
          console.error("Failed", error);
        }
      }
    },
  });

  const typeOptions = [
    { label: "Anesthesiology", value: "Anesthesiology" },
    { label: "Cardiology", value: "Cardiology" },
    { label: "Dermatology", value: "Dermatology" },
    { label: "Family medicine", value: "Family medicine" },
    { label: "Gastroenterology", value: "Gastroenterology" },
    { label: "Oncology", value: "Oncology" },
    { label: "Ophthalmology", value: "Ophthalmology" },
    { label: "Otolaryngology", value: "Otolaryngology" },
    { label: "Pediatrics", value: "Pediatrics" },
    { label: "Radiology", value: "Radiology" },
    { label: "Urology", value: "Urology" },
  ];

  const statusOptions = [
    { label: "Waiting", value: "waiting" },
    { label: "In progress", value: "progress" },
  ];

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
                  {confirmationModalOpen && (
                    <SuccessModal
                      open={true}
                      onClose={() => setConfirmationModalOpen(false)}
                      onConfirm={() => navigate("/appointments")}
                      text="Appointment was added successfully."
                      modalTitle="Appointment added"
                      buttonText="Confirm"
                    />
                  )}
                  <form onSubmit={formik.handleSubmit}>
                    <FormGrid container sx={{ marginTop: "24px" }}>
                      <Grid xs={6}>
                        <CustomSelectField
                          formik={formik}
                          name="type"
                          label="Type"
                          options={typeOptions}
                          defaultOptionLabel="Type"
                        />
                      </Grid>
                      <Grid xs={6}>
                        <CustomSelectField
                          formik={formik}
                          name="status"
                          label="Status"
                          options={statusOptions}
                          defaultOptionLabel="Status"
                        />
                      </Grid>
                    </FormGrid>
                    <FormGrid container sx={{ marginTop: "24px" }}>
                      <Grid xs={6}>
                        <DateTimePicker
                          sx={{
                            width: "100%",
                          }}
                          label="Appointment date and time"
                          onChange={(date) => setScheduleDate(date)}
                          value={scheduleDate}
                        />
                      </Grid>
                      <Grid xs={6}></Grid>
                    </FormGrid>
                    <Stack direction="row" justifyContent="flex-end">
                      <SubmitButton type="submit" variant="contained">
                        Make appointment
                      </SubmitButton>
                    </Stack>
                  </form>
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
