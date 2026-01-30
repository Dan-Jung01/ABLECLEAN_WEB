import React from "react";
import { Button, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import Section from "../components/layout/Section";
import { SECTION_IDS } from "../constants/nav";
import { scrollToSectionId } from "../utils/scroll";
import SectionHeader from "../components/layout/SectionHeader";

const REVIEWS = [
  { name: "부산 해운대 / 벽걸이", stars: 5, text: "냄새가 확 줄고 바람이 시원해졌어요. 작업도 깔끔하게 진행해주셨어요!" },
  { name: "김해 / 스탠드", stars: 5, text: "분해해서 꼼꼼히 보여주면서 설명해주셔서 믿음이 갔습니다." },
  { name: "사무실 / 시스템", stars: 5, text: "일정 조율이 빠르고, 작업 후 바닥 정리까지 완벽했어요." },
];

export default function Reviews() {
  return (
    <Section
      id={SECTION_IDS.reviews}
    >
      <SectionHeader
        eyebrow="REVIEWS"
        title="고객 후기"
        subtitle="실제 고객님의 후기를 바탕으로, 만족 포인트를 확인해보세요."
      />

      <Grid container spacing={2.5}>
        {REVIEWS.map((r, idx) => (
          <Grid key={idx} item xs={12} md={4}>
            <Card variant="outlined" sx={{ height: "100%" }}>
              <CardContent>
                <Stack spacing={1.2}>
                  <Typography sx={{ fontWeight: 900 }}>{r.name}</Typography>
                  <Stack direction="row" spacing={0.5}>
                    {Array.from({ length: r.stars }).map((_, i) => (
                      <StarIcon key={i} fontSize="small" sx={{ color: "primary.main" }} />
                    ))}
                  </Stack>
                  <Typography color="text.secondary">{r.text}</Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Stack sx={{ mt: 3, textAlign: "center" }} alignItems="center">
        <Button variant="outlined" onClick={() => scrollToSectionId(SECTION_IDS.contact)}>
          나도 예약하고 후기 남기기
        </Button>
      </Stack>
    </Section>
  );
}
