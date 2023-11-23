import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import styled from "@emotion/styled";
import customColors from "@src/theme/colors";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface SuccessModalProps {
  open: boolean;
  onClose?: () => void;
  text: string;
  modalTitle: string;
  onConfirm?: () => void;
}

const ModalBox = styled(Box)({
  minWidth: "400px",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: customColors.info.contrastText,
  padding: "24px",
  outline: "0",
  border: "0",
  borderRadius: "7px",
  boxShadow: "0 4.1px 18.1px 0 rgba(0, 0, 0, 0.08)",

  h2: {
    fontSize: "24px",
    fontWeight: "700",
    margin: "0",
  },

  p: {
    fontSize: "16px",
    fontWeight: "400",
    marginTop: "8px",
    marginBottom: "0",
  },

  button: {
    float: "right",
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    border: "0",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: "600",
    color: customColors.info.contrastText,
    marginTop: "24px",
    padding: "10px 24px",
    cursor: "pointer",
  },
});

const CloseButton = styled(Button)({
  fontSize: "15px !important",
  padding: "8px 24px !important",
  backgroundColor: customColors.green.main,
  boxShadow: "none",

  "&:hover": {
    backgroundColor: customColors.green.dark,
    boxShadow: "none",
  },
});

const SuccessModal: React.FC<SuccessModalProps> = ({
  open,
  onClose,
  text,
  modalTitle,
  onConfirm,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <ModalBox>
        <Typography variant="h2">{modalTitle}</Typography>
        <Typography variant="body2">{text}</Typography>
        <CloseButton variant="contained" onClick={onConfirm}>
          Potvrdi
        </CloseButton>
      </ModalBox>
    </Modal>
  );
};

export default SuccessModal;
