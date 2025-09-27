import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { createMetadata } from "@/app/metadata-utils";
import { ParticlesBackground } from "@/components/shared/particles-background";
import { ServicesIconsBackground } from "@/components/shared/services-icons-background";

export const metadata: Metadata = createMetadata({
  title: "Subscription Confirmed | Aphrodis Newsletter",
  description: "Thank you for subscribing to the Aphrodis newsletter",
  path: "/subscribe/success",
});

export default function SubscribeSuccessPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center relative font-sans">
      {/* Background layers (pointer-events-none ensures they don't block clicks) */}
    <div className="absolute top-0 left-0 w-full h-full -z-20 pointer-events-none" >
  <ServicesIconsBackground />
  <ParticlesBackground />
</div>


      {/* Main content */}
      <div className="relative z-auto mx-auto w-full max-w-2xl overflow-hidden rounded-xl border-emerald-500/20 bg-white/95 shadow-lg">
        <div className="p-8">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#10b981]/10">
              <CheckCircle2 className="h-10 w-10 text-[#04877F]" />
            </div>

            <h1 className="mb-4 text-2xl font-bold text-[#04877F]">
              Welcome to my Newsletter!
            </h1>

            <p className="mb-6 text-gray-700">
              Thank you for subscribing to my newsletter. You&apos;ll now
              receive updates and exclusive content directly to your inbox.
            </p>
          </div>

          {/* Button */}
           <div className="flex flex-col justify-center gap-4 sm:flex-row">
      <Link
        href="/"
        className="relative z-50 inline-flex items-center justify-center rounded-md bg-[#10b981] px-6 py-3 text-white transition-colors hover:bg-[#00753c]"
      >
        Go to Homepage
        <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </div>
        </div>
      </div>
    </div>
  );
}
