import React, { useMemo } from "react";
import { Box, CssBaseline, Divider, ThemeProvider } from "@mui/material";
import { createAppTheme } from "./theme/theme";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Hero from "./sections/Hero";
import Checklist from "./sections/Checklist";
import Pricing from "./sections/Pricing";
import Process from "./sections/Process";
import Reviews from "./sections/Reviews";
import FAQ from "./sections/FAQ";
import Contact from "./sections/Contact";
import { SECTION_IDS } from "./constants/nav";

export default function App() {
  const theme = useMemo(() => createAppTheme(), []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Layout: footer at bottom even with short content */}
      <Box sx={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
        <Navbar theme={theme} />

        <Box component="main" sx={{ flex: 1 }}>
          {/* Anchor for top */}
          <Box id={SECTION_IDS.hero}>
            <Hero />
          </Box>

          <Divider />
          <Checklist />

          <Divider />
          <Process />

          <Divider />
          <Reviews />

          <Divider />
          <Pricing />

          <Divider />
          <FAQ />

          <Divider />
          <Contact />
        </Box>

        <Footer />
      </Box>
    </ThemeProvider>
  );
}
