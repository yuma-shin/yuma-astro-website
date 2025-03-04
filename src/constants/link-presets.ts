import { LinkPreset, type NavBarLink } from "@/types/config";
import I18nKey from "@i18n/i18nKey";
import { i18n } from "@i18n/translation";

export const LinkPresets: { [key in LinkPreset]: NavBarLink } = {
  [LinkPreset.Home]: {
    name: i18n(I18nKey.home),
    url: "/",
  },
  [LinkPreset.About]: {
    name: i18n(I18nKey.about),
    url: "/about/",
  },
  [LinkPreset.Archive]: {
    name: i18n(I18nKey.archive),
    url: "/archive/",
  },
  [LinkPreset.Work]: {
    name: i18n(I18nKey.work),
    url: "/work/",
  },
  [LinkPreset.Awards]: {
    name: i18n(I18nKey.awards),
    url: "/awards/",
  },
  [LinkPreset.Uses]: {
    name: i18n(I18nKey.uses),
    url: "/uses/",
  },
};
