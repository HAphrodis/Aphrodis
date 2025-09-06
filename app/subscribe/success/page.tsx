import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { createMetadata } from "@/app/metadata-utils";

export const metadata: Metadata = createMetadata({
  title: "Subscription Confirmed | Ishimwe Jean Baptiste Newsletter",
  description:
    "Thank you for subscribing to the Ishimwe Jean Baptiste newsletter",
  path: "/subscribe/success",
});

export default function SubscribeSuccessPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-white to-gray-100 p-4">
      <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-xl bg-white shadow-lg">
        <div className="p-8">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#11922f]/10">
              <CheckCircle2 className="h-10 w-10 text-[#11922f]" />
            </div>

            <h1 className="mb-4 text-2xl font-bold text-gray-800">
              Welcome to the Ishimwe Jean Baptiste Community!
            </h1>

            <p className="mb-6 text-gray-600">
              Thank you for subscribing to our newsletter. You&apos;ll now
              receive updates about our programs, impact stories, and ways to
              get involved.
            </p>
          </div>

          <div className="mb-8 rounded-lg bg-[#11922f]/5 p-6">
            <h2 className="mb-3 text-lg font-semibold text-[#11922f]">
              What to Expect
            </h2>
            <ul className="space-y-2">
              <li className="flex items-start">
                <div className="mt-0.5 mr-3 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#11922f] text-xs text-white">
                  ✓
                </div>
                <span>Monthly newsletter with program updates</span>
              </li>
              <li className="flex items-start">
                <div className="mt-0.5 mr-3 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#11922f] text-xs text-white">
                  ✓
                </div>
                <span>Stories from the communities we serve</span>
              </li>
              <li className="flex items-start">
                <div className="mt-0.5 mr-3 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#11922f] text-xs text-white">
                  ✓
                </div>
                <span>Opportunities to support our mission</span>
              </li>
              <li className="flex items-start">
                <div className="mt-0.5 mr-3 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#11922f] text-xs text-white">
                  ✓
                </div>
                <span>Exclusive content and impact reports</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-md bg-[#11922f] px-6 py-3 text-white transition-colors hover:bg-[#00753c]"
            >
              Return to Homepage
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>

            <Link
              href="/programs"
              className="inline-flex items-center justify-center rounded-md border border-[#11922f] bg-white px-6 py-3 text-[#11922f] transition-colors hover:bg-[#11922f]/10"
            >
              Explore Our Programs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
