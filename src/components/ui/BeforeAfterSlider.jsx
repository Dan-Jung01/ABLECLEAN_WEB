import React, { useMemo, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";

const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  height = { xs: 220, sm: 280, md: 340 },
  initialPercent = 50, // 0~100
  labelBefore = "BEFORE",
  labelAfter = "AFTER",
}) {
  const rootRef = useRef(null);
  const draggingRef = useRef(false);
  const [percent, setPercent] = useState(() => clamp(initialPercent, 5, 95));

  const clipStyle = useMemo(() => {
    // BEFORE를 왼쪽부터 percent%만 보이게 (오른쪽을 잘라냄)
    const right = 100 - percent;
    return { clipPath: `inset(0 ${right}% 0 0)` };
  }, [percent]);

  const setFromClientX = (clientX) => {
    const el = rootRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPercent(clamp(next, 5, 95));
  };

  const onPointerDown = (e) => {
    draggingRef.current = true;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    setFromClientX(e.clientX);
  };

  const onPointerMove = (e) => {
    if (!draggingRef.current) return;
    setFromClientX(e.clientX);
  };

  const onPointerUp = () => {
    draggingRef.current = false;
  };

  return (
    <Box
      ref={rootRef}
      sx={{
        position: "relative",
        width: "100%",
        height,
        borderRadius: 2,
        overflow: "hidden",
        border: "1px solid",
        borderColor: "divider",
        boxShadow: "0 14px 34px rgba(0,0,0,0.06)",
        bgcolor: "#000",
      }}
    >
      {/* AFTER: 항상 전체를 꽉 채움 (고정) */}
      <Box
        component="img"
        src={afterSrc}
        alt="after"
        draggable={false}
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          pointerEvents: "none",
        }}
      />

      {/* BEFORE: 항상 전체를 꽉 채우고, clip-path로만 보여줄 부분을 조절 */}
      <Box
        component="img"
        src={beforeSrc}
        alt="before"
        draggable={false}
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          pointerEvents: "none",
          ...clipStyle,
        }}
      />

      {/* 라벨 */}
      <Box
        sx={{
          position: "absolute",
          left: 12,
          top: 12,
          px: 1.2,
          py: 0.6,
          borderRadius: 999,
          bgcolor: "rgba(0,0,0,0.45)",
          color: "#fff",
          fontWeight: 900,
          fontSize: 12,
          letterSpacing: 0.8,
          zIndex: 2,
        }}
      >
        {labelBefore}
      </Box>
      <Box
        sx={{
          position: "absolute",
          right: 12,
          top: 12,
          px: 1.2,
          py: 0.6,
          borderRadius: 999,
          bgcolor: "rgba(0,0,0,0.45)",
          color: "#fff",
          fontWeight: 900,
          fontSize: 12,
          letterSpacing: 0.8,
          zIndex: 2,
        }}
      >
        {labelAfter}
      </Box>

      {/* 중앙 라인 */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: `${percent}%`,
          transform: "translateX(-1px)",
          width: 2,
          height: "100%",
          bgcolor: "rgba(255,255,255,0.92)",
          boxShadow: "0 0 0 1px rgba(0,0,0,0.15)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* 핸들(유튜브처럼 드래그 전용) */}
      <Box
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        sx={{
          position: "absolute",
          top: "50%",
          left: `${percent}%`,
          transform: "translate(-50%, -50%)",
          width: 46,
          height: 46,
          borderRadius: 999,
          bgcolor: "rgba(23,81,145,0.95)", // 테마 포인트
          boxShadow: "0 10px 24px rgba(0,0,0,0.28)",
          display: "grid",
          placeItems: "center",
          zIndex: 3,
          cursor: "ew-resize",
          touchAction: "none", // ✅ 핸들에서만 스크롤 간섭 방지
        }}
        role="slider"
        aria-label="before after slider"
        aria-valuemin={5}
        aria-valuemax={95}
        aria-valuenow={Math.round(percent)}
        tabIndex={0}
        onKeyDown={(e) => {
          // 키보드 접근성(좌우 이동)
          if (e.key === "ArrowLeft") setPercent((p) => clamp(p - 2, 5, 95));
          if (e.key === "ArrowRight") setPercent((p) => clamp(p + 2, 5, 95));
        }}
      >
        <Typography
          sx={{
            color: "#fff",
            fontWeight: 900,
            fontSize: 18,
            lineHeight: 1,
            letterSpacing: -1,
            userSelect: "none",
          }}
        >
          ⇆
        </Typography>
      </Box>
    </Box>
  );
}
