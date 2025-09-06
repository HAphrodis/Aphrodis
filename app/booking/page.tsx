"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { MouseLight } from "@/components/shared/mouse-light";
import DefaultLayout from "@/components/layout/DefaultLayout";
import PageHeader from "@/components/shared/page-header";

export default function BookingPage() {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", {
        styles: {
          branding: {
            brandColor: "#42e2a8",
          },
          body: {
            background: "#002922",
          },
          eventTypeListItem: {
            backgroundColor: "#001a15",
            // backgroundColorHover is not a valid property, removing it
          },
          // selectedDateColor: "#42e2a8",
          availabilityDatePicker: {
            backgroundColor: "#001a15",
            color: "#ffffff",
          },

          // bookerBodyContainer: {
          //   backgroundColor: "#001a15",
          //   color: "#ffffff",
          // },
          // calendar: {
          //   backgroundColor: "#001a15",
          //   color: "#ffffff",
          // },
          // form: {
          //   backgroundColor: "#001a15",
          //   color: "#ffffff",
          // },
          // button: {
          //   backgroundColor: "#42e2a8",
          //   color: "#002922",
          //   backgroundColorHover: "#2fcb91",
          // },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <DefaultLayout>
      <div className=" bg-[#002922]">
        <PageHeader
          title="Schedule a"
          highlightedTitle="Call"
          subtitle="Book a time to discuss your project or just have a chat."
        />
        <div className="relative min-h-screen bg-[#002922] overflow-hidden">
          <MouseLight />

          <div className="container mx-auto px-4 py-8">
            <div className="mt-4 rounded-xl border border-emerald-800/30 bg-emerald-900/10 p-4 shadow-lg backdrop-blur-sm md:p-6">
              <div className="mb-6 text-center">
                <p className="text-emerald-400">
                  Select a date and time that works for you, and I&apos;ll be in
                  touch shortly.
                </p>
              </div>

              <div className="h-fit pt-12 w-full overflow-hidden rounded-lg bg-[#001a15]/80 backdrop-blur-sm">
                <Cal
                  namespace="30min"
                  calLink="hbapte/30min"
                  style={{
                    width: "100%",
                    height: "100%",
                    overflow: "auto",
                  }}
                  config={{
                    layout: "month_view",
                    theme: "dark",
                  }}
                />
              </div>

              <div className="mt-6 text-center text-sm text-emerald-400/70">
                <p>
                  Powered by Cal.com • Meetings will be conducted via Google
                  Meet
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
