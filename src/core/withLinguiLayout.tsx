// @ts-ignore
import { setI18n } from "@lingui/react/server";
import type { ReactNode } from "react";
import type { AVAILABLE_LOCALES } from "~/core/locale";
import { getI18nInstance } from "~/translations/i18n";

export type PageLocaleParam = {
  params: { locale: AVAILABLE_LOCALES };
};

type PageProps = PageLocaleParam & {
  searchParams?: any; // in query
};

type LayoutProps = PageLocaleParam & {
  children: React.ReactNode;
};

type LayoutExposedToNextJS<Props extends LayoutProps> = (props: Props) => ReactNode;

type PageExposedToNextJS<Props extends PageProps> = (props: Props) => ReactNode;

export const withLinguiPage = <Props extends PageProps>(
  AppRouterPage: React.ComponentType<PageLocaleParam & Props>
): PageExposedToNextJS<Props> => {
  return function WithLingui(props) {
    const locale = props.params.locale;
    const i18n = getI18nInstance(locale);

    setI18n(i18n);

    return <AppRouterPage {...props} locale={locale} />;
  };
};

export const withLinguiLayout = <Props extends LayoutProps>(
  AppRouterPage: React.ComponentType<PageLocaleParam & Props>
): LayoutExposedToNextJS<Props> => {
  return function WithLingui(props) {
    const locale = props.params.locale;
    const i18n = getI18nInstance(locale);

    setI18n(i18n);

    return <AppRouterPage {...props} locale={locale} />;
  };
};
