import React from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import ChatIcon from "@mui/icons-material/Chat";
import InstagramIcon from "@mui/icons-material/Instagram";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ForumIcon from "@mui/icons-material/Forum";

import { SECTION_IDS } from "../../constants/nav";
import { scrollToSectionId } from "../../utils/scroll";

const BRAND = {
  name: "에이블클린",
  tagline: "에어컨 분해·세척·살균 전문",
  phone: "010-4671-0536",
  hours: "09:00–20:00 (주말 가능)",
  area: "부산 · 김해 (그 외 지역은 상담)",
  address: "부산광역시 강서구 명지국제6로99",
  email: "ableclean0113@gmail.com",

  // ✅ 아래 사업자 정보는 실제 값으로 꼭 교체하세요
  ceo: "구준형, 정대한",
  bizNo: "873-15-03068",
};

const CHANNELS = [
  {
    label: "카카오 채널",
    icon: <ChatIcon />,
    href: "http://pf.kakao.com/_YjxfhX",
  },
  {
    label: "인스타그램",
    icon: <InstagramIcon />,
    href: "https://www.instagram.com/ableclean.official?igsh=MWdvNTM0bjEwZzExdw==",
  },
  {
    label: "당근",
    icon: <StorefrontIcon />,
    href: "https://www.daangn.com/kr/local-profile/v5zjosz11945/",
  },
  {
    label: "네이버 톡톡",
    icon: <ForumIcon />,
    href: "https://talk.naver.com/ct/w1y8wto?frm=mnmb&frm=nmb_detail#nafullscreen",
  },
];

