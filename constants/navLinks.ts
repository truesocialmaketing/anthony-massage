import { Routes } from "@/constants/routes";

// Retired per client direction: nav now mirrors the reference site's own
// page set (v39: Home · Approach · Your Session · Your Body · Therapists · Book) below, instead of the
// generic About/Services/Contact structure. Kept here, unused, in case the
// business nav is wanted again later.
//
// import services from "./services";
//
// // Six items, in this order, per Anthony: the order walks a visitor from
// curiosity to readiness, so Book sits last.
const items = [
  { id: "home", title: "Home", href: Routes.HOME },
  { id: "approach", title: "Approach", href: Routes.APPROACH },
  { id: "your-session", title: "Your Session", href: Routes.YOUR_SESSION },
  { id: "your-body", title: "Your Body", href: Routes.YOUR_BODY },
  { id: "therapists", title: "Therapists", href: Routes.THERAPISTS },
  { id: "book", title: "Book", href: Routes.BOOK },
];

export default items;

export const footerNavigationItems = items;

// Individual therapist pages sit behind Therapists, so it stays highlighted
// while one of them is open.
export const isNavItemActive = (href: string, pathname: string | null) =>
  pathname === href || (href === Routes.THERAPISTS && !!pathname?.startsWith("/therapist-"));
