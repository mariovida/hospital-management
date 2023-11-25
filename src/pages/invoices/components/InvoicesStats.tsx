import React from "react";
import type { FC } from "react";
import numeral from "numeral";
import PropTypes from "prop-types";
import ClockIcon from "@untitled-ui/icons-react/build/esm/Clock";
import ReceiptCheckIcon from "@untitled-ui/icons-react/build/esm/ReceiptCheck";
import ReceiptIcon from "@untitled-ui/icons-react/build/esm/Receipt";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Unstable_Grid2";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import styled from "@emotion/styled";
import customColors from "@src/theme/colors";

export const InvoicesSummary = (props: any) => {
  const { total = 0, total_paid = 0, total_pending = 0 } = props;
  return (
    <div>
      <Grid container spacing={4}>
        <Grid xs={12} md={4}>
          <Card
            sx={{
              borderRadius: "10px",
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            }}
          >
            <CardContent sx={{ padding: "24px 32px !important" }}>
              <Stack alignItems="center" direction="row" spacing={3}>
                <Avatar
                  sx={{
                    backgroundColor: customColors.neutral[100],
                    color: customColors.text.secondary,
                    height: 46,
                    width: 46,
                  }}
                >
                  <ReceiptIcon />
                </Avatar>
                <div>
                  <Typography sx={{ color: customColors.text.primary }}>
                    Total
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Plus Jakarta Sans",
                      fontSize: "22px",
                      fontWeight: "700",
                    }}
                  >
                    € {numeral(total / 100).format(`0,0.00`)}
                  </Typography>
                </div>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12} md={4}>
          <Card
            sx={{
              borderRadius: "10px",
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            }}
          >
            <CardContent sx={{ padding: "24px 32px !important" }}>
              <Stack alignItems="center" direction="row" spacing={3}>
                <Avatar
                  sx={{
                    backgroundColor: customColors.green.lightest,
                    color: customColors.green.dark,
                    height: 46,
                    width: 46,
                  }}
                >
                  <ReceiptCheckIcon />
                </Avatar>
                <div>
                  <Typography sx={{ color: customColors.text.primary }}>
                    Paid
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Plus Jakarta Sans",
                      fontSize: "22px",
                      fontWeight: "700",
                    }}
                  >
                    € {numeral(total_paid / 100).format(`0,0.00`)}
                  </Typography>
                </div>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12} md={4}>
          <Card
            sx={{
              borderRadius: "10px",
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            }}
          >
            <CardContent sx={{ padding: "24px 32px !important" }}>
              <Stack alignItems="center" direction="row" spacing={3}>
                <Avatar
                  sx={{
                    backgroundColor: customColors.warning.lightest,
                    color: customColors.warning.text,
                    height: 46,
                    width: 46,
                  }}
                >
                  <ClockIcon />
                </Avatar>
                <div>
                  <Typography sx={{ color: customColors.text.primary }}>
                    Pending
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Plus Jakarta Sans",
                      fontSize: "22px",
                      fontWeight: "700",
                    }}
                  >
                    € {numeral(total_pending / 100).format(`0,0.00`)}
                  </Typography>
                </div>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

InvoicesSummary.propTypes = {
  total: PropTypes.number,
  total_paid: PropTypes.number,
  total_pending: PropTypes.number,
};
