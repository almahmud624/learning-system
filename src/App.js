import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import { EditableVideo } from "./components/EditableVideo/EditableVideo";
import { EditQuiz } from "./components/EditableQuiz/EditQuiz";
import { AddQuiz } from "./components/EditableQuiz/AddQuiz";
import { EditableAssignment } from "./components/EditableAssignment/EditableAssignment";
import { Loader } from "./components/Loader/Loader";

function App() {
  const checkAuth = useAuthCheck();

  return !checkAuth ? (
    <Loader />
  ) : (
    <BrowserRouter>
      <Navigation />
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
        <Route
          path="/admin/quiz/add"
          element={
            <PrivateAdminRoute>
              <AddQuiz />
            </PrivateAdminRoute>
          }
        />
        <Route
          path="/admin/quiz/edit/:quizId"
          element={
            <PrivateAdminRoute>
              <EditQuiz />
            </PrivateAdminRoute>
          }
        />
        <Route
          path="/admin/assignment/add"
          element={
            <PrivateAdminRoute>
              <EditableAssignment />
            </PrivateAdminRoute>
          }
        />
        <Route
          path="/admin/assignment/edit/:assignmentId"
          element={
            <PrivateAdminRoute>
              <EditableAssignment />
            </PrivateAdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
