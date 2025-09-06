import { Suspense } from "react";
import ChangelogClient from "./changelog-client";
import { getChangelogEntries } from "./get-changelog-entries";

export default async function ChangelogPage() {
  const entries = await getChangelogEntries();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChangelogClient initialEntries={entries} />
    </Suspense>
  );
}
