import { Link } from "react-router-dom";

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-cream-50 pb-20 pt-28 sm:pb-24 sm:pt-32 md:pb-28 md:pt-36">
      <div className="container-page">
        <div className="mx-auto max-w-3xl">
          <div className="border-b border-coffee-200/40 pb-10 text-center">
            <p className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-gold-600">
              Legal
            </p>
            <h1 className="mt-3 font-serif text-3xl text-coffee-900 sm:text-4xl">
              Privacy Policy
            </h1>
            <p className="mt-3 text-sm text-coffee-700/60">
              Last updated: June 24, 2026
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-[1.85] text-coffee-800/80">
              Heritage Philippines is committed to respecting the privacy of
              everyone who visits this website. This page describes how we
              handle information submitted through our website. It is provided
              for informational purposes and does not constitute formal legal
              advice.
            </p>
          </div>

          <div className="mt-12 space-y-10 text-[15px] leading-[1.85] text-coffee-800/80">
            <section>
              <h2 className="font-serif text-xl text-coffee-900 sm:text-2xl">
                1. Information We Collect
              </h2>
              <p className="mt-4">
                When you submit a contact or quote request form on this
                website, we may collect the information you provide, which may
                include your name, email address, and details about your
                travel preferences, destinations of interest, travel dates,
                and any message you choose to share.
              </p>
              <p className="mt-3">
                We also receive standard technical information that web servers
                receive when you visit a website, such as your browser type and
                the page you are viewing.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-coffee-900 sm:text-2xl">
                2. How We Use Information
              </h2>
              <p className="mt-4">
                Information you submit is used to respond to your inquiry, to
                provide you with information about Heritage Philippines services,
                and to assist with planning the heritage journey you have
                described. We use the information only for the purpose for which
                it was submitted.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-coffee-900 sm:text-2xl">
                3. Quote and Contact Requests
              </h2>
              <p className="mt-4">
                Information submitted through our quote request or contact forms
                is used solely to respond to your inquiry and to assist with
                heritage tour planning. Submitting a form does not create a
                booking or reservation. Our team will follow up directly to
                discuss your plans and next steps.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-coffee-900 sm:text-2xl">
                4. Cookies and Security Services
              </h2>
              <p className="mt-4">
                This website may use cookies or similar technologies to support
                basic website functionality. Our forms use a security service
                to help prevent automated spam submissions. This service may
                collect limited technical information as part of its normal
                operation.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-coffee-900 sm:text-2xl">
                5. Data Sharing
              </h2>
              <p className="mt-4">
                We do not sell, rent, or trade your personal information. We
                may share information with service providers who assist us in
                operating this website and responding to inquiries, under
                appropriate confidentiality arrangements.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-coffee-900 sm:text-2xl">
                6. Data Security
              </h2>
              <p className="mt-4">
                We take reasonable steps to protect information submitted
                through this website. No method of data transmission over the
                internet is completely secure, and we cannot guarantee the
                absolute security of any information you send to us.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-coffee-900 sm:text-2xl">
                7. User Choices
              </h2>
              <p className="mt-4">
                If you have questions about information you have submitted
                through this website, or would like to make a request in
                relation to that information, please contact us using the
                details available on our{" "}
                <Link
                  to="/contact"
                  className="font-medium text-gold-600 underline underline-offset-2 hover:text-gold-700"
                >
                  Contact page
                </Link>
                .
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-coffee-900 sm:text-2xl">
                8. Updates to This Policy
              </h2>
              <p className="mt-4">
                We may update this Privacy Policy from time to time. Any
                changes will be reflected by the updated date shown at the top
                of this page. We encourage you to review this page
                periodically.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-coffee-900 sm:text-2xl">
                9. Contact Us
              </h2>
              <p className="mt-4">
                If you have any questions about this Privacy Policy, please
                contact our team through our{" "}
                <Link
                  to="/contact"
                  className="font-medium text-gold-600 underline underline-offset-2 hover:text-gold-700"
                >
                  Contact page
                </Link>{" "}
                or using the contact details shown on this website.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
