import type { Metadata } from "next";
import { SubscribeForm } from "./_components/subscribe-form";
import { createMetadata } from "../metadata-utils";
import { ParticlesBackground } from "@/components/shared/particles-background";
import { ServicesIconsBackground } from "@/components/shared/services-icons-background";

export const metadata: Metadata = createMetadata({
  title: "Subscribe",
  description: "Subscribe to the Hbapte newsletter for updates",
  path: "/subscribe",
});

export default async function SubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const email = resolvedSearchParams.email || "";

  return (
    <>
     <div className="flex min-h-screen flex-col items-center justify-center relative font-sans">
        <div className="top-0 z-auto w-screen bg-[radial-gradient(#ffffff33_1px,transparent_1px)] bg-[size:20px_20px]">
           {/* Background layers (pointer-events-none ensures they don't block clicks) */}
             <div className="absolute top-0 left-0 w-full h-full -z-20" >
           <ServicesIconsBackground />
           <ParticlesBackground />
         </div>
          <div className="relative z-50 mx-auto w-full max-w-4xl px-2 pt-30 pb-20">
            <SubscribeForm initialEmail={email} />
          </div>
        </div>
      </div>
    </>
  );
}
