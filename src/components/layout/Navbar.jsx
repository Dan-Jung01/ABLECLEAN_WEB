import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import Logo from "../../assets/logo.svg?react";
import { SECTION_IDS } from "../../constants/nav";
import { scrollToSectionId } from "../../utils/scroll";

const NAV_ITEMS = [
  { label: "체크리스트", id: SECTION_IDS.checklist },
  { label: "가격", id: SECTION_IDS.pricing },
  { label: "작업 과정", id: SECTION_IDS.process },
  { label: "후기", id: SECTION_IDS.reviews },
  { label: "FAQ", id: SECTION_IDS.faq },
];

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* ✅ 스크롤 감지 */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (id) => {
    scrollToSectionId(id);
    setDrawerOpen(false);
  };

  return (
    <>
      {/* ================== AppBar ================== */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: scrolled ? "primary.main" : "transparent",
          color: "#fff", // ✅ 항상 흰색
          transition: "background-color 240ms ease",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.15)"
            : "1px solid transparent",
          backdropFilter: scrolled ? "none" : "blur(6px)",
        }}
      >
        <Toolbar
          sx={{
            minHeight: { xs: 56, md: 64 },
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* ===== 로고 ===== */}
          <Box
            onClick={() => scrollToSectionId(SECTION_IDS.home)}
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              color: "inherit", // SVG 로고 색 상속
            }}
          >
            <Logo style={{ height: 32, width: "auto" }} />
          </Box>

          {/* ===== 데스크톱 메뉴 ===== */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 1,
            }}
          >
            {NAV_ITEMS.map((item) => (
              <Button
                key={item.id}
                color="inherit"
                onClick={() => handleNavClick(item.id)}
                sx={{
                  fontWeight: 800,
                  opacity: 0.9,
                  "&:hover": { opacity: 1 },
                }}
              >
                {item.label}
              </Button>
            ))}

            {/* 예약 문의 버튼 */}
            <Button
              onClick={() => handleNavClick(SECTION_IDS.contact)}
              sx={{
                ml: 1,
                px: 2.2,
                py: 0.9,
                borderRadius: 999,
                fontWeight: 900,
                bgcolor: "#fff",
                color: "primary.main",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.92)",
                },
              }}
            >
              예약 문의
            </Button>
          </Box>

          {/* ===== 모바일 메뉴 버튼 ===== */}
          <IconButton
            color="inherit"
            sx={{ display: { xs: "inline-flex", md: "none" } }}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* ================== Drawer (Mobile) ================== */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 260 }}>
          {/* Drawer 상단 로고 */}
          <Box
            sx={{
              px: 2,
              py: 2,
              bgcolor: "primary.main",
              color: "#fff",
            }}
          >
            <Logo style={{ height: 28, width: "auto" }} />
          </Box>

          <List>
            {NAV_ITEMS.map((item) => (
              <ListItem key={item.id} disablePadding>
                <ListItemButton onClick={() => handleNavClick(item.id)}>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{ fontWeight: 800 }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider />

          <Box sx={{ p: 2 }}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => handleNavClick(SECTION_IDS.contact)}
              sx={{
                fontWeight: 900,
                borderRadius: 2,
              }}
            >
              예약 문의하기
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
