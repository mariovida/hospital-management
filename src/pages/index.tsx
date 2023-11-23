import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/system/Unstable_Grid";

import { Seo } from "@src/components/seo";

const Page = () => {
  const role = localStorage.getItem("userRole");
  return (
    <>
      <Seo title="" />
      <Box component="main" paddingTop="42px" flexGrow="1">
        <Container maxWidth="xl">
          <Grid container>
            <Grid xs={12}>
              <Stack direction="row" justifyContent="space-between">
                <div>
                  {role === "doctor" ? (
                    <Typography variant="h4">Hi, Doctor</Typography>
                  ) : (
                    <Typography variant="h4">Hi, Admin</Typography>
                  )}
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
