import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import ServiceAutomation from "./pages/ServiceAutomation.tsx";
import ServiceOptimization from "./pages/ServiceOptimization.tsx";
import ServiceDigital from "./pages/ServiceDigital.tsx";
import ServiceWorkflow from "./pages/ServiceWorkflow.tsx";
import Resources from "./pages/Resources.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/services/automation" element={<ServiceAutomation />} />
          <Route path="/services/optimization" element={<ServiceOptimization />} />
          <Route path="/services/digital-transformation" element={<ServiceDigital />} />
          <Route path="/services/workflow-consulting" element={<ServiceWorkflow />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
