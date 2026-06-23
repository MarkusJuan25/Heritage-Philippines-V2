import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout.jsx";

const HomePage       = lazy(() => import("../pages/HomePage.jsx"));
const PackagesPage   = lazy(() => import("../pages/PackagesPage.jsx"));
const TourPage       = lazy(() => import("../pages/TourPage.jsx"));
const TourDetailPage = lazy(() => import("../pages/TourDetailPage.jsx"));
const GalleryPage    = lazy(() => import("../pages/GalleryPage.jsx"));
const StoriesPage    = lazy(() => import("../pages/StoriesPage.jsx"));
const AboutPage      = lazy(() => import("../pages/AboutPage.jsx"));
const ContactPage    = lazy(() => import("../pages/ContactPage.jsx"));

function RouteFallback() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[40vh] items-center justify-center"
    >
      <p className="text-sm font-medium tracking-wide text-coffee-700/60">
        Loading page…
      </p>
    </div>
  );
}

const renderLazyPage = (PageComponent) => (
  <Suspense fallback={<RouteFallback />}>
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
        <Route path="/contact"   element={renderLazyPage(ContactPage)} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
