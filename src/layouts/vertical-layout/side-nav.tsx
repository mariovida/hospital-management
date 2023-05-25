import React from "react";
import type { FC } from "react";
import { useCallback, useMemo, useState } from "react";
import PropTypes from "prop-types";
import File04Icon from "@untitled-ui/icons-react/build/esm/File04";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import LogoutIcon from "@src/icons/log-out";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import { Logo } from "@src/components/logo";
import { RouterLink } from "@src/components/router-link";
import { Scrollbar } from "@src/components/scrollbar";
import { usePathname } from "@src/hooks/use-pathname";
import { paths } from "@src/paths";
import type { NavColor } from "@src/types/settings";

import type { Section } from "../config";
import { SideNavSection } from "./side-nav-section";
import customColors from "@src/theme/colors";
import styled from "@emotion/styled";
import { useRouter } from "@src/hooks/use-router";

const SIDE_NAV_WIDTH = 280;

const useCssVars = (color: NavColor): Record<string, string> => {
  const theme = useTheme();

  return useMemo((): Record<string, string> => {
    switch (color) {
      case "blend-in":
        if (theme.palette.mode === "dark") {
          return {
            "--nav-bg": theme.palette.background.default,
            "--nav-color": theme.palette.neutral[100],
            "--nav-border-color": theme.palette.neutral[700],
            "--nav-logo-border": theme.palette.neutral[700],
            "--nav-section-title-color": theme.palette.neutral[400],
            "--nav-item-color": theme.palette.neutral[400],
            "--nav-item-hover-bg": "rgba(255, 255, 255, 0.04)",
            "--nav-item-active-bg": "rgba(255, 255, 255, 0.04)",
            "--nav-item-active-color": theme.palette.text.primary,
            "--nav-item-disabled-color": theme.palette.neutral[600],
            "--nav-item-icon-color": theme.palette.neutral[500],
            "--nav-item-icon-active-color": theme.palette.primary.main,
            "--nav-item-icon-disabled-color": theme.palette.neutral[700],
            "--nav-item-chevron-color": theme.palette.neutral[700],
            "--nav-scrollbar-color": theme.palette.neutral[400],
          };
        } else {
          return {
            "--nav-bg": theme.palette.background.default,
            "--nav-color": theme.palette.text.primary,
            "--nav-border-color": theme.palette.neutral[100],
            "--nav-logo-border": theme.palette.neutral[100],
            "--nav-section-title-color": theme.palette.neutral[400],
            "--nav-item-color": theme.palette.text.secondary,
            "--nav-item-hover-bg": theme.palette.action.hover,
            "--nav-item-active-bg": theme.palette.action.selected,
            "--nav-item-active-color": theme.palette.text.primary,
            "--nav-item-disabled-color": theme.palette.neutral[400],
            "--nav-item-icon-color": theme.palette.neutral[400],
            "--nav-item-icon-active-color": theme.palette.primary.main,
            "--nav-item-icon-disabled-color": theme.palette.neutral[400],
            "--nav-item-chevron-color": theme.palette.neutral[400],
            "--nav-scrollbar-color": theme.palette.neutral[900],
          };
        }
      case "evident":
        if (theme.palette.mode === "dark") {
          return {
            "--nav-bg": theme.palette.neutral[800],
            "--nav-color": theme.palette.common.white,
            "--nav-border-color": "transparent",
            "--nav-logo-border": theme.palette.neutral[700],
            "--nav-section-title-color": theme.palette.neutral[400],
            "--nav-item-color": theme.palette.neutral[400],
            "--nav-item-hover-bg": "rgba(255, 255, 255, 0.04)",
            "--nav-item-active-bg": "rgba(255, 255, 255, 0.04)",
            "--nav-item-active-color": theme.palette.common.white,
            "--nav-item-disabled-color": theme.palette.neutral[500],
            "--nav-item-icon-color": theme.palette.neutral[400],
            "--nav-item-icon-active-color": theme.palette.primary.main,
            "--nav-item-icon-disabled-color": theme.palette.neutral[500],
            "--nav-item-chevron-color": theme.palette.neutral[600],
            "--nav-scrollbar-color": theme.palette.neutral[400],
          };
        } else {
          return {
            "--nav-bg": customColors.menu_bar.background,
            "--nav-color": customColors.text.primary,
            "--nav-border-color": "transparent",
            "--nav-logo-border": "transparent",
            "--nav-section-title-color": customColors.neutral[400],
            "--nav-item-color": customColors.green.dark,
            "--nav-item-hover-bg": customColors.menu_bar.active,
            "--nav-item-active-bg": customColors.menu_bar.active,
            "--nav-item-active-color": customColors.green.dark,
            "--nav-item-disabled-color": customColors.neutral[500],
            "--nav-item-icon-color": customColors.green.dark,
            "--nav-item-icon-active-color": customColors.green.dark,
            "--nav-item-icon-disabled-color": customColors.neutral[500],
            "--nav-item-chevron-color": customColors.green.dark,
            "--nav-scrollbar-color": customColors.text.primary,
          };
        }

      default:
        return {};
    }
  }, [theme, color]);
};

