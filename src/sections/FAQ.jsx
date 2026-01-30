import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Section from "../components/layout/Section";
import { SECTION_IDS } from "../constants/nav";
import SectionHeader from "../components/layout/SectionHeader";

const FAQS = [
  {
    q: "현장 방문 시 추가 금액이 발생하나요?",
    a: [
      "벽걸이 송풍팬 분해 시 20,000원의 비용이 발생할 수 있습니다. (제품에 따라 분해가 불가한 경우가 있어 현장 기사님과 조율)",
      "3m 이상 고소 작업 시 위험작업비(30,000원)가 청구될 수 있습니다.",
      "일부 모델(예: 듀얼/오브제/특정 라인업)은 구조상 추가 공임이 발생할 수 있어요.",
    ],
  },
  {
    q: "예약 후 일정 조율은 어떻게 하나요?",
    a: [
      "원하시는 날짜/시간대를 남겨주시면 순차적으로 확인 후 확정 연락을 드립니다.",
      "성수기에는 예약이 빠르게 마감될 수 있어 미리 문의 주시면 좋아요.",
    ],
  },
  {
    q: "작업이 불가능한 경우가 있나요?",
    a: [
      "설치 구조상 분해가 불가능하거나, 전기/배수 환경이 위험한 경우 작업이 제한될 수 있습니다.",
      "현장 점검 후 안전을 최우선으로 안내드립니다.",
    ],
  },
  {
    q: "에어컨 청소 시 어떤 약품을 사용하나요?",
    a: [
      "기본적으로 내부 세척용 약품 + 살균/탈취 케어를 진행합니다.",
      "민감하신 경우(영유아/반려동물/알레르기) 사전 요청 시 작업 방식을 안내드려요.",
    ],
  },
];

function AnswerList({ items }) {
  return (
    <Stack spacing={2}>
      {items.map((t, idx) => (
        <Box key={idx} sx={{ display: "flex", gap: 1.5 }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: 999,
              display: "grid",
              placeItems: "center",
              bgcolor: "rgba(23,81,145,0.10)",
              color: "primary.main",
              fontWeight: 900,
              flexShrink: 0,
            }}
          >
            A
          </Box>

          <Typography
            color="text.secondary"
            sx={{
              lineHeight: 1.8,
              fontSize: { xs: 14, md: 15 },
              pt: 0.5,
            }}
          >
            {idx + 1}. {t}
          </Typography>
        </Box>
      ))}
    </Stack>
  );
}

function FaqItem({ item, expanded, onToggle }) {
  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        borderColor: expanded ? "rgba(23,81,145,0.35)" : "divider",
        boxShadow: expanded ? "0 14px 30px rgba(0,0,0,0.10)" : "none",
        transition: "all 180ms ease",
      }}
    >
      {/* Q 헤더 */}
      <Box
        onClick={onToggle}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onToggle();
        }}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          px: { xs: 2, md: 2.5 },
          py: { xs: 2, md: 2.2 },
          cursor: "pointer",
          bgcolor: expanded ? "primary.main" : "rgba(23,81,145,0.04)",
          color: expanded ? "#fff" : "text.primary",
          transition: "all 180ms ease",
        }}
      >
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 999,
              display: "grid",
              placeItems: "center",
              bgcolor: expanded ? "rgba(255,255,255,0.18)" : "rgba(23,81,145,0.10)",
              color: expanded ? "#fff" : "primary.main",
              fontWeight: 900,
              flexShrink: 0,
            }}
          >
            Q
          </Box>

          <Typography sx={{ fontWeight: 900, fontSize: { xs: 15, md: 16 } }}>
            {item.q}
          </Typography>
        </Stack>

        <IconButton
          size="small"
          sx={{
            color: expanded ? "#fff" : "primary.main",
            bgcolor: expanded ? "rgba(255,255,255,0.18)" : "rgba(23,81,145,0.10)",
            "&:hover": {
              bgcolor: expanded ? "rgba(255,255,255,0.22)" : "rgba(23,81,145,0.14)",
            },
          }}
        >
          {expanded ? <RemoveIcon /> : <AddIcon />}
        </IconButton>
      </Box>

      {/* A 본문 */}
      {expanded ? (
        <CardContent
          sx={{
            p: { xs: 2, md: 2.5 },
            borderTop: "1px solid",
            borderColor: "rgba(23,81,145,0.15)",
            bgcolor: "#fff",
          }}
        >
          <AnswerList items={item.a} />
        </CardContent>
      ) : null}
    </Card>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <Section id={SECTION_IDS.faq} title={null} subtitle={null}>
      <Container maxWidth="md">
        {/* ✅ 중앙 헤더 */}
        <SectionHeader
          eyebrow="FAQ"
          title="고객님들이 자주 묻는 질문"
          subtitle="자주 문의 주시는 내용을 미리 정리했어요. 더 궁금한 점은
                    문의하기에서 편하게 연락 주세요."
        />

        {/* ✅ Q&A 리스트 (중앙 폭) */}
        <Stack spacing={2}>
          {FAQS.map((item, idx) => (
            <FaqItem
              key={item.q}
              item={item}
              expanded={openIndex === idx}
              onToggle={() => setOpenIndex((p) => (p === idx ? -1 : idx))}
            />
          ))}
        </Stack>
      </Container>
    </Section>
  );
}



