import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Typography,
  Chip,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { scrollToSectionId } from "../utils/scroll";
import { SECTION_IDS } from "../constants/nav";

export default function Hero() {
  // ✅ 여기만 수정하면 이미지 교체 가능
  const images = useMemo(
    () => [
      "/images/a.jpg",
      "/images/b.jpg",
    ],
    []
  );

  const [index, setIndex] = useState(0);

  const goPrev = () => setIndex((p) => (p - 1 + images.length) % images.length);
  const goNext = () => setIndex((p) => (p + 1) % images.length);

  // 자동 슬라이드 (원하면 끄거나 간격 변경 가능)
  useEffect(() => {
    const t = setInterval(() => {
      setIndex((p) => (p + 1) % images.length);
    }, 4500);
    return () => clearInterval(t);
  }, [images.length]);

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",

        // ✅ 이전과 같은 섹션 크기 느낌 (세로 여백 방식)
        py: { xs: 10, md: 20 },
      }}
    >
      {/* 배경 이미지 레이어들 (페이드 전환) */}
      {images.map((src, i) => (
        <Box
          key={src}
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url("${src}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transition: "opacity 900ms ease",
            opacity: i === index ? 1 : 0,
            transform: i === index ? "scale(1.02)" : "scale(1.00)", // 살짝 고급스러운 느낌
            willChange: "opacity, transform",
          }}
        />
      ))}

      {/* 어두운 오버레이 */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.60) 100%)",
        }}
      />

      {/* 콘텐츠 */}
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Stack spacing={2.4} sx={{ maxWidth: 820 }}>
          <Chip
            label="부산 · 김해 출장 가능"
            sx={{
              width: "fit-content",
              bgcolor: "rgba(255,255,255,0.15)",
              color: "#fff",
              fontWeight: 900,
              backdropFilter: "blur(6px)",
            }}
          />

          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: 34, sm: 42, md: 52 },
              lineHeight: 1.1,
              fontWeight: 900,
              color: "#fff",
              letterSpacing: -0.6,
              textShadow: "0 6px 24px rgba(0,0,0,0.55)",
            }}
          >
            보이지 않는 곰팡이까지
            <br />
            <Box component="span" sx={{ color: "#eaf3ff" }}>
              분해·세척·살균
            </Box>
            으로 깨끗하게
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: 15, md: 18 },
              color: "rgba(255,255,255,0.92)",
              maxWidth: 680,
              textShadow: "0 4px 18px rgba(0,0,0,0.45)",
            }}
          >
            초기 창업이라 더 꼼꼼하게, 더 정직하게 합니다.
            냄새·곰팡이·미세먼지 걱정을 줄이고
            쾌적한 바람을 되찾아드려요.
          </Typography>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.2} sx={{ pt: 0.5 }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => scrollToSectionId(SECTION_IDS.contact)}
              sx={{
                py: 1.2,
                boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
              }}
            >
              예약 / 문의하기
            </Button>

            <Button
              variant="outlined"
              size="large"
              onClick={() => scrollToSectionId(SECTION_IDS.services)}
              sx={{
                py: 1.2,
                borderColor: "rgba(255,255,255,0.9)",
                color: "#fff",
                "&:hover": {
                  borderColor: "#fff",
                  backgroundColor: "rgba(255,255,255,0.08)",
                },
              }}
            >
              서비스 보기
            </Button>
          </Stack>
        </Stack>

        {/* 슬라이더 컨트롤 (오른쪽 아래) */}
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{
            position: "absolute",
            right: { xs: 16, md: 24 },
            bottom: { xs: 16, md: 24 },
            zIndex: 2,
          }}
        >
          <IconButton
            onClick={goPrev}
            size="small"
            aria-label="prev"
            sx={{
              color: "#fff",
              bgcolor: "rgba(0,0,0,0.35)",
              "&:hover": { bgcolor: "rgba(0,0,0,0.5)" },
            }}
          >
            <ChevronLeftIcon />
          </IconButton>

          {/* dots */}
          <Stack direction="row" spacing={0.7} sx={{ px: 0.5 }}>
            {images.map((_, i) => (
              <Box
                key={i}
                onClick={() => setIndex(i)}
                sx={{
                  width: i === index ? 18 : 8,
                  height: 8,
                  borderRadius: 999,
                  cursor: "pointer",
                  transition: "all 250ms ease",
                  bgcolor: i === index ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.45)",
                }}
              />
            ))}
          </Stack>

          <IconButton
            onClick={goNext}
            size="small"
            aria-label="next"
            sx={{
              color: "#fff",
              bgcolor: "rgba(0,0,0,0.35)",
              "&:hover": { bgcolor: "rgba(0,0,0,0.5)" },
            }}
          >
            <ChevronRightIcon />
          </IconButton>
        </Stack>
      </Container>
    </Box>
  );
}
