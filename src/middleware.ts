import { cookies } from "next/headers";
import { type NextRequest, NextResponse, userAgent } from "next/server";
import { AVAILABLE_LOCALES } from "~/core/locale";
import { auth as middleware } from "~/libraries/nextauth/authConfig";

const locales = ["en", "fr"];

export default middleware(async (request) => {
  if (skip(request)) return NextResponse.next();

  const isAuthenticated = !!request.auth;

  const locale = (await cookies()).get("local")?.value ?? AVAILABLE_LOCALES.fr;
  const { device } = userAgent(request);
  const viewport = device.type === "mobile" ? "mobile" : "desktop";

  const pathname = request.nextUrl.pathname;

  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  const headers = {
    "x-device": viewport
  };

  if (!isAuthenticated && pathname !== `/${locale}`)
    return NextResponse.redirect(
      new URL(
        `/${locale}?redirect_url=${encodeURIComponent(
          process.env.PCOMPARATOR_PUBLIC_URL + request.nextUrl.pathname
        )}${request.nextUrl.search}`,
        request.url
      ),
      {
        headers: headers
      }
    );

  if (pathnameIsMissingLocale) {
    return NextResponse.redirect(new URL(`/${locale}/${pathname}${request.nextUrl.search}`, request.url), {
      headers: headers
    });
  }

  return NextResponse.next({
    headers: headers
  });
});

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