function InfoRow({ icon, label, value, href }) {
  return (
    <Stack direction="row" spacing={1.2} alignItems="flex-start">
      <Box sx={{ color: "rgba(255,255,255,0.92)", mt: "2px" }}>{icon}</Box>
      <Stack spacing={0.2}>
        <Typography variant="caption" sx={{ opacity: 0.85 }}>
          {label}
        </Typography>

        {href ? (
          <MuiLink
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            underline="hover"
            sx={{ color: "rgba(255,255,255,0.95)", fontWeight: 800 }}
          >
            {value}
          </MuiLink>
        ) : (
          <Typography sx={{ color: "rgba(255,255,255,0.95)", fontWeight: 800 }}>
            {value}
          </Typography>
        )}
      </Stack>
    </Stack>
  );
}

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        bgcolor: "#0f3b6b", // 다크 톤 푸터(기존과 조화)
        color: "rgba(255,255,255,0.92)",
        borderTop: "1px solid rgba(255,255,255,0.10)",
      }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 6 } }}>
        <Grid container spacing={{ xs: 4, md: 6 }}>
          {/* 1) 브랜드/소개 */}
          <Grid item xs={12} md={4}>
            <Stack spacing={1.2}>
              <Typography sx={{ fontWeight: 900, fontSize: 20 }}>
                {BRAND.name}
              </Typography>
              <Typography sx={{ opacity: 0.9 }}>{BRAND.tagline}</Typography>

              <Typography variant="body2" sx={{ opacity: 0.85, lineHeight: 1.7 }}>
                보이지 않는 곰팡이·냄새 원인을 분해 세척으로 꼼꼼하게 관리합니다.
                고객 일정과 공간을 배려하는 작업을 약속드려요.
              </Typography>

              <Stack direction="row" spacing={1}>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => scrollToSectionId(SECTION_IDS.contact)}
                  sx={{
                    bgcolor: "#ffffff",
                    color: "#175191",
                    fontWeight: 900,
                    "&:hover": { bgcolor: "rgba(255,255,255,0.92)" },
                  }}
                >
                  예약/문의
                </Button>

                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => scrollToSectionId(SECTION_IDS.pricing)}
                  sx={{
                    borderColor: "rgba(255,255,255,0.55)",
                    color: "rgba(255,255,255,0.95)",
                    fontWeight: 900,
                    "&:hover": {
                      borderColor: "#fff",
                      bgcolor: "rgba(255,255,255,0.08)",
                    },
                  }}
                >
                  가격 보기
                </Button>
              </Stack>
            </Stack>
          </Grid>

          {/* 2) 연락/운영 정보 */}
          <Grid item xs={12} md={4}>
            <Stack spacing={2}>
              <Typography sx={{ fontWeight: 900, fontSize: 16 }}>
                운영 정보
              </Typography>

              <InfoRow
                icon={<PhoneInTalkIcon fontSize="small" />}
                label="대표전화"
                value={BRAND.phone}
                href={`tel:${BRAND.phone.replaceAll("-", "")}`}
              />

              <InfoRow
                icon={<AccessTimeIcon fontSize="small" />}
                label="상담 가능 시간"
                value={BRAND.hours}
              />

              <InfoRow
                icon={<LocationOnIcon fontSize="small" />}
                label="서비스 지역"
                value={BRAND.area}
              />

              <InfoRow
                icon={<EmailIcon fontSize="small" />}
                label="이메일"
                value={BRAND.email}
                href={`mailto:${BRAND.email}`}
              />

              <Typography variant="caption" sx={{ opacity: 0.78, lineHeight: 1.6 }}>
                * 성수기에는 예약이 빠르게 마감될 수 있어요. 미리 문의 주시면
                일정 조율이 수월합니다.
              </Typography>
            </Stack>
          </Grid>

          {/* 3) 채널/바로가기/사업자 정보 */}
          <Grid item xs={12} md={4}>
            <Stack spacing={2}>
              <Typography sx={{ fontWeight: 900, fontSize: 16 }}>
                바로가기
              </Typography>

              {/* 섹션 링크 */}
              <Stack direction="row" flexWrap="wrap" useFlexGap spacing={1}>
                {[
                  { label: "체크리스트", id: SECTION_IDS.checklist },
                  { label: "가격", id: SECTION_IDS.pricing },
                  { label: "작업 과정", id: SECTION_IDS.process },
                  { label: "후기", id: SECTION_IDS.reviews },
                  { label: "FAQ", id: SECTION_IDS.faq },
                  { label: "예약/문의", id: SECTION_IDS.contact },
                ].map((x) => (
                  <Button
                    key={x.label}
                    size="small"
                    onClick={() => scrollToSectionId(x.id)}
                    sx={{
                      px: 1.2,
                      py: 0.6,
                      borderRadius: 2,
                      color: "rgba(255,255,255,0.92)",
                      bgcolor: "rgba(255,255,255,0.08)",
                      fontWeight: 900,
                      "&:hover": { bgcolor: "rgba(255,255,255,0.14)" },
                    }}
                  >
                    {x.label}
                  </Button>
                ))}
              </Stack>

              {/* 채널 아이콘 */}
              <Stack direction="row" spacing={1}>
                {CHANNELS.map((c) => (
                  <IconButton
                    key={c.label}
                    aria-label={c.label}
                    onClick={() => window.open(c.href, "_blank", "noopener,noreferrer")}
                    sx={{
                      color: "rgba(255,255,255,0.95)",
                      bgcolor: "rgba(255,255,255,0.10)",
                      "&:hover": { bgcolor: "rgba(255,255,255,0.16)" },
                    }}
                  >
                    {c.icon}
                  </IconButton>
                ))}
              </Stack>

              <Divider sx={{ borderColor: "rgba(255,255,255,0.14)" }} />

              {/* 사업자 정보 */}
              <Stack spacing={0.6}>
                <Typography sx={{ fontWeight: 900, fontSize: 15 }}>
                  사업자 정보
                </Typography>

                <Typography variant="body2" sx={{ opacity: 0.9, lineHeight: 1.7 }}>
                  상호: {BRAND.name} · 대표: {BRAND.ceo}
                  <br />
                  사업자등록번호: {BRAND.bizNo}
                  <br />
                  주소: {BRAND.address}
                </Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, borderColor: "rgba(255,255,255,0.14)" }} />

        {/* 하단 카피/약관 */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={1}
          justifyContent="space-between"
          alignItems={{ md: "center" }}
        >
          <Typography variant="caption" sx={{ opacity: 0.82 }}>
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </Typography>

          <Stack direction="row" spacing={2}>
            {/* 필요하면 실제 페이지/모달로 연결 */}
            <MuiLink
              href="#"
              underline="hover"
              sx={{ color: "rgba(255,255,255,0.85)", fontSize: 12, fontWeight: 800 }}
            >
              개인정보처리방침
            </MuiLink>
            <MuiLink
              href="#"
              underline="hover"
              sx={{ color: "rgba(255,255,255,0.85)", fontSize: 12, fontWeight: 800 }}
            >
              이용약관
            </MuiLink>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
