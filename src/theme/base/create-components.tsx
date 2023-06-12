import React from "react";
import { inputLabelClasses } from "@mui/material/InputLabel";
import { tableCellClasses } from "@mui/material/TableCell";
import type { Components } from "@mui/material/styles/components";
import { createTheme } from "@mui/material/styles";
import customColors from "@src/theme/colors";

// Used only to create transitions
const muiTheme = createTheme();

export const createComponents = (): Components => {
  return {
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: 0,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          textTransform: "none",
        },
        sizeSmall: {
          padding: "6px 16px",
        },
        sizeMedium: {
          padding: "8px 20px",
        },
        sizeLarge: {
          padding: "11px 24px",
        },
        textSizeSmall: {
          padding: "7px 12px",
        },
        textSizeMedium: {
          padding: "9px 16px",
        },
        textSizeLarge: {
          padding: "12px 16px",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderBottomWidth: "medium",
          borderColor: customColors.green.main,
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "32px 24px",
        },
      },
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: {
          variant: "h6",
        },
        subheaderTypographyProps: {
          variant: "body2",
        },
      },
      styleOverrides: {
        root: {
          padding: "32px 24px 16px",
        },
      },
    },
    MuiCheckbox: {
      defaultProps: {
        checkedIcon: (
          <svg
            width="24"
            height="19"
            viewBox="0 0 18 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="1"
              y="1"
              width="16"
              height="16"
              rx="5"
              fill="#DFFEF0"
              fillOpacity=".4"
              stroke="#86A789"
              strokeWidth="2"
            />
            <g
              clipPath="url(#oaafep7mja)"
              stroke="#86A789"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m13.438 4.5-9 9M4.438 4.5l9 9" />
            </g>
            <defs>
              <clipPath id="oaafep7mja">
                <path
                  fill="#fff"
                  transform="translate(0 1)"
                  d="M0 0h18v18H0z"
                />
              </clipPath>
            </defs>
          </svg>
        ),
        color: "primary",
        icon: (
          <svg
            fill="none"
            height="19"
            viewBox="0 0 18 19"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              height="16"
              rx="5"
              stroke="#4D5761"
              strokeWidth="1"
              width="16"
              x="1"
              y="1"
            />
          </svg>
        ),
        indeterminateIcon: (
          <svg
            fill="none"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M9 5.5H15C17.2091 5.5 19 7.29086 19 9.5V15.5C19 17.7091 17.2091 19.5 15 19.5H9C6.79086 19.5 5 17.7091 5 15.5V9.5C5 7.29086 6.79086 5.5 9 5.5ZM3 9.5C3 6.18629 5.68629 3.5 9 3.5H15C18.3137 3.5 21 6.18629 21 9.5V15.5C21 18.8137 18.3137 21.5 15 21.5H9C5.68629 21.5 3 18.8137 3 15.5V9.5ZM8 11.5C7.44772 11.5 7 11.9477 7 12.5C7 13.0523 7.44772 13.5 8 13.5H16C16.5523 13.5 17 13.0523 17 12.5C17 11.9477 16.5523 11.5 16 11.5H8Z"
              fill="#2A8B94"
              fillRule="evenodd"
            />
          </svg>
        ),
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        "*": {
          boxSizing: "border-box",
        },
        html: {
          MozOsxFontSmoothing: "grayscale",
          WebkitFontSmoothing: "antialiased",
          display: "flex",
          flexDirection: "column",
          minHeight: "100%",
          width: "100%",
        },
        body: {
          display: "flex",
          flex: "1 1 auto",
          flexDirection: "column",
          minHeight: "100%",
          width: "100%",
        },
        "#root, #__next": {
          display: "flex",
          flex: "1 1 auto",
          flexDirection: "column",
          height: "100%",
          width: "100%",
        },
        "#nprogress": {
          pointerEvents: "none",
        },
        "#nprogress .bar": {
          height: 3,
          left: 0,
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 2000,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        sizeSmall: {
          padding: 4,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          "&::placeholder": {
            opacity: 1,
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        input: {
          fontSize: 14,
          fontWeight: 500,
          lineHeight: "24px",
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
          borderRadius: 8,
          borderStyle: "solid",
          borderWidth: "1px",
          borderColor: customColors.neutral[400],
          overflow: "hidden",
          transition: muiTheme.transitions.create([
            "border-color",
            "box-shadow",
          ]),
          "&:before": {
            display: "none",
          },
          "&:after": {
            display: "none",
          },
          "&.Mui-error": {
            borderColor: customColors.red.main,
          },
        },
        input: {
          fontSize: 14,
          fontWeight: 500,
          lineHeight: "24px",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&.MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#86A789",
            borderWidth: 2,
          },
        },
        input: {
          fontSize: 16,
          fontWeight: 500,
          lineHeight: "24px",
        },
        notchedOutline: {
          borderColor: customColors.neutral[400],
          transition: muiTheme.transitions.create([
            "border-color",
            "box-shadow",
          ]),
          "&:focused": {
            borderWidth: "1px",
            backgroundColor: "red",
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: 14,
          fontWeight: 500,
          [`&.${inputLabelClasses.filled}`]: {
            transform: "translate(12px, 18px) scale(1)",
          },
          [`&.${inputLabelClasses.shrink}`]: {
            [`&.${inputLabelClasses.standard}`]: {
              transform: "translate(0, -1.5px) scale(0.85)",
            },
            [`&.${inputLabelClasses.filled}`]: {
              transform: "translate(12px, 6px) scale(0.85)",
              color: customColors.neutral[300],
            },
            [`&.${inputLabelClasses.outlined}`]: {
              transform: "translate(14px, -9px) scale(0.85)",
            },
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 3,
          overflow: "hidden",
        },
      },
    },
    MuiLink: {
      defaultProps: {
        underline: "hover",
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          maxHeight: "250px",
          padding: "0",
          borderRadius: "10px",
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          marginRight: "16px",
          minWidth: "unset",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",

          "&::-webkit-scrollbar-track": { backgroundColor: "#F5F5F5" },
          "&::-webkit-scrollbar": { width: "6px", backgroundColor: "#F5F5F5" },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: customColors.text.primary,
          },
        },
      },
    },
    MuiPopover: {
      defaultProps: {
        elevation: 16,
      },
    },
    MuiRadio: {
      defaultProps: {
        color: "primary",
      },
    },
    MuiSwitch: {
      defaultProps: {
        color: "primary",
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontSize: 14,
          fontWeight: 500,
          lineHeight: 1.71,
          minWidth: "auto",
          paddingLeft: 0,
          paddingRight: 0,
          textTransform: "none",
          "& + &": {
            marginLeft: 24,
          },
          "&.Mui-selected": {
            color: customColors.primary.main,
            borderBottom: `0px solid ${customColors.primary.main}`,
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: "15px 16px",
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          borderBottom: "none",
          [`& .${tableCellClasses.root}`]: {
            borderBottom: "none",
            fontSize: 12,
            fontWeight: 600,
            lineHeight: 1,
            letterSpacing: 0.5,
            textTransform: "uppercase",
          },
          [`& .${tableCellClasses.paddingCheckbox}`]: {
            paddingTop: 4,
            paddingBottom: 4,
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: customColors.action.table,
            "&:hover": {
              backgroundColor: customColors.action.table,
            },
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&.MuiFormLabel-root.MuiInputLabel-shrink.MuiInputLabel-outlined": {
            color: customColors.neutral[600],
          },
        },
        outlined: {
          fontSize: "1rem",

          "&.Mui-focused": {
            fontSize: "1rem",
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "filled",
      },
    },
  };
};
