import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import TwoFactorAuth from "./pages/TwoFactorAuth";
import Dashboard from "./pages/Dashboard";
import ProductManagement from "./pages/ProductManagement";
import OrderManagement from "./pages/OrderManagement";
import InventoryTracking from "./pages/InventoryTracking";
import CustomerRelationship from "./pages/CustomerRelationship";
// import BillGeneration from "./pages/BillGeneration";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Opinio from "./pages/Opinio";
import Games from "./games/Games";
import SpinTheWheel from "./games/SpinTheWheel";
import CreateNewWheel from "./games/CreateNewWheel";
import AskQuestion from "./games/AskQuestion";
import PaymentsAndSettlements from "./pages/PaymentsAndSettlements";
import Support from "./pages/Support";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-center" richColors />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/2fa" element={<TwoFactorAuth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<ProductManagement />} />
          <Route path="/orders" element={<OrderManagement />} />
          <Route path="/inventory" element={<InventoryTracking />} />
          <Route path="/customers" element={<CustomerRelationship />} />
          <Route path="/payments-and-settlements" element={<PaymentsAndSettlements />} />
          <Route path="/support" element={<Support />} />
          <Route path="/settings" element={<Settings />} />
          {/* <Route path="/bills" element={<BillGeneration />} /> */}
          <Route path="/profile" element={<Profile />} />

          <Route path="/games" element={<Games />} />
          <Route path="/games/spin-the-wheel" element={<SpinTheWheel />} />
          <Route path="/games/spin-the-wheel/create-new-wheel" element={<CreateNewWheel />} />
          <Route path="/games/opinio" element={<Opinio />} />
          <Route path="/games/opinio/ask-question" element={<AskQuestion />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
