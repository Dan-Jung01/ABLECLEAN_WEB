import React from "react";
import useSectionViewGA from "../hook/useSectionViewGA";
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import Section from "../components/layout/Section";
import { SECTION_IDS } from "../constants/nav";
import SectionHeader from "../components/layout/SectionHeader";

const ITEMS = [
  {
    key: "wall",
    type: "벽걸이",
    title: "벽걸이형 (6평미만)",
    price: "90,000원~",
    image: "/images/pricing/wall01.jpg",
    bullets: ["액자형 에어컨 세척 불가능", "대량 및 야간 작업 시 상담 필수"],
    kind: "single",
  },
  {
    key: "stand",
    type: "스탠드",
    title: "스탠드형",
    price: "150,000원~",
    image: "/images/pricing/stand01.jpg",
    bullets: ["10평 단위로 1만원 추가", "대량 및 야간 작업 시 상담 필수"],
    kind: "single",
  },
  {
    key: "twoinone",
    type: "2 in 1",
    title: "2 in 1",
    price: "200,000원~",
    image: "/images/pricing/2in1.jpg",
    bullets: ["패키지 할인 적용", "대량 및 야간 작업 시 상담 필수"],
  },
  {
    key: "1way",
    type: "천정형 1WAY",
    title: "천정형 1WAY",
    price: "100,000원~",
    image: "/images/pricing/1way.jpg",
    bullets: ["대량 할인", "대량 및 야간 작업 시 상담 필수"],
    kind: "single",
  },
  {
    key: "4way",
    type: "천정형 4WAY",
    title: "천정형 4WAY",
    price: "150,000원~",
    image: "/images/pricing/4way.jpg",
    bullets: ["대량 할인", "대량 및 야간 작업 시 상담 필수"],
    kind: "single",
  },
];

function BulletList({ items }) {
  return (
    <Box component="ul" sx={{ m: 0, pl: 2.2 }}>
      {items.map((t) => (
        <Box
          key={t}
          component="li"
          sx={{
            color: "text.secondary",
            fontSize: 14,
            lineHeight: 1.7,
            mb: 0.5,
          }}
        >
          {t}
        </Box>
      ))}
    </Box>
  );
}

function ImageAreaSingle({ src, alt }) {
  return (
    <Box
      sx={{
        height: 250,
        bgcolor: "#f4f6f8",
        display: "grid",
        placeItems: "center",
        overflow: "hidden",
      }}
    >
      <Box
        component="img"
        src={src}
        alt={alt}
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "contain", // ✅ 제품컷 느낌 (잘리지 않게)
          transform: "scale(0.98)",
        }}
        draggable={false}
      />
    </Box>
  );
}

function PriceCard({ item }) {
  return (
    <Card
      variant="outlined"
      sx={{
        height: "100%",
        borderRadius: 1,
        overflow: "hidden",
        borderColor: "divider",
        transition: "transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 16px 40px rgba(0,0,0,0.10)",
          borderColor: "rgba(23,81,145,0.25)",
        },
      }}
    >
      {/* 상단 이미지 영역 */}
      <ImageAreaSingle src={item.image} alt={item.title} />

      {/* 하단 정보 영역 */}
      <CardContent sx={{ p: 3 }}>
        <Stack spacing={1.4} alignItems="center" textAlign="center">
          {/* 타입(큰 글자) */}
          <Typography sx={{ fontWeight: 900, fontSize: 22, letterSpacing: -0.2 }}>
            {item.type}
          </Typography>

          {/* 가격(테마색 강조) */}
          <Typography
            sx={{
              fontWeight: 900,
              fontSize: 30,
              color: "primary.main", // ✅ 우리 테마색
              letterSpacing: -0.4,
            }}
          >
            {item.price}
          </Typography>

          {/* bullet */}
          <Box sx={{ width: "100%", textAlign: "left", pt: 0.5 }}>
            <BulletList items={item.bullets} />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default function Pricing() {
  useSectionViewGA({
      sectionId: SECTION_IDS.pricing,
      eventName: "view_pricing_section",
      threshold: 0.6,
  });
  return (
    <Section id={SECTION_IDS.pricing} title={null} subtitle={null}>
      <Container maxWidth="lg">
        {/* 섹션 타이틀(깔끔하게) */}
        <SectionHeader
          eyebrow="PRICING"
          title="에어컨 종류별 가격 안내"
          subtitle="대표 가격을 기준으로 안내드려요. 현장 환경과 오염도에 따라 변동될 수 있습니다."
        />


        {/* 카드 그리드 */}
        <Grid container spacing={3}>
          {ITEMS.map((item) => (
            <Grid key={item.key} item xs={12} sm={6} md={4}>
              <PriceCard item={item} />
            </Grid>
          ))}
        </Grid>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 3, textAlign: "center" }}>
          * 오염도/설치환경/분해 난이도에 따라 현장 확인 후 변동될 수 있어요.
        </Typography>
      </Container>
    </Section>
  );
}
