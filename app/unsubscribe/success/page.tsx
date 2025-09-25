import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { createMetadata } from "@/app/metadata-utils";

export const metadata: Metadata = createMetadata({
  title: "Sorry to see you go | Aphrodis Newsletter",
  description:
    "You have been successfully unsubscribed from the Aphrodis newsletter",
  path: "/unsubscribe/success",
});

export default function UnsubscribeSuccessPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-white to-gray-100 p-4">
      <div className="mx-auto w-full max-w-md overflow-hidden rounded-xl bg-white shadow-lg">
        <div className="p-8 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#11922f]/10">
            <CheckCircle2 className="h-10 w-10 text-[#11922f]" />
          </div>

          <h1 className="mb-4 text-2xl font-bold text-gray-800">
            Unsubscribed Successfully
          </h1>

          <p className="mb-8 text-gray-600">
            You have been successfully unsubscribed from the Aphrodis newsletter. We&apos;re sorry to see you go and appreciate
            your feedback.
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/"
              className="inline-block rounded-md bg-[#11922f] px-6 py-3 text-white transition-colors hover:bg-[#00753c]"
            >
              Return to Homepage
            </Link>

            <Link
              href="/subscribe"
              className="inline-block rounded-md border border-[#11922f] bg-white px-6 py-3 text-[#11922f] transition-colors hover:bg-[#11922f]/10"
            >
              Resubscribe
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
