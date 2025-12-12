import { Toaster } from "../src/components/ui/toaster";
import { Toaster as Sonner } from "../src/components/ui/sonner";
import { TooltipProvider } from "../src/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "../src/contexts/ThemeContext";
import { LanguageProvider } from "../src/contexts/LanguageContext";
import { Navbar } from "../src/components/Navbar";
import { Footer } from "../src/components/Footer";
import Home from "../src/pages/Home";
import About from "../src/pages/About";
import Products from "../src/pages/Products";
import Testimoni from "../src/pages/Testimoni";
import Contact from "../src/pages/Contact";
import NotFound from "../src/pages/NotFound";
import Invitation from "./pages/Invitation";
import SendInvitation from "./pages/InvitationGreeting";

const queryClient = new QueryClient();

function LayoutWrapper({ children }) {
  const location = useLocation();

  // daftar page yang tidak boleh pakai Navbar & Footer
  const hideLayoutRoutes = ["/riki-nufus","/riki-nufus/send"];

  const shouldHideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideLayout && <Navbar />}
      {children}
      {!shouldHideLayout && <Footer />}
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <LayoutWrapper>
              <Routes>
                <Route
                  path="/"
                  element={<Home />}
                />
                <Route
                  path="/about"
                  element={<About />}
                />
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

                {/* TANPA NAVBAR/FOOTER */}
                <Route
                  path="/riki-nufus"
                  element={<Invitation />}
                />
                <Route
                  path="/riki-nufus/send"
                  element={<SendInvitation />}
                />

                <Route
                  path="*"
                  element={<NotFound />}
                />
              </Routes>
            </LayoutWrapper>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
