import { createBrowserRouter, Navigate } from "react-router";
import { Layout } from "./components/Layout";
import { Login } from "./components/Login";
import { RoleSelection } from "./components/RoleSelection";
import { FarmDashboard } from "./components/farm/FarmDashboard";
import { Workers } from "./components/farm/Workers";
import { Crops } from "./components/farm/Crops";
import { Machines } from "./components/farm/Machines";
import { Fertilizers } from "./components/farm/Fertilizers";
import { Tasks } from "./components/farm/Tasks";
import { MarketplaceDashboard } from "./components/marketplace/MarketplaceDashboard";
import { Browse } from "./components/marketplace/Browse";
import { MyListings } from "./components/marketplace/MyListings";
import { Orders } from "./components/marketplace/Orders";
import { Messages } from "./components/Messages";
import { Profile } from "./components/Profile";
import { ProductDetail } from "./components/ProductDetail";

// Guard: redirect to login if not authenticated
function requireAuth() {
  if (!sessionStorage.getItem('philagri-auth')) {
    return <Navigate to="/login" replace />;
  }
  return null;
}

export const router = createBrowserRouter([
  // Public routes
  { path: "/login", Component: Login },
  { path: "/", element: <Navigate to="/login" replace /> },

  // Protected routes (inside Layout)
  {
    path: "/",
    Component: Layout,
    children: [
      { path: "select-role", Component: RoleSelection },

      // Farm Owner routes
      { path: "farm/dashboard",   Component: FarmDashboard },
      { path: "farm/workers",     Component: Workers },
      { path: "farm/crops",       Component: Crops },
      { path: "farm/machines",    Component: Machines },
      { path: "farm/fertilizers", Component: Fertilizers },
      { path: "farm/tasks",       Component: Tasks },

      // Marketplace routes
      { path: "marketplace/dashboard",   Component: MarketplaceDashboard },
      { path: "marketplace/browse",      Component: Browse },
      { path: "marketplace/my-listings", Component: MyListings },
      { path: "marketplace/orders",      Component: Orders },

      // Shared routes
      { path: "messages",    Component: Messages },
      { path: "profile",     Component: Profile },
      { path: "product/:id", Component: ProductDetail },
    ],
  },
]);
