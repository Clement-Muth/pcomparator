import { t } from "@lingui/macro";
import { Prisma } from "@prisma/client";
import type { NextAuthRequest } from "next-auth/lib";
import type { AppRouteHandlerFnContext } from "next-auth/lib/types";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getI18nInstance } from "~/translations/i18n";
import { HTTPError } from "~/types/error";

export const errorHandler = (
  callback: (request: NextAuthRequest, ctx: AppRouteHandlerFnContext) => Promise<NextResponse>
) => {
  return async (request: NextAuthRequest, ctx: AppRouteHandlerFnContext): Promise<NextResponse> => {
    try {
      return await callback(request, ctx);
    } catch (error) {
      const i18n = getI18nInstance("en");
      const isDev = process.env.PCOMPARATOR_ENV === "development";

      if (isDev) console.error("Error:", error);

      if (error instanceof z.ZodError) {
        return NextResponse.json(
          new HTTPError(
            t(i18n)`The request is malformed or contains invalid parameters. Please check the data provided.`,
            400,
            "error cause"
          ),
          { status: 400 }
        );
      }

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case "P2002":
            return NextResponse.json({ error: t(i18n)`A similar entry already exists.` }, { status: 409 });
          case "P2025":
            return NextResponse.json(
              { error: t(i18n)`The requested resource could not be found.` },
              { status: 404 }
            );
          default:
            return NextResponse.json({ error: t(i18n)`Internal Server Error.` }, { status: 500 });
        }
      }

      return NextResponse.json({ error: t(i18n)`Internal Server Error.` }, { status: 500 });
    }
  };
};
