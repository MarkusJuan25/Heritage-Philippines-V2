import InitialSiteLoader from "../components/InitialSiteLoader.jsx";
import ScrollToTop from "../components/ScrollToTop.jsx";
import AppRoutes from "../routes/AppRoutes.jsx";

export default function App() {
  return (
    <>
      <InitialSiteLoader />
      <ScrollToTop />
      <AppRoutes />
    </>
  );
}
