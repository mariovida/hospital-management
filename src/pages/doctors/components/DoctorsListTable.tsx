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
  Typography,
} from "@mui/material";
import ArrowRightIcon from "@untitled-ui/icons-react/build/esm/ArrowRight";
import { MoreMenu } from "@src/pages/doctors/components/DoctorsMoreMenu";

import styled from "@emotion/styled";
import customColors from "@src/theme/colors";

const StatusBadge = styled(Typography)({
  display: "inline-block",
  fontSize: "14px",
  fontWeight: "600",
  textTransform: "uppercase",

  span: {
    borderRadius: "10px",
  },

  ".status-working": {
    backgroundColor: customColors.green.lightest,
    color: customColors.green.dark,
    padding: "4px 10px",
  },

  ".status-holiday": {
    backgroundColor: customColors.warning.lightest,
    color: customColors.warning.text,
    padding: "4px 10px",
  },
});

export const DoctorsListTable = (props: any) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    filters,
  } = props;
  console.log(items);

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
              <TableCell width={200}>Gender</TableCell>
              <TableCell width={200}>Date of birth</TableCell>
              <TableCell>Type</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell width={40}></TableCell>
            </TableRow>
          </TableHead>
          {items ? (
            <TableBody>
              {items
                .filter((doctor: any) => {
                  const queryLowerCase = filters.query.toLowerCase();
                  return (
                    doctor.first_name.toLowerCase().includes(queryLowerCase) ||
                    doctor.last_name.toLowerCase().includes(queryLowerCase)
                  );
                })
                .map((doctor: any) => (
                  <TableRow hover key={doctor.id}>
                    <TableCell>{doctor.first_name}</TableCell>
                    <TableCell>{doctor.last_name}</TableCell>
                    <TableCell>
                      {doctor.gender === "M" ? "Male" : "Female"}
                    </TableCell>
                    <TableCell>{doctor.date_of_birth}</TableCell>
                    <TableCell>{doctor.type}</TableCell>
                    <TableCell align="right">
                      {doctor.is_active === 1 ? (
                        <StatusBadge>
                          <span className="status-working">WORKING</span>
                        </StatusBadge>
                      ) : (
                        <StatusBadge>
                          <span className="status-holiday">HOLIDAY</span>
                        </StatusBadge>
                      )}
                    </TableCell>
                    <TableCell>
                      <MoreMenu
                        doctor_id={doctor.id}
                        status={doctor.is_active}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          ) : (
            <></>
          )}
        </Table>
      </Box>
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

DoctorsListTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  filters: PropTypes.object,
};
