import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import CreateResume from "./pages/CreateResume";
import { Toaster } from "react-hot-toast";
import MyResumes from "./pages/MyResumes";
import EditResume from "./pages/EditResume";
import PreviewResume from "./pages/PreviewResume";
import AITools from "./pages/AITools";

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-resume" element={<CreateResume />} />
        <Route
          path="/my-resumes"
          element={
            <PrivateRoute>
              <MyResumes />
            </PrivateRoute>
          }
        />
        <Route path="/resume-preview/:id" element={<PreviewResume />} />

        <Route path="/ai-tools" element={<AITools />} />

        <Route
          path="/edit-resume/:id"
          element={
            <PrivateRoute>
              <EditResume />
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
