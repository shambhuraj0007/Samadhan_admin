import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import Index from "./pages/Index";
import Issues from "./pages/Issues";
import Analytics from "./pages/Analytics";
import Users from "./pages/Users";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="issues" element={<Issues />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="users" element={<Users />} />
            <Route path="map" element={<div className="p-6"><h1 className="text-2xl font-bold">Map View Coming Soon</h1></div>} />
            <Route path="reports" element={<div className="p-6"><h1 className="text-2xl font-bold">Reports Coming Soon</h1></div>} />
            <Route path="settings" element={<div className="p-6"><h1 className="text-2xl font-bold">Settings Coming Soon</h1></div>} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
