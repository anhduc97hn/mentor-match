import React from "react";
import { Routes, Route } from "react-router-dom";

// *** import Layout ***

import MainLayout from "../layout/MainLayout";
import BlankLayout from "../layout/BlankLayout";

// *** import Common (public access) pages ***

import HomePage from "../pages/Public/Homepage/HomePage";
import BrowseMentorPage from "../pages/Public/BrowseMentor/BrowseMentorPage";
import MentorPage from "../pages/Public/MentorDetail/MentorPage";
import NotFoundPage from "../pages/Public/NotFoundPage";

// *** import Common (login access) pages ***

import SessionPage from "../pages/Private/SessionPage";

// *** import Authentication pages ***

import LoginPage from "../pages/Auth/LoginPage";
import RegisterPage from "../pages/Auth/RegisterPage";

// *** import Customer pages ***

import UserProfile from "../pages/User/UserProfile";
import UserSession from "../pages/User/UserSession";

// *** import Dashboard redirect config ***

import AuthRequire from "./AuthRequire";

function Router() {
  return (
    <Routes>
      {/* common routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="mentors" element={<BrowseMentorPage />} />
        <Route path="mentors/:mentorId" element={<MentorPage />} />
        <Route
          path="mentors/:mentorId/session"
          element={
            <AuthRequire>
              <SessionPage />
            </AuthRequire>
          }
        />
        <Route
          path="/account"
          element={
            <AuthRequire>
              <UserProfile />
            </AuthRequire>
          }
        />
        <Route
          path="/account/profile"
          element={
            <AuthRequire>
              <UserProfile />
            </AuthRequire>
          }
        />
        <Route
          path="/account/session"
          element={
            <AuthRequire>
              <UserSession />
            </AuthRequire>
          }
        />
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

export default Router;
