// Calendly scheduling for the Book page.
//
// Paste Anthony's scheduling link here (e.g. "https://calendly.com/anthony-massage-works/session")
// and the Book page swaps its placeholder for the live calendar. Leave it empty
// until then.
export const CALENDLY_URL = "";

// Calendly reads colour parameters from the embed URL, so the calendar sits in
// the dark reading panel instead of as a white box. Hex values without "#",
// matched to the interior panel (.exp-interior-body) and its gold accent.
export const CALENDLY_COLORS = {
  background_color: "16120b",
  text_color: "e4dbc2",
  primary_color: "f6d78e",
};

export const calendlyEmbedUrl = (url: string) => {
  const params = new URLSearchParams({ ...CALENDLY_COLORS, hide_gdpr_banner: "1" });
  return `${url}${url.includes("?") ? "&" : "?"}${params.toString()}`;
};
