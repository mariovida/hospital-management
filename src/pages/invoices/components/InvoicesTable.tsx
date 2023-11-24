import React, { useState } from "react";
import PropTypes from "prop-types";
import numeral from "numeral";
import {
  Avatar,
  Box,
  Button,
  Card,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import PatientDetailsModal from "@src/pages/patients/components/PatientDetailsModal";
import ClockIcon from "@untitled-ui/icons-react/build/esm/Clock";
import ReceiptCheckIcon from "@untitled-ui/icons-react/build/esm/ReceiptCheck";
import { formatDate } from "@src/utils/formatDate";

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

  ".status-paid": {
    backgroundColor: customColors.success.lightest,
    padding: "4px 10px",
  },

  ".status-pending": {
    backgroundColor: customColors.warning.lightest,
    padding: "4px 10px",
  },
});

export const InvoicesTable = (props: any) => {
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

  return (
    <Card
      sx={{
        marginTop: "24px",
        borderRadius: "8px",
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
      }}
    >
      <Box>
        <Table>
          <TableBody>
            {items.map((invoice: any) => (
              <TableRow hover key={invoice.id}>
                <TableCell width={46}>
                  {invoice.status === "paid" ? (
                    <Avatar
                      sx={{
                        backgroundColor: customColors.success.lightest,
                        color: customColors.success.dark,
                        height: 46,
                        width: 46,
                      }}
                    >
                      <ReceiptCheckIcon />
                    </Avatar>
                  ) : (
                    <Avatar
                      sx={{
                        backgroundColor: customColors.warning.lightest,
                        color: customColors.warning.dark,
                        height: 46,
                        width: 46,
                      }}
                    >
                      <ClockIcon />
                    </Avatar>
                  )}
                </TableCell>
                <TableCell>
                  <Typography sx={{ fontFamily: "Plus Jakarta Sans" }}>
                    INV-{invoice.inv_number}
                  </Typography>
                </TableCell>
                <TableCell>
                  {invoice.total_price !== null ? (
                    <Typography>
                      € {numeral(invoice.total_price / 100).format(`0,0.00`)}
                    </Typography>
                  ) : (
                    <Typography>-</Typography>
                  )}
                </TableCell>
                <TableCell>
                  <Stack>
                    <Typography sx={{ fontSize: "16px", fontWeight: "500" }}>
                      Issued
                    </Typography>
                    <Typography sx={{ fontSize: "14px", fontWeight: "400" }}>
                      {formatDate(invoice.created_at)}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  {invoice.status === "paid" ? (
                    <StatusBadge>
                      <span className="status-paid">{invoice.status}</span>
                    </StatusBadge>
                  ) : (
                    <StatusBadge>
                      <span className="status-pending">{invoice.status}</span>
                    </StatusBadge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Card>
  );
};

InvoicesTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  filters: PropTypes.object,
};