const NavStack = styled(Stack)({
  "button span, a span": {
    fontSize: "15px",
    fontWeight: "500",
  },
  "ul li:first-of-type": {
    paddingBottom: "16px",
    marginBottom: "12px",
    borderBottom: "1px solid",
    borderColor: customColors.text.primary,
  },
  "li ul > li:first-of-type": {
    padding: "0",
    margin: "0",
    border: "0",
  },
});

const LogoStack = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  position: relative;
  width: 100%;
  height: 110px;
  padding-left: 16px;
  margin: 8px 0;

  img {
    width: 100%;
    height: 100%;
  }

  p {
    display: block;
    width: 100%;
    font-size: 18px;
    font-weight: 700;
    color: #c;
    text-decoration: none;
  }
`;

const LogoImage = styled.div`
  width: 70px;
  height: 70px;
`;

const LogoutStack = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  padding: 0 16px;
  margin-bottom: 16px;

  button {
    color: #111927;
    font-size: 15px;
    font-weight: 500;
    padding: 6px 16px;
    border-radius: 8px;
    transition: 0s;

    &:hover {
      background-color: #b2c8ba;
    }

    svg {
      margin-right: 16px;
    }
  }
`;

interface SideNavProps {
  color?: NavColor;
  sections?: Section[];
}

export const SideNav: FC<SideNavProps> = (props) => {
  const { color = "evident", sections = [] } = props;
  const router = useRouter();
  const pathname = usePathname();
  const cssVars = useCssVars(color);

  const handleLogout = useCallback(async (): Promise<void> => {
    try {
      localStorage.removeItem("token");
      router.push(paths.login);
    } catch (err) {
      console.error(err);
    }
  }, [router]);

  return (
    <Drawer
      anchor="left"
      open
      PaperProps={{
        sx: {
          ...cssVars,
          backgroundColor: "var(--nav-bg)",
          borderRightColor: "var(--nav-border-color)",
          borderRightStyle: "solid",
          borderRightWidth: 1,
          color: "var(--nav-color)",
          width: SIDE_NAV_WIDTH,
          ".simplebar-placeholder": {
            display: "none",
          },
        },
      }}
      variant="permanent"
    >
      <Scrollbar
        sx={{
          height: "100%",
          "& .simplebar-content": {
            height: "100%",
          },
          "& .simplebar-scrollbar:before": {
            background: "var(--nav-scrollbar-color)",
          },
        }}
      >
        <Stack sx={{ height: "100%" }}>
          <LogoStack>
            <Box component={RouterLink} href={paths.index}>
              <LogoImage>
                <img src="/logo.svg" />
              </LogoImage>
            </Box>
            <Typography
              sx={{
                fontFamily: "Plus Jakarta Sans",
                fontWeight: "800",
              }}
            >
              Hospital
            </Typography>
          </LogoStack>

          <NavStack
            sx={{
              flexGrow: 1,
              px: 2,
            }}
          >
            {sections.map((section, index) => (
              <SideNavSection
                items={section.items}
                key={index}
                pathname={pathname}
                subheader={section.subheader}
              />
            ))}
          </NavStack>
          <LogoutStack>
            <Button
              variant="text"
              fullWidth
              sx={{
                mt: "auto",
                borderRadius: 0,
                justifyContent: "flex-start",
                pl: 2,
                color: customColors.green.dark + "!important",
              }}
              onClick={handleLogout}
            >
              <LogoutIcon />
              Logout
            </Button>
          </LogoutStack>
        </Stack>
      </Scrollbar>
    </Drawer>
  );
};

SideNav.propTypes = {
  color: PropTypes.oneOf<NavColor>(["blend-in", "discrete", "evident"]),
  sections: PropTypes.array,
};
