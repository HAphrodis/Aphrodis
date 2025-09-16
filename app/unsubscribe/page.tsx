import type { Metadata } from "next";
import { UnsubscribeForm } from "./_components/unsubscribe-form";
import { createMetadata } from "../metadata-utils";

export const metadata: Metadata = createMetadata({
  title: "Unsubscribe | Aphrodis Hakuzweyezu Newsletter",
  description:
    "Manage your subscription preferences for Aphrodis Hakuzweyezu newsletter",
  path: "/unsubscribe",
});

export default async function UnsubscribePage({
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
          <UnsubscribeForm initialEmail={email} />
        </div>
      </div>
    </>
  );
}
