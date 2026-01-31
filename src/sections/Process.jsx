import React from "react";
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import FactCheckIcon from "@mui/icons-material/FactCheck"; // 상태 체크
import ShieldIcon from "@mui/icons-material/Shield"; // 보양 작업
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest"; // 완전 분해
import ScienceIcon from "@mui/icons-material/Science"; // 약품 도포
import CleaningServicesIcon from "@mui/icons-material/CleaningServices"; // 부품 세척
import BuildCircleIcon from "@mui/icons-material/BuildCircle"; // 재조립
import AcUnitIcon from "@mui/icons-material/AcUnit"; // 시운전
import TaskAltIcon from "@mui/icons-material/TaskAlt"; // 마무리 정리
import SupportAgentIcon from "@mui/icons-material/SupportAgent"; // 사후관리 안내

import Section from "../components/layout/Section";
import { SECTION_IDS } from "../constants/nav";
import BeforeAfterSlider from "../components/ui/BeforeAfterSlider";
import SectionHeader from "../components/layout/SectionHeader";


const STEPS = [
  { title: "상태 체크", icon: <FactCheckIcon sx={{ fontSize: 44 }} /> },
  { title: "오염방지 보양작업", icon: <ShieldIcon sx={{ fontSize: 44 }} /> },
  { title: "제품 완벽 분해", icon: <SettingsSuggestIcon sx={{ fontSize: 44 }} /> },
  { title: "약품 도포", icon: <ScienceIcon sx={{ fontSize: 44 }} /> },
  { title: "부품 세척", icon: <CleaningServicesIcon sx={{ fontSize: 44 }} /> },
  { title: "기기 재조립", icon: <BuildCircleIcon sx={{ fontSize: 44 }} /> },
  { title: "에어컨 시운전", icon: <AcUnitIcon sx={{ fontSize: 44 }} /> },
  { title: "마무리 정리", icon: <TaskAltIcon sx={{ fontSize: 44 }} /> },
  { title: "사후관리 안내", icon: <SupportAgentIcon sx={{ fontSize: 44 }} /> },
];

function ArrowDot() {
  return (
    <Box
      sx={{
        width: 32,
        height: 32,
        borderRadius: 999,
        bgcolor: "primary.main", // ✅ 우리 테마색
        color: "#fff",
        display: "grid",
        placeItems: "center",
        boxShadow: "0 10px 18px rgba(23, 81, 145, 0.25)",
      }}
    >
      <ArrowForwardIosIcon sx={{ fontSize: 14 }} />
    </Box>
  );
}

/**
 * 모바일(3열)에서도 "카드 - 화살표 - 카드" 느낌이 나게:
 * - 카드 컨테이너에 오른쪽 중앙 화살표를 올려두되
 * - 너무 튀어나오지 않게 (right:-10~-12)
 * - 마지막 카드에서는 화살표 숨김
 */
function ProcessCard({ title, icon, showArrow }) {
  return (
    <Box sx={{ position: "relative" }}>
      <Card
        variant="outlined"
        sx={{
          height: "100%",
          borderRadius: 2,
          borderColor: "divider",
          boxShadow: "0 10px 26px rgba(0,0,0,0.05)",
          transition:
            "transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease",
          "&:hover": {
            transform: "translateY(-3px)",
            boxShadow: "0 16px 36px rgba(0,0,0,0.10)",
            borderColor: "rgba(23, 81, 145, 0.22)",
          },
        }}
      >
        <CardContent
          sx={{
            px: { xs: 2.2, md: 4 },
            py: { xs: 2.6, md: 4 },
          }}
        >
          <Stack spacing={1.8} alignItems="center" textAlign="center">
            <Box sx={{ color: "primary.main" }}>{icon}</Box>

            <Typography
              sx={{
                fontWeight: 900,
                fontSize: { xs: 14, sm: 15, md: 18 },
                lineHeight: 1.25,
              }}
            >
              {title}
            </Typography>
          </Stack>
        </CardContent>
      </Card>

      {showArrow ? (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            right: { xs: -12, sm: -14, md: -16 },
            zIndex: 3,

            // ✅ 모바일에서 너무 겹치면 살짝만 줄이기
            "@media (max-width: 420px)": {
              right: -10,
              transform: "translateY(-50%) scale(0.92)",
            },
          }}
        >
          <ArrowDot />
        </Box>
      ) : null}
    </Box>
  );
}

export default function Process() {
  return (
    <Section id={SECTION_IDS.process} title={null} subtitle={null}>
      <Container maxWidth="lg">
        {/* 상단 타이틀 (이미지 느낌) */}
        <SectionHeader
          eyebrow="PROCESS"
          title="세척 프로세스 9단계"
          subtitle="상태 점검부터 마무리 정리까지, 체계적인 절차로 꼼꼼하게 진행합니다."
        />

        {/* ✅ 모바일에서도 3열이 나오게: xs=4(12/4=3) */}
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {STEPS.map((s, idx) => (
            <Grid key={s.title} item xs={4} sm={6} md={4}>
              <ProcessCard
                title={s.title}
                icon={s.icon}
                showArrow={idx !== STEPS.length - 1}
              />
            </Grid>
          ))}
        </Grid>

        {/* ✅ 전/후 비교 섹션은 그대로 유지 */}
<Box sx={{ mt: 5 }}>
  <Typography sx={{ fontWeight: 900, mb: 1 }}>
    눈으로 확인하는 세척 전·후 차이
  </Typography>
  <Typography color="text.secondary" sx={{ mb: 2 }}>
    가운데 바를 좌우로 움직여 전/후를 비교해보세요.
  </Typography>

  <Stack spacing={4}>
    {/* 1) 열교환기 */}
    <Box>
      <Typography sx={{ fontWeight: 900, mb: 0.5 }}>
        열교환기(냉각핀) 세척 전·후
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 1.5 }}>
        곰팡이·먼지로 막힌 냉각핀이 정리되면 냄새와 냉방 효율 체감이 좋아질 수 있어요.
      </Typography>

      <BeforeAfterSlider
        beforeSrc="/images/before-after/fan-a.jpg"
        afterSrc="/images/before-after/fan-b.jpg"
        labelBefore="BEFORE"
        labelAfter="AFTER"
        height={{ xs: 220, md: 420 }}
      />
    </Box>

    {/* 2) 송풍팬 */}
    <Box>
      <Typography sx={{ fontWeight: 900, mb: 0.5 }}>
        송풍팬 세척 전·후
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 1.5 }}>
        악취의 원인이 되는 내부 오염을 집중 세척해 쾌적한 바람을 목표로 합니다.
      </Typography>

      <BeforeAfterSlider
        beforeSrc="/images/before-after/drain_b.jpg"
        afterSrc="/images/before-after/drain_a.jpg"
        labelBefore="BEFORE"
        labelAfter="AFTER"
        height={{ xs: 220, md: 420 }}
      />
    </Box>

    {/* 3) 필터/외관 */}
    <Box>
      <Typography sx={{ fontWeight: 900, mb: 0.5 }}>
        필터·외관 세척 전·후
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 1.5 }}>
        눈에 보이는 먼지와 오염을 정리하고, 마무리 후 작동 상태까지 확인합니다.
      </Typography>

      <BeforeAfterSlider
        beforeSrc="/images/before-after/front_b.jpg"
        afterSrc="/images/before-after/front_a.jpg"
        labelBefore="BEFORE"
        labelAfter="AFTER"
        height={{ xs: 220, md: 420 }}
      />
    </Box>
  </Stack>
</Box>



      </Container>
    </Section>
  );
}
