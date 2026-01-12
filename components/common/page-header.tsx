import Image from "next/image"

import { cn } from "@/lib/utils"

interface PageHeaderProps {
  title: string
  backgroundImage?: string
  breadcrumbs?: Array<{
    label: string
    href?: string
  }>
  className?: string
  highlightedTitle?: string
  subtitle?: string
}

export function PageHeader({
  title,
  backgroundImage = "/contacts.png",
  breadcrumbs = [{ label: "Home", href: "/" }, { label: title }],
  className,
  highlightedTitle,
}: PageHeaderProps) {
  return (
    <div className={cn("relative h-64 md:h-80 overflow-hidden", className)}>
      {/* Background Image */}
      <Image
        width={1220}
        height={1080}
        src={backgroundImage || "/placeholder.svg"}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        // onError={(e) => {
        //   const target = e.target as HTMLImageElement
        //   target.src = "https://demo.gethugothemes.com/bizcraft/site/images/banner/banner1.jpg"
        // }}
      />

      {/* Parallax Overlay */}
      <div
        className="absolute inset-0 w-full h-full opacity-100"
        style={{
          backgroundImage:
            "url(https://demo.gethugothemes.com/bizcraft/site/images/overaly.png)",
        }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {title}{" "}
            {highlightedTitle && (
              <span className="text-emerald-400">{highlightedTitle}</span>
            )}
          </h1>

          {/* {subtitle && (
            <p className="text-sm md:text-base max-w-3xl mx-auto">{subtitle}</p>
          )} */}

          {/* Breadcrumb Navigation */}
          <nav aria-label="breadcrumb">
            <ol className="flex items-center justify-center space-x-1 text-sm md:text-base">
              {breadcrumbs.map((crumb, index) => (
                <li key={index} className="flex items-center">
                  {index > 0 && <span className="mx-1 text-white/70">/</span>}
                  {crumb.href ? (
                    <a
                      href={crumb.href}
                      className="text-white/90 hover:text-white transition-colors duration-200">
                      {crumb.label}
                    </a>
                  ) : (
                    <span className="text-white" aria-current="page">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>
    </div>
  )
}
