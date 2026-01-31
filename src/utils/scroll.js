import ReactGA from "react-ga4";

export const scrollToSectionId = (id) => {
  const el = document.getElementById(id);
  if (!el) return;

  el.scrollIntoView({ behavior: "smooth" });

  ReactGA.event({
    category: "Navigation",
    action: "Scroll to section",
    label: id,
  });
};
