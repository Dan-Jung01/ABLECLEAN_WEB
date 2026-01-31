import { useEffect, useRef } from "react";
import ReactGA from "react-ga4";

/**
 * 특정 섹션(id)이 화면에 일정 비율 이상 노출되면 GA 이벤트를 1회 전송
 * - threshold: 0~1 (0.6 = 60% 정도 보일 때)
 */
export default function useSectionViewGA({ sectionId, eventName, threshold = 0.6 }) {
  const firedRef = useRef(false);

  useEffect(() => {
    const el = document.getElementById(sectionId);
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        if (!firedRef.current && entry.isIntersecting && entry.intersectionRatio >= threshold) {
          firedRef.current = true;

          ReactGA.event({
            category: "conversion",
            action: eventName,
            label: sectionId,
          });
        }
      },
      { threshold: [threshold] }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [sectionId, eventName, threshold]);
}
