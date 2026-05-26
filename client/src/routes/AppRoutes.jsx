import { Route, Routes } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout.jsx";
import MemberLayout from "../layouts/MemberLayout.jsx";
import AdminLayout from "../layouts/AdminLayout.jsx";
import HomePage from "../pages/HomePage.jsx";
import PackagesPage from "../pages/PackagesPage.jsx";
import GalleryPage from "../pages/GalleryPage.jsx";
import StoriesPage from "../pages/StoriesPage.jsx";
import AboutPage from "../pages/AboutPage.jsx";
import MemberHomePage from "../pages/member/MemberHomePage.jsx";
import JourneyPage from "../pages/member/JourneyPage.jsx";
import BookingsPage from "../pages/member/BookingsPage.jsx";
import DocumentsPage from "../pages/member/DocumentsPage.jsx";
import AdminHomePage from "../pages/admin/AdminHomePage.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/packages" element={<PackagesPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/stories" element={<StoriesPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Route>

      <Route path="/member" element={<MemberLayout />}>
        <Route index element={<MemberHomePage />} />
        <Route path="journey" element={<JourneyPage />} />
        <Route path="bookings" element={<BookingsPage />} />
        <Route path="documents" element={<DocumentsPage />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminHomePage />} />
      </Route>
    </Routes>
  );
}
