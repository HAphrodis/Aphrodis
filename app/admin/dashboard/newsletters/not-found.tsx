import Link from "next/link";
import { FileX } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NewsletterNotFound() {
  return (
    <div className="container mx-auto flex h-[70vh] flex-col items-center justify-center space-y-4 text-center">
      <FileX className="h-16 w-16 text-gray-400" />
      <h1 className="text-2xl font-bold">Newsletter Not Found</h1>
      <p className="text-muted-foreground">
        The newsletter you&apos;re looking for doesn&apos;t exist or has been
        deleted.
      </p>
      <Button asChild>
        <Link href="/admin/dashboard/newsletters">Back to Newsletters</Link>
      </Button>
    </div>
  );
}
