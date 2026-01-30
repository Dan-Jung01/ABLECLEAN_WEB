import React from "react";
import { Button, Card, CardContent, Chip, Divider, Stack, Typography } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import { scrollToSectionId } from "../../utils/scroll";
import { SECTION_IDS } from "../../constants/nav";

export default function PricingCard({ title, price, bullets, badge }) {
  return (
    <Card
      sx={{
        height: "100%",
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="h6">{title}</Typography>
            {badge ? (
              <Chip
                label={badge}
                size="small"
                sx={{
                  bgcolor: "rgba(23, 81, 145, 0.10)",
                  color: "primary.main",
                  fontWeight: 800,
                }}
              />
            ) : null}
          </Stack>

          <Stack spacing={0.5}>
            <Typography variant="h4" sx={{ lineHeight: 1.1 }}>
              {price}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              * 현장 상황(오염도/설치 구조)에 따라 변동될 수 있어요.
            </Typography>
          </Stack>

          <Divider />

          <Stack spacing={1}>
            {bullets.map((b, i) => (
              <Stack key={i} direction="row" spacing={1} alignItems="flex-start">
                <VerifiedIcon sx={{ mt: 0.3, color: "primary.main" }} fontSize="small" />
                <Typography color="text.secondary">{b}</Typography>
              </Stack>
            ))}
          </Stack>

          <Button
            variant="contained"
            fullWidth
            onClick={() => scrollToSectionId(SECTION_IDS.contact)}
          >
            예약/문의하기
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
