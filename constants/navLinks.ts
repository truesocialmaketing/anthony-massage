import { Routes } from "@/constants/routes";

// Retired per client direction: nav now mirrors the reference site's own
// page set (Approach/Conditions/Your Session/etc.) below, instead of the
// generic About/Services/Contact structure. Kept here, unused, in case the
// business nav is wanted again later.
//
// import services from "./services";
//
// export default [
//   { id: "home", title: "Home", href: Routes.HOME },
//   { id: "about", title: "About Us", href: Routes.ABOUT },
//   {
//     id: "services",
//     title: "Our Services",
//     href: Routes.SERVICES,
//     children: [...services.map((item) => ({ ...item, href: `${Routes.SERVICES}/${item.slug}` }))],
//   },
//   { id: "contact", title: "Contact Us", href: Routes.CONTACT },
// ];
//
// export const footerNavigationItems = [
//   { id: "home", title: "Home", href: Routes.HOME },
//   { id: "about", title: "About Us", href: Routes.ABOUT },
//   { id: "services", title: "Our Services", href: Routes.SERVICES },
//   { id: "contact", title: "Contact Us", href: Routes.CONTACT },
// ];

export default [
  { id: "home", title: "Home", href: Routes.HOME },
  { id: "approach", title: "Approach", href: Routes.APPROACH },
  { id: "conditions", title: "Conditions", href: Routes.CONDITIONS },
  { id: "your-session", title: "Your Session", href: Routes.YOUR_SESSION },
  { id: "working-together", title: "Working Together", href: Routes.WORKING_TOGETHER },
  { id: "resources", title: "Resources", href: Routes.RESOURCES },
  { id: "book", title: "Book", href: Routes.BOOK },
  { id: "anthony", title: "Anthony", href: Routes.ANTHONY },
];

export const footerNavigationItems = [
  { id: "home", title: "Home", href: Routes.HOME },
  { id: "approach", title: "Approach", href: Routes.APPROACH },
  { id: "conditions", title: "Conditions", href: Routes.CONDITIONS },
  { id: "your-session", title: "Your Session", href: Routes.YOUR_SESSION },
  { id: "working-together", title: "Working Together", href: Routes.WORKING_TOGETHER },
  { id: "resources", title: "Resources", href: Routes.RESOURCES },
  { id: "book", title: "Book", href: Routes.BOOK },
  { id: "anthony", title: "Anthony", href: Routes.ANTHONY },
];