// import React, { useState } from "react";
// import {
//   Box,
//   Container,
//   Stack,
//   Typography,
//   Collapse,
//   IconButton,
// } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import RemoveIcon from "@mui/icons-material/Remove";
// import Section from "../components/layout/Section";
// import { SECTION_IDS } from "../constants/nav";

// const FAQS = [
//   {
//     q: "청소 주기는 얼마나 자주가 좋나요?",
//     a: "가정용은 보통 1년에 1회(사용량이 많으면 6개월~1년) 권장됩니다. 냄새/알레르기/미세먼지 민감도가 높다면 더 자주 관리하는 게 좋아요.",
//   },
//   {
//     q: "아이/반려동물이 있어도 괜찮나요?",
//     a: "작업 중에는 환기 및 안전을 우선으로 안내드리고, 잔여물이 남지 않도록 충분히 세척/건조 후 마무리합니다. 민감하시면 사전 상담에서 별도 요청도 가능해요.",
//   },
//   {
//     q: "작업 시간은 얼마나 걸리나요?",
//     a: "타입/오염도에 따라 다르지만, 일반적으로 벽걸이 1~1.5시간, 스탠드 1.5~2.5시간, 시스템은 대수에 따라 안내드립니다.",
//   },
//   {
//     q: "청소 후 냄새가 다시 날 수도 있나요?",
//     a: "냄새 원인(곰팡이/배수/환경)에 따라 재발 가능성이 있어요. 내부 세척 + 살균 후에도 사용 환경(환기/필터 관리)에 따라 차이가 나며, 필요 시 관리 방법을 안내드립니다.",
//   },
// ];

// function FaqRow({ item, expanded, onToggle, isLast }) {
//   return (
//     <Box
//       sx={{
//         borderBottom: isLast ? "1px solid rgba(23, 81, 145, 0.18)" : "1px solid rgba(23, 81, 145, 0.18)",
//       }}
//     >
//       {/* 질문 줄 */}
//       <Box
//         onClick={onToggle}
//         role="button"
//         tabIndex={0}
//         onKeyDown={(e) => {
//           if (e.key === "Enter" || e.key === " ") onToggle();
//         }}
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           gap: 2,
//           py: 2,
//           cursor: "pointer",
//           userSelect: "none",
//         }}
//       >
//         <Typography
//           sx={{
//             fontWeight: 900,
//             color: expanded ? "primary.main" : "text.primary",
//             transition: "color 160ms ease",
//             fontSize: { xs: 15, md: 16 },
//           }}
//         >
//           {item.q}
//         </Typography>

//         <IconButton
//           size="small"
//           aria-label={expanded ? "collapse" : "expand"}
//           sx={{
//             color: expanded ? "primary.main" : "rgba(0,0,0,0.45)",
//           }}
//         >
//           {expanded ? <RemoveIcon /> : <AddIcon />}
//         </IconButton>
//       </Box>

//       {/* 답변 */}
//       <Collapse in={expanded} timeout={260} unmountOnExit>
//         <Box sx={{ pb: 2 }}>
//           <Typography
//             color="text.secondary"
//             sx={{
//               fontSize: { xs: 14, md: 15 },
//               lineHeight: 1.75,
//               pr: { xs: 1, md: 6 },
//             }}
//           >
//             {item.a}
//           </Typography>
//         </Box>
//       </Collapse>

//       {/* 강조 라인(열렸을 때만) */}
//       <Box
//         sx={{
//           height: 2,
//           width: "100%",
//           bgcolor: expanded ? "primary.main" : "transparent",
//           transition: "background-color 160ms ease",
//         }}
//       />
//     </Box>
//   );
// }

// export default function FAQ() {
//   const [openIndex, setOpenIndex] = useState(0);

//   return (
//     <Section id={SECTION_IDS.faq} title={null} subtitle={null}>
//       <Container maxWidth="md">
//         {/* 헤더 */}
//         <Stack spacing={1} alignItems="center" textAlign="center" sx={{ mb: 3 }}>
//           <Typography
//             sx={{
//               fontWeight: 900,
//               fontSize: 18,
//               letterSpacing: 2,
//               color: "primary.main",
//             }}
//           >
//             FAQ
//           </Typography>

//           <Box
//             sx={{
//               width: "100%",
//               height: 1,
//               bgcolor: "rgba(0,0,0,0.12)",
//               maxWidth: 520,
//             }}
//           />
//         </Stack>

//         {/* 리스트형 FAQ */}
//         <Box
//           sx={{
//             borderTop: "1px solid rgba(23, 81, 145, 0.18)",
//           }}
//         >
//           {FAQS.map((item, idx) => (
//             <FaqRow
//               key={item.q}
//               item={item}
//               expanded={openIndex === idx}
//               onToggle={() => setOpenIndex((prev) => (prev === idx ? -1 : idx))}
//               isLast={idx === FAQS.length - 1}
//             />
//           ))}
//         </Box>

//         {/* 아래 안내 */}
//         <Typography
//           variant="body2"
//           color="text.secondary"
//           sx={{ mt: 2, textAlign: "center" }}
//         >
//           더 궁금한 점은 문의 섹션에서 편하게 연락 주세요.
//         </Typography>
//       </Container>
//     </Section>
//   );
// }
