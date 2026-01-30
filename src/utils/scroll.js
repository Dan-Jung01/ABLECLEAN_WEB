/**
 * Smooth-scroll to a section id with a fixed header offset.
 */
export function scrollToSectionId(sectionId, offsetPx = 84) {
  const el = document.getElementById(sectionId);
  if (!el) return;

  const y = el.getBoundingClientRect().top + window.scrollY - offsetPx;
  window.scrollTo({ top: y, behavior: "smooth" });
}
