import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout.jsx";
import RouteSkeleton from "../components/RouteSkeleton.jsx";

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

const renderLazyPage = (PageComponent) => (
  <Suspense fallback={<RouteSkeleton />}>
    <PageComponent />
  </Suspense>
);

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/"          element={renderLazyPage(HomePage)} />
        <Route path="/packages"  element={renderLazyPage(PackagesPage)} />
        <Route path="/tour"      element={renderLazyPage(TourPage)} />
        <Route path="/tour/:slug" element={renderLazyPage(TourDetailPage)} />
        <Route path="/gallery"   element={renderLazyPage(GalleryPage)} />
        <Route path="/stories"   element={renderLazyPage(StoriesPage)} />
        <Route path="/about"     element={renderLazyPage(AboutPage)} />
        <Route path="/contact"              element={renderLazyPage(ContactPage)} />
        <Route path="/privacy-policy"       element={renderLazyPage(PrivacyPolicyPage)} />
        <Route path="/terms-and-conditions" element={renderLazyPage(TermsConditionsPage)} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
