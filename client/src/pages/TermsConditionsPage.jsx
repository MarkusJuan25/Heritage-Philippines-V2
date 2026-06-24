import { Link } from "react-router-dom";

export default function TermsConditionsPage() {
  return (
    <div className="bg-cream-50 pb-20 pt-28 sm:pb-24 sm:pt-32 md:pb-28 md:pt-36">
      <div className="container-page">
        <div className="mx-auto max-w-3xl">
          <div className="border-b border-coffee-200/40 pb-10 text-center">
            <p className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-gold-600">
              Legal
            </p>
            <h1 className="mt-3 font-serif text-3xl text-coffee-900 sm:text-4xl">
              Terms &amp; Conditions
            </h1>
            <p className="mt-3 text-sm text-coffee-700/60">
              Last updated: June 24, 2026
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-[1.85] text-coffee-800/80">
              These Terms and Conditions govern your use of the Heritage
              Philippines website. By accessing or using this website, you
              agree to the terms described here. This page is provided for
              informational purposes and does not constitute formal legal
              advice.
            </p>
          </div>

          <div className="mt-12 space-y-10 text-[15px] leading-[1.85] text-coffee-800/80">
            <section>
              <h2 className="font-serif text-xl text-coffee-900 sm:text-2xl">
                1. Website Use
              </h2>
              <p className="mt-4">
                This website is provided for informational purposes about
                Heritage Philippines travel and tourism services. You may use
                it only for lawful, personal, and non-commercial purposes and
                in a manner that does not infringe on the rights of others.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-coffee-900 sm:text-2xl">
                2. Travel Information and Availability
              </h2>
              <p className="mt-4">
                Tour descriptions, itineraries, images, and pricing shown on
                this website are provided for general information purposes.
                Availability and pricing are subject to change and are not
                guaranteed until a booking has been confirmed directly with the
                Heritage Philippines team.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-coffee-900 sm:text-2xl">
                3. Quote Requests
              </h2>
              <p className="mt-4">
                Submitting a quote request through this website is an
                expression of interest and does not constitute a confirmed
                reservation or booking. Our team will follow up with current
                availability, pricing, and next steps based on your inquiry.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-coffee-900 sm:text-2xl">
                4. Bookings and Payments
              </h2>
              <p className="mt-4">
                Details of booking confirmation, payment terms, and applicable
                fees are communicated directly by the Heritage Philippines team
                following receipt of your inquiry. These arrangements are
                agreed separately and are not published on this website.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-coffee-900 sm:text-2xl">
                5. Changes and Cancellations
              </h2>
              <p className="mt-4">
                Policies regarding changes and cancellations will be
                communicated as part of your confirmed booking arrangements.
                Heritage Philippines reserves the right to modify or cancel
                tours due to circumstances beyond its reasonable control.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-coffee-900 sm:text-2xl">
                6. User Responsibilities
              </h2>
              <p className="mt-4">
                You are responsible for ensuring that any information you
                provide through this website is accurate. You agree not to use
                this website in any way that is unlawful, harmful, or
                disruptive to other users or to Heritage Philippines.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-coffee-900 sm:text-2xl">
                7. Intellectual Property
              </h2>
              <p className="mt-4">
                All content on this website — including text, images, graphics,
                and branding — is the property of Heritage Philippines or its
                licensors and is protected by applicable intellectual property
                laws. You may not reproduce, distribute, or modify any content
                without prior written permission.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-coffee-900 sm:text-2xl">
                8. External Services and Links
              </h2>
              <p className="mt-4">
                This website may contain links to external websites or services.
                Heritage Philippines is not responsible for the content,
                accuracy, or privacy practices of those sites. The presence of
                a link does not imply endorsement.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-coffee-900 sm:text-2xl">
                9. Limitation of Website Information
              </h2>
              <p className="mt-4">
                While we aim to keep information on this website accurate and
                up to date, Heritage Philippines makes no representation or
                warranty regarding the completeness, accuracy, or suitability
                of the information provided. Use of this website and reliance
                on its content is at your own discretion.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-coffee-900 sm:text-2xl">
                10. Updates to These Terms
              </h2>
              <p className="mt-4">
                Heritage Philippines may update these Terms and Conditions from
                time to time. Changes will be reflected by the updated date
                shown at the top of this page.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-coffee-900 sm:text-2xl">
                11. Contact Us
              </h2>
              <p className="mt-4">
                If you have questions about these Terms and Conditions, please
                contact us through our{" "}
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
