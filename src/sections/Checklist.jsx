import React, { useMemo, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import Section from "../components/layout/Section";
import { SECTION_IDS } from "../constants/nav";
import { scrollToSectionId } from "../utils/scroll";
import SectionHeader from "../components/layout/SectionHeader";

const DEFAULT_ITEMS = [
  "에어컨 켤 때 냄새가 나서 여름마다 스트레스다",
  "아이·부모님이 자주 기침을 한다",
  "작년 여름 이후 에어컨 청소를 안 했다",
  "여름엔 예약이 너무 밀려 불편했다",
  "바람이 약해지고 전기요금이 늘어난 것 같다",
];

export default function Checklist() {
  const items = useMemo(() => DEFAULT_ITEMS, []);
  const [checked, setChecked] = useState(() => items.map(() => false));
  const checkedCount = checked.filter(Boolean).length;

  const toggle = (idx) => {
    setChecked((prev) => prev.map((v, i) => (i === idx ? !v : v)));
  };
  const reset = () => setChecked(items.map(() => false));

  const result = useMemo(() => {
    if (checkedCount === 0) {
      return {
        title: "해당되는 항목을 체크해보세요.",
        desc: "체크 결과는 저장되지 않으며, 상담을 강요하지 않습니다.",
      };
    }
    if (checkedCount === 1) {
      return {
        title: "1개 해당돼요. 상태 점검을 추천해요.",
        desc: "사용 환경/냄새 유무에 따라 체감이 달라질 수 있어요.",
      };
    }
    if (checkedCount === 2) {
      return {
        title: "2개 이상이면 내부 오염 가능성이 높아요.",
        desc: "성수기 전에 예약하면 일정 조율이 훨씬 수월합니다.",
      };
    }
    return {
      title: "여러 항목이 해당돼요. 청소로 체감 개선이 큰 편입니다.",
      desc: "곰팡이·냄새 원인 제거와 냉방 효율 개선에 도움이 될 수 있어요.",
    };
  }, [checkedCount]);

  return (
    <Section id={SECTION_IDS.checklist} title={null} subtitle={null}>
      <Container maxWidth="md">
        {/* ✅ 타이틀 중앙 */}
        <SectionHeader
          eyebrow="CHECKLIST"
          title="이런 고민을 한 번이라도 해보셨나요?"
          subtitle="해당되는 항목을 체크해보세요. 선택 결과에 따라 안내해드려요."
        />

        {/* ✅ 체크리스트: 사진처럼 각진 박스 + 체크박스 */}
        <Stack spacing={2}>
          {items.map((text, idx) => {
            const isOn = checked[idx];

            return (
              <Box
                key={text}
                role="button"
                tabIndex={0}
                onClick={() => toggle(idx)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") toggle(idx);
                }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  px: { xs: 2, md: 3 },
                  py: { xs: 2, md: 2.2 },

                  border: "1px solid",
                  borderColor: "rgba(0,0,0,0.75)", // ✅ 굵은 테두리 느낌
                  borderRadius: 1, // ✅ 각지게(사진 느낌)

                  bgcolor: isOn ? "rgba(23,81,145,0.05)" : "#fff",
                  cursor: "pointer",
                  transition: "background-color 160ms ease",
                  "&:hover": {
                    bgcolor: isOn ? "rgba(23,81,145,0.07)" : "rgba(23,81,145,0.03)",
                  },
                }}
              >
                {/* 체크박스 */}
                <Box
                  sx={{
                    width: 22,
                    height: 22,
                    border: "2px solid",
                    borderColor: isOn ? "primary.main" : "rgba(0,0,0,0.55)",
                    borderRadius: 0,
                    display: "grid",
                    placeItems: "center",
                    flexShrink: 0,
                    bgcolor: isOn ? "primary.main" : "#fff",
                    transition: "all 160ms ease",
                  }}
                >
                  <Box
                    sx={{
                      width: 10,
                      height: 6,
                      borderLeft: "2px solid #fff",
                      borderBottom: "2px solid #fff",
                      transform: "rotate(-45deg)",
                      opacity: isOn ? 1 : 0,
                      transition: "opacity 120ms ease",
                    }}
                  />
                </Box>

                {/* 텍스트 */}
                <Typography
                  sx={{
                    fontWeight: 900,
                    fontSize: { xs: 15, md: 16 },
                    lineHeight: 1.45,
                  }}
                >
                  {text}
                </Typography>
              </Box>
            );
          })}
        </Stack>

        {/* 하단 컨트롤 */}
        <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography color="text.secondary" variant="body2">
            선택 {checkedCount} / {items.length}
          </Typography>

          <Button
            variant="text"
            onClick={reset}
            disabled={checkedCount === 0}
            sx={{ fontWeight: 900 }}
          >
            초기화
          </Button>
        </Box>

        {/* ✅ 결과(하단) + 버튼 2개 비율 */}
        <Box
          sx={{
            mt: 3,
            border: "1px solid",
            borderColor: "rgba(23,81,145,0.22)",
            bgcolor: "rgba(23,81,145,0.03)",
            borderRadius: 1, // ✅ 각지게
            p: { xs: 2, md: 2.5 },
          }}
        >
          <Stack spacing={0.8}>
            <Typography sx={{ fontWeight: 900, fontSize: { xs: 16, md: 18 } }}>
              {result.title}
            </Typography>
            <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
              {result.desc}
            </Typography>
          </Stack>

          <Grid container spacing={1.2} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={7}>
              <Button
                fullWidth
                size="large"
                variant="contained"
                onClick={() => scrollToSectionId(SECTION_IDS.contact)}
                sx={{ py: 1.2, fontWeight: 900 }}
              >
                예약 / 문의하기
              </Button>
            </Grid>
            <Grid item xs={12} sm={5}>
              <Button
                fullWidth
                size="large"
                variant="outlined"
                onClick={() => scrollToSectionId(SECTION_IDS.pricing)}
                sx={{
                  py: 1.2,
                  fontWeight: 900,
                  borderColor: "rgba(23,81,145,0.6)",
                  "&:hover": {
                    borderColor: "primary.main",
                    bgcolor: "rgba(23,81,145,0.06)",
                  },
                }}
              >
                가격 먼저 보기
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Section>
  );
}
