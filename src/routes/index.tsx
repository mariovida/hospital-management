import React, { Suspense, lazy, useState } from "react";
import type { RouteObject } from "react-router";
import { Outlet } from "react-router-dom";

import ProtectedRoute from "./protected-routes";

import { Layout as DashboardLayout } from "@src/layouts";
import { Layout as DoctorLayout } from "@src/layouts/doctor-layout";
import HomePage from "@src/pages";
import PatientsPage from "@src/pages/patients/Patients";
import AddNewPatientPage from "@src/pages/patients/AddNewPatient";
import DoctorsPage from "@src/pages/doctors/Doctors";
import AddNewDoctorPage from "@src/pages/doctors/AddNewDoctor";
import InvoicesPage from "@src/pages/invoices/Invoices";
import AddNewInvoicePage from "@src/pages/invoices/AddNewInvoice";
import InvoiceDetailsPage from "@src/pages/invoices/InvoiceDetails";

import NewClientPage from "@src/pages/create-user";

const LoginPage = lazy(() => import("@src/pages/auth/login"));

const Routes: React.FC = () => {
  const role = localStorage.getItem("userRole");

  if (role === "admin") {
    return (
      <DashboardLayout>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </DashboardLayout>
    );
  } else if (role === "doctor") {
    return (
      <DoctorLayout>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </DoctorLayout>
    );
  }
};

export const routes: RouteObject[] = [
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    element: (
      <ProtectedRoute>
        <Routes />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/patients",
        element: <PatientsPage />,
      },
      {
        path: "/patients/add-new",
        element: <AddNewPatientPage />,
      },
      {
        path: "/doctors",
        element: <DoctorsPage />,
      },
      {
        path: "/doctors/add-new",
        element: <AddNewDoctorPage />,
      },
      {
        path: "/create-user",
        element: <NewClientPage />,
      },
      {
        path: "/invoices",
        element: <InvoicesPage />,
      },
      {
        path: "/invoices/add-new",
        element: <AddNewInvoicePage />,
      },
      {
        path: "/invoice/:id",
        element: <InvoiceDetailsPage />,
      },
    ],
  },
];
