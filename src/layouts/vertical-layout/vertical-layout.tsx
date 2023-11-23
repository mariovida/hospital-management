import React from "react";
import type { FC, ReactNode } from "react";
import PropTypes from "prop-types";
import useMediaQuery from "@mui/material/useMediaQuery";
import type { Theme } from "@mui/material/styles/createTheme";
import { styled } from "@mui/material/styles";

import type { NavColor } from "@src/types/settings";

import type { Section } from "../config";
import { MobileNav } from "../mobile-nav";
import { SideNav } from "./side-nav";
import { useMobileNav } from "./use-mobile-nav";
import customColors from "@src/theme/colors";

const SIDE_NAV_WIDTH = 280;

const VerticalLayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  [theme.breakpoints.up("lg")]: {
    paddingLeft: SIDE_NAV_WIDTH,
  },
}));

const VerticalLayoutContainer = styled("div")({
  width: "100%",
  backgroundColor: "#FFFFFF",
});

interface VerticalLayoutProps {
  children?: ReactNode;
  navColor?: NavColor;
  sections?: Section[];
}

export const VerticalLayout: FC<VerticalLayoutProps> = (props) => {
  const { children, sections, navColor } = props;
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));
  const mobileNav = useMobileNav();

  return (
    <>
      {lgUp && <SideNav color={navColor} sections={sections} />}
      {!lgUp && (
        <MobileNav
          color={navColor}
          onClose={mobileNav.handleClose}
          open={mobileNav.open}
          sections={sections}
        />
      )}
      <VerticalLayoutRoot>
        <VerticalLayoutContainer>{children}</VerticalLayoutContainer>
      </VerticalLayoutRoot>
    </>
  );
};

VerticalLayout.propTypes = {
  children: PropTypes.node,
  navColor: PropTypes.oneOf<NavColor>(["blend-in", "discrete", "evident"]),
  sections: PropTypes.array,
};
