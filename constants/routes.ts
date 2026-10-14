export enum Routes {
  HOME = "/",
  APPROACH = "/approach",
  YOUR_SESSION = "/your-session",
  YOUR_BODY = "/your-body",
  THERAPISTS = "/therapists",
  THERAPIST_ANTHONY = "/therapist-anthony",
  THERAPIST_COLE_FRANCIS = "/therapist-cole-francis",
  THERAPIST_SONG_YING = "/therapist-song-ying",
  BOOK = "/book",

  // Retired — the site now mirrors the reference design's page set above.
  // The underlying app/ folders were renamed with a leading underscore so
  // Next.js no longer serves them at these paths; the values are kept here
  // (unused in nav) purely so the retired page files still compile.
  ABOUT = "/about-us",
  SERVICES = "/services",
  CONTACT = "/contact-us",
  PRIVACY_POLICY = "/privacy-policy",
  TERMS_AND_CONDITIONS = "/terms-and-conditions",
  THANK_YOU = "/thank-you",
}
