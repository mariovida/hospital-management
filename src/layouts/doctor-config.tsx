import React from "react";
import type { ReactNode } from "react";
import { useMemo } from "react";
import { SvgIcon } from "@mui/material";

import { paths } from "@src/paths";
import HomeSmile from "@src/icons/home-smile";
import PatientsIcon from "@src/icons/patients";
import DoctorsIcon from "@src/icons/doctors";

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
            path: paths.patients,
            icon: (
              <SvgIcon fontSize="small">
                <PatientsIcon />
              </SvgIcon>
            ),
          },
          /*{
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
          },*/
        ],
      },
    ];
  }, []);
};
