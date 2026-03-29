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
import About from "./pages/About.tsx";
import ArticleAutomationTransform from "./pages/articles/ArticleAutomationTransform.tsx";
import ArticleAffordableTools from "./pages/articles/ArticleAffordableTools.tsx";
import ArticleAiSmallTown from "./pages/articles/ArticleAiSmallTown.tsx";
import ArticleStreamlineOperations from "./pages/articles/ArticleStreamlineOperations.tsx";
import ArticleCommonInefficiencies from "./pages/articles/ArticleCommonInefficiencies.tsx";
import ArticleReduceCosts from "./pages/articles/ArticleReduceCosts.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/resources/how-automation-can-transform-rural-businesses" element={<ArticleAutomationTransform />} />
          <Route path="/resources/affordable-automation-tools" element={<ArticleAffordableTools />} />
          <Route path="/resources/ai-helping-small-town-businesses" element={<ArticleAiSmallTown />} />
          <Route path="/resources/streamline-operations-rural-business" element={<ArticleStreamlineOperations />} />
          <Route path="/resources/common-inefficiencies-rural-businesses" element={<ArticleCommonInefficiencies />} />
          <Route path="/resources/reduce-operational-costs" element={<ArticleReduceCosts />} />
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
