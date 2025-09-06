import type { Metadata } from "next";
import { SubscribeForm } from "./_components/subscribe-form";
import { createMetadata } from "../metadata-utils";

export const metadata: Metadata = createMetadata({
  title: "Subscribe | Ishimwe Jean Baptiste Newsletter",
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
      <div className="flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-100 px-4 py-20">
        <div className="mx-auto w-full max-w-4xl">
          <SubscribeForm initialEmail={email} />
        </div>
      </div>
    </>
  );
}
