import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Card,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import ArrowRightIcon from "@untitled-ui/icons-react/build/esm/ArrowRight";
import PatientDetailsModal from "./PatientDetailsModal";

import styled from "@emotion/styled";
import customColors from "@src/theme/colors";

const DetailsButton = styled(Button)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minWidth: "unset",
  width: "20px",
  padding: "0",
  color: customColors.green.main,
});

export const PatientsListTable = (props: any) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    filters,
  } = props;
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<any | null>(null);

  const openDetailsModalHandler = (patient: any) => {
    setSelectedPatient(patient);
    setOpenDetailsModal(true);
  };

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  return (
    <Card
      sx={{
        marginTop: "24px",
        borderRadius: "10px",
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
      }}
    >
      <Box>
        <Table>
          <TableHead sx={{ backgroundColor: customColors.green.lightest }}>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Surname</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Date of birth</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone number</TableCell>
              <TableCell>MBO</TableCell>
              <TableCell>OIB</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items
              .slice(startIndex, endIndex)
              .filter((patient: any) => {
                const queryLowerCase = filters.query.toLowerCase();
                return (
                  patient.oib.toLowerCase().includes(queryLowerCase) ||
                  patient.first_name.toLowerCase().includes(queryLowerCase) ||
                  patient.last_name.toLowerCase().includes(queryLowerCase) ||
                  patient.email.toLowerCase().includes(queryLowerCase)
                );
              })
              .map((patient: any) => (
                <TableRow hover key={patient.id}>
                  <TableCell>{patient.first_name}</TableCell>
                  <TableCell>{patient.last_name}</TableCell>
                  <TableCell>
                    {patient.gender === "M" ? "Male" : "Female"}
                  </TableCell>
                  <TableCell>{patient.date_of_birth}</TableCell>
                  <TableCell>{patient.email}</TableCell>
                  <TableCell>{patient.phone_number}</TableCell>
                  <TableCell>{patient.mbo}</TableCell>
                  <TableCell>{patient.oib}</TableCell>
                  <TableCell>
                    <DetailsButton
                      onClick={() => openDetailsModalHandler(patient)}
                    >
                      <SvgIcon>
                        <ArrowRightIcon />
                      </SvgIcon>
                    </DetailsButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Box>
      <PatientDetailsModal
        open={openDetailsModal}
        onClose={() => setOpenDetailsModal(false)}
        patient={selectedPatient}
      />

      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

PatientsListTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  filters: PropTypes.object,
};
