import { Link } from "react-router-dom";
import HeritageSection from "../components/HeritageSection";
import PageMeta from "../components/PageMeta.jsx";

export default function NotFoundPage() {
  return (
    <>
      <PageMeta
        title="Page Not Found | Heritage Philippines"
        description="The page you are looking for could not be found. Return to Heritage Philippines to explore curated heritage journeys across the Philippine archipelago."
        robots="noindex, nofollow"
      />
      <HeritageSection variant="primary" grow className="py-32">
        <div className="container-page text-center">
          <p className="font-serif text-[5rem] leading-none text-coffee-900/15">
            404
          </p>
          <h1 className="mt-5 font-serif text-3xl text-coffee-900">
            Page not found
          </h1>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-coffee-700/70">
            The page you are looking for does not exist or may have moved.
            <br />
            Head back to explore heritage journeys across the Philippine archipelago.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/"
              className="rounded-full bg-coffee-900 px-6 py-2.5 text-sm font-semibold text-cream-50 transition hover:bg-coffee-800"
            >
              Back to Home
            </Link>
            <Link
              to="/tour"
              className="rounded-full border border-coffee-900/30 px-6 py-2.5 text-sm font-semibold text-coffee-900 transition hover:border-coffee-900 hover:bg-coffee-900/5"
            >
              Explore Tours
            </Link>
          </div>
        </div>
      </HeritageSection>
    </>
  );
}
