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

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const HOME_ID = SECTION_IDS.hero || SECTION_IDS.home;

  const NAV_ITEMS = [
    { label: "홈", id: HOME_ID },
    { label: "체크리스트", id: SECTION_IDS.checklist },
    { label: "가격", id: SECTION_IDS.pricing },
    { label: "작업 과정", id: SECTION_IDS.process },
    { label: "후기", id: SECTION_IDS.reviews },
    { label: "FAQ", id: SECTION_IDS.faq },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (id) => {
    scrollToSectionId(id);
    setDrawerOpen(false);
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          // ✅ 상단: 투명 블러 / 스크롤 후: 테마색
          backgroundColor: scrolled ? "#175191" : "rgba(0, 0, 0, 0.25)",
          backdropFilter: scrolled ? "none" : "blur(12px)",
          WebkitBackdropFilter: scrolled ? "none" : "blur(12px)",

          backgroundImage: "none",
          boxShadow: "none",
          transition: "background-color 240ms ease, backdrop-filter 240ms ease",
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar
          sx={{
            minHeight: { xs: 56, md: 64 },
            display: "flex",
            justifyContent: "space-between",
            px: 2,
          }}
        >
          {/* 로고: 클릭 시 상단 이동 */}
          <Box
            onClick={() => handleNav(HOME_ID)}
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              // ✅ 스크롤 후에만 흰색 강제
              ...(scrolled && {
                "& svg path, & svg g, & svg rect, & svg circle, & svg polygon": {
                  fill: "#fff !important",
                },
                "& svg [stroke]": { stroke: "#fff !important" },
              }),
            }}
          >
            <Logo style={{ height: 32, width: "auto", display: "block" }} />
          </Box>

          {/* 데스크탑 메뉴 */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 0.5 }}>
            {NAV_ITEMS.map((item) => (
              <Button
                key={item.id}
                onClick={() => handleNav(item.id)}
                sx={{
                  color: "#fff",
                  fontWeight: 800,
                  opacity: 0.9,
                  "&:hover": {
                    opacity: 1,
                    backgroundColor: "rgba(255,255,255,0.12)",
                  },
                }}
              >
                {item.label}
              </Button>
            ))}

            <Button
              onClick={() => handleNav(SECTION_IDS.contact)}
              sx={{
                ml: 1,
                px: 2.2,
                py: 0.9,
                borderRadius: 999,
                fontWeight: 900,
                backgroundColor: "#fff",
                color: "#175191",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.9)" },
              }}
            >
              예약 문의
            </Button>
          </Box>

          {/* 모바일 햄버거 */}
          <IconButton
            onClick={() => setDrawerOpen(true)}
            sx={{ color: "#fff", display: { xs: "flex", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* 모바일 Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 260 }}>
          <Box sx={{ px: 2, py: 2, backgroundColor: "#175191" }}>
            <Logo style={{ height: 28 }} />
          </Box>

          <List>
            {NAV_ITEMS.map((item) => (
              <ListItem key={item.id} disablePadding>
                <ListItemButton onClick={() => handleNav(item.id)}>
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
              onClick={() => handleNav(SECTION_IDS.contact)}
              sx={{ fontWeight: 900 }}
            >
              예약 문의하기
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
