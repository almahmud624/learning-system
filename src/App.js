import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Navigation } from "./components/Navigation/Navigation";
import { Quiz } from "./pages/Quiz/Quiz";
import { Leaderboard } from "./pages/Leaderboard/Leaderboard";
import { Authenticator } from "./pages/Authenticator/Authenticator";
import { Dashboard } from "./pages/Dashboard";
import { Assignment } from "./pages/Dashboard/Assignment/Assignment";
import { AssignmentMark } from "./pages/Dashboard/AssignmentMark/AssignmentMark";
import { Quizzes } from "./pages/Dashboard/Quizzes/Quizzes";
import { Videos } from "./pages/Dashboard/Videos/Videos";
import { useAuthCheck } from "./hooks/useAuthCheck";
import { Video } from "./pages/Video/Video";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import PublicRoute from "./PublicRoute/PublicRoute";
import PublicAdminRoute from "./PublicRoute/PublicAdminRoute";
import PrivateAdminRoute from "./PrivateRoute/PrivateAdminRoute";
import { useSelector } from "react-redux";
import { EditableVideo } from "./components/EditableVideo/EditableVideo";

function App() {
  const checkAuth = useAuthCheck();
  const { user } = useSelector((state) => state.auth);

  return !checkAuth ? (
    "Checking visitor authorization..."
  ) : (
    <BrowserRouter>
      {user?.email && <Navigation />}
      <Routes>
        <Route
          path="video/:videoId"
          element={
            <PrivateRoute>
              <Video />
            </PrivateRoute>
          }
        />
        <Route
          path="/"
          element={
            <PublicRoute>
              <Authenticator />
            </PublicRoute>
          }
        />
        <Route
          path="/registration"
          element={
            <PublicRoute>
              <Authenticator />
            </PublicRoute>
          }
        />
        <Route
          path="/quiz/:videoId"
          element={
            <PrivateRoute>
              <Quiz />
            </PrivateRoute>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <PrivateRoute>
              <Leaderboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PublicAdminRoute>
              <Authenticator />
            </PublicAdminRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <PrivateAdminRoute>
              <Dashboard />
            </PrivateAdminRoute>
          }
        />
        <Route
          path="/admin/assignment"
          element={
            <PrivateAdminRoute>
              <Assignment />
            </PrivateAdminRoute>
          }
        />
        <Route
          path="/admin/assignment-mark"
          element={
            <PrivateAdminRoute>
              <AssignmentMark />
            </PrivateAdminRoute>
          }
        />
        <Route
          path="/admin/quizzes"
          element={
            <PrivateAdminRoute>
              <Quizzes />
            </PrivateAdminRoute>
          }
        />
        <Route
          path="/admin/videos"
          element={
            <PrivateAdminRoute>
              <Videos />
            </PrivateAdminRoute>
          }
        />
        <Route
          path="/admin/video/add"
          element={
            <PrivateAdminRoute>
              <EditableVideo />
            </PrivateAdminRoute>
          }
        />
        <Route
          path="/admin/video/edit/:videoId"
          element={
            <PrivateAdminRoute>
              <EditableVideo />
            </PrivateAdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
