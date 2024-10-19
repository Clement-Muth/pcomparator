import { cookies } from "next/headers";
import { type NextRequest, NextResponse, userAgent } from "next/server";
import { AVAILABLE_LOCALES } from "~/core/locale";

const locales = ["en", "fr"];

export async function middleware(request: NextRequest) {
  if (skip(request)) return NextResponse.next();

  const locale = cookies().get("local")?.value ?? AVAILABLE_LOCALES.fr;
  const { device } = userAgent(request);
  const viewport = device.type === "mobile" ? "mobile" : "desktop";

  const pathname = request.nextUrl.pathname;

  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  const headers = {
    "x-device": viewport
  };

  if (pathnameIsMissingLocale) {
    return NextResponse.redirect(new URL(`/${locale}/${pathname}${request.nextUrl.search}`, request.url), {
      headers: headers
    });
  }

  return NextResponse.next({
    headers: headers
  });
}

const skip = (request: NextRequest) => {
  switch (true) {
    case request.nextUrl.pathname.startsWith("/api"):
    case request.nextUrl.pathname.startsWith("/_next/static"):
    case request.nextUrl.pathname.startsWith("/_next/image"):
    case request.nextUrl.pathname.startsWith("/favicon.ico"):
    case request.nextUrl.pathname.startsWith("/assets"):
      return true;
    default:
      return false;
  }
};

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)"
};
