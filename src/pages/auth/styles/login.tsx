import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import styled from "@emotion/styled";
import customColors from "@src/theme/colors";

export const LoginStack = styled(Stack)({
  maxWidth: "400px",
  width: "100%",
  height: "100vh",
  justifyContent: "center",
  margin: "0 auto",

  "& h3": {
    marginBottom: "16px",
    color: customColors.red.text,
  },
});

export const IllustrationStack = styled(Stack)({
  img: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
  },
});

export const FormCard = styled(CardContent)({
  width: "100%",
  alignItems: "flex-start",
  justifyContent: "center",
  padding: "0",
  color: customColors.primary.darkest,

  "& form": {
    width: "100%",
    padding: "40px 32px",
    backgroundColor: customColors.neutral[100],
    borderRadius: "10px",

    "& button": {
      marginTop: "40px",
      letterSpacing: "1px",
      fontSize: "16px",
      color: customColors.green.main,
      backgroundColor: "transparent",
      border: "1px solid",
      borderColor: customColors.green.main,

      "&:hover": {
        backgroundColor: customColors.green.lightest,
      },
    },
  },
});

export const ErrorStack = styled(Stack)({
  marginBottom: "24px",
  textAlign: "center",
  padding: "16px",
  borderRadius: "8px",
  backgroundColor: customColors.error.lightest,

  p: {
    fontSize: "16px",
    fontWeight: "600",
    color: customColors.error.darkest,
  },
});
