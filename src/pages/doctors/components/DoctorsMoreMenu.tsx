import React from "react";
import { useState, type FC } from "react";
import DotsHorizontalIcon from "@untitled-ui/icons-react/build/esm/DotsVertical";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SvgIcon from "@mui/material/SvgIcon";

import { usePopover } from "@src/hooks/use-popover";
import { useAppDispatch } from "@src/hooks/use-dispatch";
import { changeDoctorStatus } from "@src/store/slices/doctorsSlice";
import styled from "@emotion/styled";
import customColors from "@src/theme/colors";

const SvgDotsButton = styled(IconButton)({
  padding: "0",
});

const CustomMenuItem = styled(MenuItem)({
  margin: "6px 8px",
  borderRadius: "5px",

  "& a": {
    width: "100%",
    textDecoration: "none",
    color: customColors.text.primary,
    padding: "6px 16px",
  },
});

export const MoreMenu: FC<{ doctor_id: any; status: any }> = (props) => {
  const dispatch = useAppDispatch();
  const { doctor_id, status } = props;
  const popover = usePopover<HTMLButtonElement>();
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const handleChangeDoctorStatus = async () => {
    try {
      await dispatch(changeDoctorStatus({ id: doctor_id, status: status }));
      window.location.reload();
    } catch (error) {
      console.error("Error changing status:", error);
    }
  };

  return (
    <>
      <SvgDotsButton
        onClick={popover.handleOpen}
        ref={popover.anchorRef}
        {...props}
      >
        <SvgIcon>
          <DotsHorizontalIcon />
        </SvgIcon>
      </SvgDotsButton>

      <Menu
        anchorEl={popover.anchorRef.current}
        anchorOrigin={{
          horizontal: "right",
          vertical: "bottom",
        }}
        onClose={popover.handleClose}
        open={popover.open}
        PaperProps={{
          sx: {
            maxWidth: "100%",
            width: 250,
            marginTop: "10px",
          },
        }}
        transformOrigin={{
          horizontal: "right",
          vertical: "top",
        }}
      >
        <CustomMenuItem onClick={() => handleChangeDoctorStatus()}>
          <ListItemText primary="Change status" />
        </CustomMenuItem>
      </Menu>
    </>
  );
};
