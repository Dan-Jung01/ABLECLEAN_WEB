import React from "react";
import { Box, Stack, Typography } from "@mui/material";

export default function SectionHeader({ eyebrow, title, subtitle }) {
  return (
    <Stack spacing={1} alignItems="center" textAlign="center" sx={{ mb: 5 }}>
      {eyebrow ? (
        <Typography
          sx={{
            fontWeight: 900,
            fontSize: 12,
            letterSpacing: 3,
            color: "primary.main",
          }}
        >
          {eyebrow}
        </Typography>
      ) : null}

      <Typography
        sx={{
          fontWeight: 900,
          fontSize: { xs: 28, md: 34 },
          letterSpacing: -0.4,
        }}
      >
        {title}
      </Typography>

      <Typography
        color="text.secondary"
        sx={{
          maxWidth: 760,
          fontSize: { xs: 14, md: 16 },
          lineHeight: 1.7,
        }}
      >
        {subtitle}
      </Typography>

      <Box
        sx={{
          width: 56,
          height: 4,
          borderRadius: 999,
          bgcolor: "primary.main",
          mt: 1,
        }}
      />
    </Stack>
  );
}
