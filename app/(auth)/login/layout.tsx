import AnimatedLoader from "@/components/common/AnimatedLoader";
import { Suspense } from "react";

export const metadata = {
  title: "Ishimwe Jean Baptiste |  Staff Login",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center">
            {" "}
            <AnimatedLoader />
          </div>
        }
      >
        {children}
      </Suspense>
    </>
  );
}
