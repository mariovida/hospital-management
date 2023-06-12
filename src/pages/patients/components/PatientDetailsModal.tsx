import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/system/Unstable_Grid";
import Stack from "@mui/system/Stack";

import styled from "@emotion/styled";
import customColors from "@src/theme/colors";
import TextField from "@mui/material/TextField";
import { formatDate, formatDateWithClock } from "@src/utils/formatDate";

type PatientDetailsModalProps = {
  open: boolean;
  onClose: () => void;
  patient?: {
    patient_key: string;
    first_name: string;
    last_name: string;
    gender: string;
    date_of_birth: string;
    email: string;
    phone_number: string;
    mbo: string;
    oib: string;
    address: string;
    city: string;
    country: string;
    created_at: string;
  };
};

const ModalBox = styled(Box)({
  minWidth: "620px",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: customColors.info.contrastText,
  padding: "24px",
  outline: "0",
  border: "0",
  borderRadius: "7px",
  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
});

const MainButton = styled(Button)({
  padding: "8px 24px",
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

const FormGrid = styled(Grid)({
  flexWrap: "nowrap",
  gap: "0 24px",
  marginBottom: "16px",
});

const PatientDetailsModal: FC<PatientDetailsModalProps> = ({
  open,
  onClose,
  patient,
}) => {
  const navigate = useNavigate();

  const viewPatientRecords = () => {
    navigate("/patient/" + patient?.patient_key);
  };
  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <ModalBox>
          <Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ marginBottom: "8px" }}
            >
              <Typography variant="h4" sx={{ color: customColors.green.main }}>
                Patient details
              </Typography>
              <MainButton onClick={viewPatientRecords}>RECORDS</MainButton>
            </Stack>
            <Stack sx={{ marginBottom: "24px" }}>
              Patient since: {formatDateWithClock(patient?.created_at)}
            </Stack>
            <FormGrid container>
              <Grid xs={12} md={6}>
                <TextField
                  label="First name"
                  value={patient?.first_name || ""}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  label="Last name"
                  value={patient?.last_name || ""}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            </FormGrid>
            <FormGrid container>
              <Grid xs={12} md={6}>
                <TextField
                  label="Gender"
                  value={patient?.gender === "M" ? "Male" : "Female"}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  label="Date of birth"
                  value={patient?.date_of_birth || ""}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            </FormGrid>
            <FormGrid container>
              <Grid xs={12} md={6}>
                <TextField
                  label="MBO"
                  value={patient?.mbo || ""}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  label="OIB"
                  value={patient?.oib || ""}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            </FormGrid>
            <Typography
              variant="h5"
              sx={{
                color: customColors.green.main,
                marginTop: "16px",
                marginBottom: "16px",
              }}
            >
              Contact
            </Typography>
            <FormGrid container>
              <Grid xs={12} md={6}>
                <TextField
                  label="Email address"
                  value={patient?.email || ""}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  label="Phone number"
                  value={patient?.phone_number || ""}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            </FormGrid>
            <Typography
              variant="h5"
              sx={{
                color: customColors.green.main,
                marginTop: "16px",
                marginBottom: "16px",
              }}
            >
              Address
            </Typography>
            <FormGrid container>
              <Grid xs={12}>
                <TextField
                  label="Address"
                  value={patient?.address || ""}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            </FormGrid>
            <FormGrid container sx={{ marginBottom: "0 !important" }}>
              <Grid xs={12} md={6}>
                <TextField
                  label="City"
                  value={patient?.city || ""}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  label="Country"
                  value={patient?.country || ""}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            </FormGrid>
          </Stack>
        </ModalBox>
      </Modal>
    </>
  );
};

export default PatientDetailsModal;
