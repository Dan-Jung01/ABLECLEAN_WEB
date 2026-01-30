import React from "react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import InstagramIcon from "@mui/icons-material/Instagram";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ForumIcon from "@mui/icons-material/Forum";
import Section from "../components/layout/Section";
import { SECTION_IDS } from "../constants/nav";
import SectionHeader from "../components/layout/SectionHeader";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import AccessTimeIcon from "@mui/icons-material/AccessTime";


// 채널별 컬러 정의
const CHANNELS = [
  {
    title: "카카오 채널",
    subtitle: "가장 빠른 상담 / 예약",
    color: "#FEE500",
    textColor: "#3A1D1D",
    icon: <ChatIcon sx={{ fontSize: 34 }} />,
    href: "https://pf.kakao.com/카카오채널_URL",
  },
  {
    title: "인스타그램",
    subtitle: "작업 사진 / 후기 보기",
    color: "#E1306C",
    textColor: "#E1306C",
    icon: <InstagramIcon sx={{ fontSize: 34 }} />,
    href: "https://instagram.com/인스타_URL",
  },
  {
    title: "당근",
    subtitle: "지역 고객 상담 / 예약",
    color: "#FF7A00",
    textColor: "#FF7A00",
    icon: <StorefrontIcon sx={{ fontSize: 34 }} />,
    href: "https://www.daangn.com/당근_URL",
  },
  {
    title: "네이버 톡톡",
    subtitle: "네이버에서 바로 문의",
    color: "#03C75A",
    textColor: "#03C75A",
    icon: <ForumIcon sx={{ fontSize: 34 }} />,
    href: "https://talk.naver.com/톡톡_URL",
  },
];

function ChannelCard({ title, subtitle, color, textColor, icon, href }) {
  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: 1,
        border: `1.5px solid ${color}`,
        backgroundColor: "#fff",
        transition: "transform 180ms ease, box-shadow 180ms ease",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 16px 36px rgba(0,0,0,0.12)",
        },
      }}
    >
      <CardActionArea
        onClick={() => window.open(href, "_blank", "noopener,noreferrer")}
        sx={{ height: "100%" }}
      >
        <CardContent sx={{ p: { xs: 3, md: 3.5 } }}>
          <Stack spacing={1.8} alignItems="flex-start">
            {/* 아이콘 */}
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: 999,
                display: "grid",
                placeItems: "center",
                border: `2px solid ${color}`,
                color: textColor,
              }}
            >
              {icon}
            </Box>

            {/* 텍스트 */}
            <Stack spacing={0.4}>
              <Typography sx={{ fontWeight: 900, fontSize: 18 }}>
                {title}
              </Typography>
              <Typography color="text.secondary">
                {subtitle}
              </Typography>
            </Stack>

            {/* 버튼 */}
            <Button
              variant="outlined"
              sx={{
                mt: 1,
                borderRadius: 999,
                px: 2.5,
                fontWeight: 900,
                color: textColor,
                borderColor: color,
                "&:hover": {
                  borderColor: color,
                  backgroundColor: `${color}15`,
                },
              }}
            >
              바로가기
            </Button>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default function Contact() {
  return (
    <Section id={SECTION_IDS.contact} title={null} subtitle={null}>
      <Box sx={{ py: { xs: 7, md: 9 }, backgroundColor: "#ffffff" }}>
        <Container maxWidth="lg">
          {/* 헤더 */}
          <SectionHeader
            eyebrow="CONTACT"
            title="예약 · 문의하기"
            subtitle="카카오채널, 인스타그램, 당근, 네이버 톡톡 중 편한 채널로 연락 주세요."
          />

          {/* ✅ 대표전화 강조 영역 (아이콘 + 즉시 연결 배지 + 상담 시간) */}
          <Box
            sx={{
              mb: 4,
              p: { xs: 2, md: 2.5 },
              borderRadius: 1,
              border: "1px solid",
              borderColor: "rgba(23,81,145,0.20)",
              bgcolor: "rgba(23,81,145,0.03)",
            }}
          >
            <Stack spacing={1.2} alignItems="center" textAlign="center">
              <Stack direction="row" spacing={1} alignItems="center">
                <PhoneInTalkIcon sx={{ color: "primary.main" }} />

                <Typography
                  sx={{
                    fontWeight: 900,
                    fontSize: { xs: 14, md: 16 },
                    color: "text.secondary",
                    letterSpacing: 1,
                  }}
                >
                  대표전화
                </Typography>

                <Box
                  sx={{
                    ml: 0.5,
                    px: 1,
                    py: 0.35,
                    borderRadius: 999,
                    bgcolor: "primary.main",
                    color: "#fff",
                    fontWeight: 900,
                    fontSize: 12,
                    letterSpacing: 0.4,
                  }}
                >
                  즉시 연결
                </Box>
              </Stack>

              <Typography
                component="a"
                href="tel:010-4671-0536"
                sx={{
                  fontWeight: 900,
                  fontSize: { xs: 28, md: 38 },
                  color: "primary.main",
                  textDecoration: "none",
                  letterSpacing: -0.6,
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                010-4671-0536
              </Typography>

              <Stack direction="row" spacing={1} alignItems="center">
                <AccessTimeIcon sx={{ color: "rgba(0,0,0,0.55)" }} />
                <Typography color="text.secondary" sx={{ fontWeight: 700 }}>
                  상담 가능 시간: 09:00–20:00
                </Typography>
              </Stack>

              <Typography variant="body2" color="text.secondary">
                * 부재 시 문자/채널로 남겨주시면 순차적으로 연락드려요.
              </Typography>
            </Stack>
          </Box>


          {/* 채널 카드 */}
          <Grid container spacing={3}>
            {CHANNELS.map((item) => (
              <Grid item xs={12} sm={6} md={3} key={item.title}>
                <ChannelCard {...item} />
              </Grid>
            ))}
          </Grid>

          {/* 하단 안내 */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 4, textAlign: "center" }}
          >
            * 채널별 운영 시간 및 응답 속도는 다를 수 있습니다.
          </Typography>
        </Container>
      </Box>
    </Section>
  );
}
