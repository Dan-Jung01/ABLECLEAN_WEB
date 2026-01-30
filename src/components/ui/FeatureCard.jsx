import React from "react";
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";

export default function FeatureCard({ icon, title, desc }) {
  return (
    <Card variant="outlined" sx={{ height: "100%" }}>
      <CardContent>
        <Stack spacing={1.2}>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: 999,
              display: "grid",
              placeItems: "center",
              bgcolor: "rgba(23, 81, 145, 0.10)",
              color: "primary.main",
            }}
          >
            {icon}
          </Box>
          <Typography variant="h6">{title}</Typography>
          <Typography color="text.secondary">{desc}</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
