import React from "react";
import type { ReactNode } from "react";
import { useMemo } from "react";
import { SvgIcon } from "@mui/material";

import { paths } from "@src/paths";
import HomeSmile from "@src/icons/home-smile";
import PatientsIcon from "@src/icons/patients";
import DoctorsIcon from "@src/icons/doctors";
import RecordsIcon from "@src/icons/records";
import InvoicesIcon from "@src/icons/invoices";

export interface Item {
  disabled?: boolean;
  external?: boolean;
  icon?: ReactNode;
  items?: Item[];
  label?: ReactNode;
  path?: string;
  title: string;
}

export interface Section {
  items: Item[];
  subheader?: string;
}

export const useSections = () => {
  return useMemo(() => {
    return [
      {
        items: [
          {
            title: "Home",
            path: paths.index,
            icon: (
              <SvgIcon fontSize="small">
                <HomeSmile />
              </SvgIcon>
            ),
          },
          {
            title: "Patients",
            icon: (
              <SvgIcon fontSize="small">
                <PatientsIcon />
              </SvgIcon>
            ),
            items: [
              {
                title: "View all",
                path: paths.patients,
              },
              {
                title: "Add new",
                path: paths.addNewPatient,
              },
            ],
          },
          {
            title: "Doctors",
            icon: (
              <SvgIcon fontSize="small">
                <DoctorsIcon />
              </SvgIcon>
            ),
            items: [
              {
                title: "View all",
                path: paths.doctors,
              },
              {
                title: "Add new",
                path: paths.addNewDoctor,
              },
            ],
          },
          {
            title: "Records",
            icon: (
              <SvgIcon fontSize="small">
                <RecordsIcon />
              </SvgIcon>
            ),
            items: [
              {
                title: "View all",
                path: paths.records,
              },
            ],
          },
          {
            title: "Invoices",
            path: paths.invoices,
            icon: (
              <SvgIcon fontSize="small">
                <InvoicesIcon />
              </SvgIcon>
            ),
          },
          {
            title: "Create new user",
            path: paths.newUser,
            icon: (
              <SvgIcon fontSize="small">
                <DoctorsIcon />
              </SvgIcon>
            ),
          },
        ],
      },
    ];
  }, []);
};
