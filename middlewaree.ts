// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { type NextRequest, NextResponse } from "next/server"
// import { decrypt } from "@/utils/sessionUtils"
// import { cookies } from "next/headers"

// // Define redirects for SEO purposes
// const redirects = [
//   // Add your redirects here
//   { source: "/blogs/:slug", destination: "/blog/:slug", permanent: true },
//   // Add more as needed
// ]

// export default async function middleware(req: NextRequest) {
//   const path = req.nextUrl.pathname
//   const url = req.nextUrl.clone()

//   // Handle admin protection
//   if (path.startsWith("/admin")) {
//     const cookie = (await cookies()).get("session")?.value

//     if (cookie) {
//       const session = await decrypt(cookie)

//       // Check if session exists, has a userId, and hasn't expired
//       if (!session || !session.userId || !isValidSession(session)) {
//         // Session is invalid or expired, redirect to login
//         const loginUrl = new URL("/login", req.nextUrl)
//         loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname + req.nextUrl.search)
//         return NextResponse.redirect(loginUrl)
//       }

//       // If the path is exactly /admin, redirect to /admin/dashboard
//       if (path === "/admin") {
//         return NextResponse.redirect(new URL("/admin/dashboard", req.nextUrl))
//       }
//     } else {
//       // No session cookie found, redirect to login
//       const loginUrl = new URL("/login", req.nextUrl)
//       loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname + req.nextUrl.search)
//       return NextResponse.redirect(loginUrl)
//     }
//   }

//   // SEO improvements - Handle trailing slashes (except for root)
//   if (path !== "/" && path.endsWith("/")) {
//     const newUrl = url.clone()
//     newUrl.pathname = path.slice(0, -1)
//     return NextResponse.redirect(newUrl, 308) // 308 is permanent redirect
//   }

//   // Handle SEO redirects
//   for (const redirect of redirects) {
//     const pattern = new RegExp(`^${redirect.source.replace(/:\w+/g, "([^/]+)")}$`)
//     const matches = path.match(pattern)

//     if (matches) {
//       let destination = redirect.destination

//       // Replace dynamic parameters
//       if (matches.length > 1) {
//         const paramNames = redirect.source.match(/:\w+/g) || []
//         paramNames.forEach((param, index) => {
//           destination = destination.replace(param, matches[index + 1])
//         })
//       }

//       const newUrl = url.clone()
//       newUrl.pathname = destination

//       return NextResponse.redirect(newUrl, redirect.permanent ? 308 : 307)
//     }
//   }

//   return NextResponse.next()
// }

// // Helper function to check if a session is valid (not expired)
// function isValidSession(session: any): boolean {
//   if (!session.exp) return false

//   // The exp claim in JWT is in seconds since epoch
//   const expirationTime = session.exp * 1000 // Convert to milliseconds
//   const currentTime = Date.now()

//   return currentTime < expirationTime
// }

// export const config = {
//   matcher: [
//     // Include admin paths
//     "/admin/:path*",
//     // Include all other paths for SEO redirects, but exclude static files and API routes
//    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
//   ],
// }
