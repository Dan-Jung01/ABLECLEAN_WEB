import React, { useEffect, useMemo, useRef, useState } from "react";
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
  const slides = useMemo(
    () => [
      {
        image: "/images/hero/hero-1.jpg",
        title: "보이지 않는 곰팡이까지\n분해·세척·살균",
        subtitle:
          "에어컨 내부 깊숙한 곳까지 완전 분해 세척으로\n냄새와 곰팡이의 원인을 제거합니다.",
      },
      {
        image: "/images/hero/hero-2.jpg",
        title: "여름 오기 전\n미리 준비하는 에어컨 청소",
        subtitle:
          "성수기 전 합리적인 가격으로\n쾌적한 여름을 준비하세요.",
      },
      {
        image: "/images/hero/hero-3.jpg",
        title: "가정·상가·사무실\n에어컨 전문 케어",
        subtitle:
          "벽걸이, 스탠드, 시스템 에어컨까지\n공간에 맞는 맞춤 세척을 제공합니다.",
      },
    ],
    []
  );

  const AUTO_MS = 6000;

  const [index, setIndex] = useState(0);
  const [timerKey, setTimerKey] = useState(0); // ✅ 유저 조작 시 타이머 리셋 트리거
  const timeoutRef = useRef(null);

  const current = slides[index];
  const animKey = `${index}-${current.title}`;

  // ✅ 이미지 프리로드
  useEffect(() => {
    slides.forEach((s) => {
      const img = new Image();
      img.src = s.image;
    });
  }, [slides]);

  // ✅ setTimeout 기반 자동 슬라이드 (timerKey 바뀌면 타이머 리셋)
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setIndex((p) => (p + 1) % slides.length);
      // 여기서는 timerKey를 안 바꿈: 자동으로는 계속 이어지게
    }, AUTO_MS);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [index, timerKey, slides.length]);

  // ✅ 타이머 리셋 함수
  const resetAutoTimer = () => setTimerKey((k) => k + 1);

  // ✅ 유저 조작 핸들러(이전/다음/도트)에서 타이머 리셋
  const goPrev = () => {
    setIndex((p) => (p - 1 + slides.length) % slides.length);
    resetAutoTimer();
  };
  const goNext = () => {
    setIndex((p) => (p + 1) % slides.length);
    resetAutoTimer();
  };
  const goTo = (i) => {
    setIndex(i);
    resetAutoTimer();
  };

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        py: { xs: 10, md: 14 },
        pb: { xs: 7, md: 14 },
      }}
    >
      {/* 배경 슬라이드 (crossfade) */}
      {slides.map((slide, i) => (
        <Box
          key={slide.image}
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url("${slide.image}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transition: "opacity 900ms ease",
            opacity: i === index ? 1 : 0,
            willChange: "opacity",
          }}
        />
      ))}

      {/* 오버레이 */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.62) 100%)",
        }}
      />

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

          {/* 타이틀: fade-up */}
          <Typography
            key={`${animKey}-title`}
            variant="h2"
            sx={{
              fontSize: { xs: 32, sm: 42, md: 52 },
              lineHeight: 1.15,
              fontWeight: 900,
              color: "#fff",
              whiteSpace: "pre-line",
              textShadow: "0 6px 24px rgba(0,0,0,0.55)",
              animation: "heroFadeUp 520ms ease both",
              "@keyframes heroFadeUp": {
                from: { opacity: 0, transform: "translateY(10px)" },
                to: { opacity: 1, transform: "translateY(0px)" },
              },
            }}
          >
            {current.title}
          </Typography>

          {/* 서브타이틀: 약간 딜레이 */}
          <Typography
            key={`${animKey}-sub`}
            sx={{
              mt: 0.5,
              fontSize: { xs: 15, md: 18 },
              color: "rgba(255,255,255,0.9)",
              whiteSpace: "pre-line",
              maxWidth: 680,
              textShadow: "0 4px 18px rgba(0,0,0,0.45)",
              animation: "heroFadeUp 520ms ease both",
              animationDelay: "90ms",
            }}
          >
            {current.subtitle}
          </Typography>

          {/* 버튼(유지) */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.2}>
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
              onClick={() => scrollToSectionId(SECTION_IDS.checklist)}
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

        {/* 컨트롤 (모바일 겹침 방지) */}
        <Box
          sx={{
            mt: { xs: 3, md: 0 },
            position: { xs: "relative", md: "absolute" },
            right: { md: 24 },
            bottom: { md: 24 },
            display: "flex",
            justifyContent: { xs: "flex-start", md: "flex-end" },
            zIndex: 2,
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
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
              {slides.map((_, i) => (
                <Box
                  key={i}
                  onClick={() => goTo(i)}
                  sx={{
                    width: i === index ? 18 : 8,
                    height: 8,
                    borderRadius: 999,
                    cursor: "pointer",
                    transition: "all 250ms ease",
                    bgcolor:
                      i === index
                        ? "rgba(255,255,255,0.95)"
                        : "rgba(255,255,255,0.45)",
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
        </Box>
      </Container>
    </Box>
  );
}
