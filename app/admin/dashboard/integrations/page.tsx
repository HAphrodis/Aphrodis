import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import PageContainer from "@/components/layouts/page-container";

const integrations = [
  {
    name: "Hygraph",
    description: "Headless CMS for your content(Blogs, Gallery, Events)",
    logo: "/logos/hygraph.svg",
    status: "Connected",
    color: "#000000",
  },
  {
    name: "Google Analytics",
    description: "Web analytics service",
    logo: "/logos/google-analytics.svg",
    status: "Connected",
    color: "#E37400",
  },
  {
    name: "Sentry",
    description: "Error tracking and performance monitoring",
    logo: "/logos/sentry.svg",
    status: "Connected",
    color: "#362D59",
  },
  {
    name: "Better Stack",
    description: "Monitoring and incident management",
    logo: "/logos/betterstack.svg",
    status: "Connected",
    color: "#000",
  },
  {
    name: "Vercel",
    description: "Deployment and hosting platform",
    logo: "/logos/vercel.svg",
    status: "Connected",
    color: "#000000",
  },
  {
    name: "Resend",
    description: "Email API for developers",
    logo: "/logos/resend.svg",
    status: "Connected",
    color: "#3B82F6",
  },
];

const comingSoon = [
  {
    name: "Cloudinary",
    description: "Cloud-based image and video management",
    logo: "/logos/cloudinary.svg",
    color: "#3448C5",
  },
];

export default function IntegrationsPage() {
  return (
    <PageContainer scrollable>
      <div className="mx-auto px-4 py-10">
        <div className="mb-12 text-center">
          <h1 className="text-primary mb-4 text-2xl font-bold sm:text-3xl">
            Platform Integrations
          </h1>
          {/* <p className="text-xl text-muted-foreground">Empowering Public Health with Cutting-Edge Technology</p> */}
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {integrations.map((integration) => (
            <Card
              key={integration.name}
              className="group overflow-hidden transition-shadow duration-300 hover:shadow-lg"
            >
              <div className="from-primary/5 to-primary/20 absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <CardHeader className="relative z-10">
                <div className="flex items-center justify-between">
                  <Image
                    src={integration.logo || "/placeholder.svg"}
                    alt={integration.name}
                    width={40}
                    height={40}
                  />
                  <Badge
                    variant="outline"
                    className="border-green-300 bg-green-100 text-green-800"
                  >
                    {integration.status}
                  </Badge>
                </div>
                <CardTitle className="mt-4">{integration.name}</CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <CardDescription className="mb-4">
                  {integration.description}
                </CardDescription>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full border-gray-700"
                        // style={{ borderColor: integration.color, color: integration.color }}
                      >
                        Manage
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Configure {integration.name} settings</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-16">
          <h2 className="text-primary mb-8 text-center text-3xl font-bold">
            Coming Soon
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {comingSoon.map((integration) => (
              <Card
                key={integration.name}
                className="group bg-muted/30 overflow-hidden transition-shadow duration-300 hover:shadow-lg"
              >
                <div className="from-primary/5 to-primary/10 absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <CardHeader className="relative z-10">
                  <div className="flex items-center justify-between">
                    <Image
                      src={integration.logo || "/placeholder.svg"}
                      alt={integration.name}
                      width={40}
                      height={40}
                      className="opacity-50"
                    />
                    <Badge
                      variant="outline"
                      className="border-yellow-300 bg-yellow-100 text-yellow-800"
                    >
                      Coming Soon
                    </Badge>
                  </div>
                  <CardTitle className="mt-4">{integration.name}</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <CardDescription className="mb-4">
                    {integration.description}
                  </CardDescription>
                  <Button variant="outline" className="w-full" disabled>
                    Not Available Yet
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
