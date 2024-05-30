import {
  BsFacebook,
  BsGlobe2,
  BsTelegram,
  BsTwitter,
  BsYoutube,
} from "react-icons/bs";
import colors from "./colors";
import { IconType } from "react-icons";

const linksColors = {
  youtube: colors.dark.youtube,
  website: colors.dark.accent,
  facebook: colors.dark.facebook,
  x: colors.dark.black,
  telegram: colors.dark.telegram,
};

export const socialLinksData: {
  [key: string]: {
    name: string;
    text: string;
    color: string;
    Icon: IconType;
  };
} = {
  Website: {
    name: "Website",
    text: "Link to your website",
    color: linksColors.website,
    Icon: BsGlobe2,
  },
  Youtube: {
    Icon: BsYoutube,
    name: "Youtube",
    text: "Link to your Youtube channel",
    color: linksColors.youtube,
  },
  Facebook: {
    Icon: BsFacebook,
    name: "Facebook",
    text: "Link to your Facebook channel",
    color: linksColors.facebook,
  },
  Twitter: {
    Icon: BsTwitter,
    name: "Twitter",
    text: "Link to your X channel",
    color: linksColors.x,
  },
  Telegram: {
    Icon: BsTelegram,
    name: "Telegram",
    text: "Link to your Telegram channel",
    color: linksColors.telegram,
  },
};
