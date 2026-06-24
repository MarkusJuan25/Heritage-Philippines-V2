import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout.jsx";
import RouteSkeleton from "../components/RouteSkeleton.jsx";
import PageMeta from "../components/PageMeta.jsx";

const HomePage             = lazy(() => import("../pages/HomePage.jsx"));
const PackagesPage         = lazy(() => import("../pages/PackagesPage.jsx"));
const TourPage             = lazy(() => import("../pages/TourPage.jsx"));
const TourDetailPage       = lazy(() => import("../pages/TourDetailPage.jsx"));
const GalleryPage          = lazy(() => import("../pages/GalleryPage.jsx"));
const StoriesPage          = lazy(() => import("../pages/StoriesPage.jsx"));
const AboutPage            = lazy(() => import("../pages/AboutPage.jsx"));
const ContactPage          = lazy(() => import("../pages/ContactPage.jsx"));
const PrivacyPolicyPage    = lazy(() => import("../pages/PrivacyPolicyPage.jsx"));
const TermsConditionsPage  = lazy(() => import("../pages/TermsConditionsPage.jsx"));

const renderLazyPage = (PageComponent, meta) => (
  <Suspense fallback={<RouteSkeleton />}>
    {meta && <PageMeta {...meta} />}
    <PageComponent />
  </Suspense>
);

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route
          path="/"
          element={renderLazyPage(HomePage, {
            title: "Heritage Philippines | Curated Cultural Journeys",
            description:
              "Discover carefully hosted cultural journeys, heritage destinations, and meaningful travel experiences across the Philippine archipelago.",
          })}
        />
        <Route
          path="/packages"
          element={renderLazyPage(PackagesPage, {
            title: "Philippine Travel Packages | Heritage Philippines",
            description:
              "Plan a meaningful Philippine journey with flexible travel packages, curated itineraries, and personalized heritage experiences.",
          })}
        />
        <Route
          path="/tour"
          element={renderLazyPage(TourPage, {
            title: "Philippine Heritage Tours | Heritage Philippines",
            description:
              "Explore curated heritage tours across Luzon, Visayas, and Mindanao, with cultural experiences designed for every Philippine province.",
          })}
        />
        <Route path="/tour/:slug" element={renderLazyPage(TourDetailPage)} />
        <Route
          path="/gallery"
          element={renderLazyPage(GalleryPage, {
            title: "Travel Gallery | Heritage Philippines",
            description:
              "Explore photographs and videos celebrating the landscapes, traditions, communities, and cultural heritage of the Philippines.",
          })}
        />
        <Route
          path="/stories"
          element={renderLazyPage(StoriesPage, {
            title: "Travel Stories | Heritage Philippines",
            description:
              "Read stories inspired by Philippine destinations, cultural traditions, local communities, and thoughtfully hosted journeys.",
          })}
        />
        <Route
          path="/about"
          element={renderLazyPage(AboutPage, {
            title: "About Us | Heritage Philippines",
            description:
              "Learn how Heritage Philippines plans carefully hosted journeys rooted in culture, local knowledge, and meaningful human connection.",
          })}
        />
        <Route
          path="/contact"
          element={renderLazyPage(ContactPage, {
            title: "Contact Us | Heritage Philippines",
            description:
              "Contact Heritage Philippines to discuss your travel plans, request assistance, or begin creating a personalized cultural journey.",
          })}
        />
        <Route
          path="/privacy-policy"
          element={renderLazyPage(PrivacyPolicyPage, {
            title: "Privacy Policy | Heritage Philippines",
            description:
              "Read how Heritage Philippines collects, uses, protects, and manages personal information submitted through its website and services.",
          })}
        />
        <Route
          path="/terms-and-conditions"
          element={renderLazyPage(TermsConditionsPage, {
            title: "Terms & Conditions | Heritage Philippines",
            description:
              "Review the terms and conditions governing the use of the Heritage Philippines website, travel inquiries, and related services.",
          })}
        />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
