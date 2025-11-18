import { useState, Suspense, lazy } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import CompaniesList from "./components/CompaniesList";
// import MainPage from './pages/MainPage'
import { TailSpin } from "react-loader-spinner";
const MainPage = lazy(() => import("./pages/MainPage"));
import "./style.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Route, Routes } from "react-router";
import ProtectedRoute from "./components/ProtectedRoutes";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Suspense
        fallback={
          <div className="w-full h-screen flex justify-center items-center">
            <TailSpin
              height="80"
              width="80"
              color="#4f46e5"
              ariaLabel="loading"
            />
          </div>
        }
      >
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainPage />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
