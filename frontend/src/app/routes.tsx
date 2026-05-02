import { createBrowserRouter, Outlet } from "react-router";
import { AppProvider, useApp } from "./context/AppContext";
import { AmbientBackground } from "./components/AmbientBackground";
import { NeuralBackground } from "./components/NeuralBackground";
import { LoginPage } from "./pages/LoginPage";
import { GuestDashboard } from "./pages/GuestDashboard";
import { LoggedInDashboard } from "./pages/LoggedInDashboard";

function Root() {
  const { isDark } = useApp();

  return (
    <div
      className="min-h-screen overflow-x-hidden transition-colors duration-300"
      style={{
        background: isDark
          ? "radial-gradient(circle at top, rgba(37,99,235,0.14), transparent 28%), #08111f"
          : "radial-gradient(circle at top, rgba(255,250,240,0.95), transparent 30%), linear-gradient(180deg, #fdfbf7 0%, #f5efe4 100%)",
      }}
    >
      <AmbientBackground />
      <NeuralBackground />
      <div className="relative z-10">
        <Outlet />
      </div>
    </div>
  );
}

function RootWithProvider() {
  return (
    <AppProvider>
      <Root />
    </AppProvider>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootWithProvider,
    children: [
      { index: true, Component: GuestDashboard },
      { path: "login", Component: LoginPage },
      { path: "dashboard", Component: LoggedInDashboard },
    ],
  },
]);
