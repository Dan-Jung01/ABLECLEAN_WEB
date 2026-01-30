import React from "react";
import { Box, Container, Stack, Typography } from "@mui/material";

/**
 * Reusable page section wrapper
 */
export default function Section({ id, title, subtitle, children }) {
  return (
    <Box
      id={id}
      sx={{
        py: { xs: 6, md: 9 },
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={1.5} sx={{ mb: 4 }}>
          {title ? <Typography variant="h4">{title}</Typography> : null}
          {subtitle ? (
            <Typography color="text.secondary" sx={{ maxWidth: 760 }}>
              {subtitle}
            </Typography>
          ) : null}
        </Stack>
        {children}
      </Container>
    </Box>
  );
}
