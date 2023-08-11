import React from 'react';
import { Routes, Route } from "react-router-dom";

// *** import Layout *** 

import MainLayout from "../layout/MainLayout";
import BlankLayout from "../layout/BlankLayout";

// *** import Common (public access) pages ***

import HomePage from "../pages/Public/HomePage";
import BrowseMentorPage from '../pages/Public/BrowseMentorPage';
import MentorPage from "../pages/Public/MentorPage";
import NotFoundPage from "../pages/Public/NotFoundPage";

// *** import Common (login access) pages ***

import SessionPage from "../pages/Private/SessionPage";
import BookingPage from "../pages/Private/BookingPage"; 

// *** import Authentication pages ***

import LoginPage from "../pages/Auth/LoginPage";
import RegisterPage from "../pages/Auth/RegisterPage";

// *** import Admin pages ***

import AdminProfile from '../pages/Admin/AdminDashboard';
import AdminCustomer from "../pages/Admin/AdminCustomer";
import AdminMentor from "../pages/Admin/AdminMentor";
import AdminSession from "../pages/Admin/AdminSession";
import AdminBooking from "../pages/Admin/AdminBooking";
import AdminReport from "../pages/Admin/AdminReport"; 

// *** import Customer pages ***

import CustomerProfile from '../pages/Customer/CustomerDashboard';
import CustomerSession from "../pages/Customer/CustomerSession";
import CustomerBooking from "../pages/Customer/CustomerBooking";
import CustomerCard from "../pages/Customer/CustomerCard";

// *** import Mentor pages ***

import MentorProfile from '../pages/Mentor/MentorDashboard';
import MentorSession from "../pages/Mentor/MentorSession";
import MentorBooking from "../pages/Mentor/MentorBooking";
import MentorSlot from "../pages/Mentor/MentorSlot";

// *** import Dashboard redirect config ***

import Dashboard from './Dashboard';
import CustomerDashboard from '../pages/Customer/CustomerDashboard';
import MentorDashboard from '../pages/Mentor/MentorDashboard';
import AuthRequire from './AuthRequire';

function Router() {
  return (
    <Routes>
      {/* common routes */}
      <Route path="/" element={<MainLayout />}>

        <Route index element={<HomePage />} />

        <Route path="mentors" element={<BrowseMentorPage />} />

        <Route path="mentors/:mentorId" element={<MentorPage />} />

        <Route path="mentors/:mentorId/session" element={<AuthRequire><SessionPage /></AuthRequire>} />

        <Route
          path="mentors/:mentorId/session/booking"
          element={<AuthRequire><BookingPage /></AuthRequire>}
        />

        <Route path="/account" element={<AuthRequire><Dashboard /></AuthRequire>}>
          {/* conditional routing ? => user_type ? admin => admin dashboard, customer => customer, else => mentor */}

          {/* customer routes */}

          <Route path="customer" element={<CustomerDashboard/>} />

          <Route path="customer-profile" element={<CustomerProfile />} />

          <Route path="customer-session" element={<CustomerSession />} />

          <Route path="customer-booking" element={<CustomerBooking />} />

          <Route path="customer-card" element={<CustomerCard />} />

          {/* mentor routes */}

          <Route path="mentor" element={<MentorDashboard/>} />

          <Route path="mentor-profile" element={<MentorProfile />} />

          <Route path="mentor-slot" element={<MentorSlot />} />

          <Route path="mentor-session" element={<MentorSession />} />

          <Route path="mentor-booking" element={<MentorBooking />} />

          {/* admin routes => advanced feature */}

          <Route path="admin-profile" element={<AdminProfile />} />

          <Route path="admin-customer" element={<AdminCustomer />} />

          <Route path="admin-mentor" element={<AdminMentor />} />

          <Route path="admin-session" element={<AdminSession />} />

          <Route path="admin-booking" element={<AdminBooking />} />

          <Route path="admin-reports" element={<AdminReport />} />

        </Route>

      </Route>

      {/* authentication routes */}
      <Route element={<BlankLayout />}>

        <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />} />

      </Route>

      {/* not found route */}
      <Route path="*" element={<NotFoundPage />} />

    </Routes>
  );
}

export default Router