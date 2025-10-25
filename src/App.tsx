import { Toaster } from "../src/components/ui/toaster";
import { Toaster as Sonner } from "../src/components/ui/sonner";
import { TooltipProvider } from "../src/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "../src/contexts/ThemeContext";
import { LanguageProvider } from "../src/contexts/LanguageContext";
import { Navbar } from "../src/components/Navbar";
import { Footer } from "../src/components/Footer";
import Home from "../src/pages/Home";
import About from "../src/pages/About";
import Sample from "../src/pages/Sample";
import Products from "../src/pages/Products";
import Testimoni from "../src/pages/Testimoni";
import Contact from "../src/pages/Contact";
import NotFound from "../src/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route
                path="/"
                element={<Home />}
              />
              <Route
                path="/about"
                element={<About />}
              />
              {/* <Route
                path="/sample"
                element={<Sample />}
              /> */}
              <Route
                path="/products"
                element={<Products />}
              />
              <Route
                path="/testimoni"
                element={<Testimoni />}
              />
              <Route
                path="/contact"
                element={<Contact />}
              />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route
                path="*"
                element={<NotFound />}
              />
            </Routes>
            <Footer />
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
