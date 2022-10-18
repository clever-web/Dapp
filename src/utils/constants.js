import TelegramIconDark from "ASSETS/images/socials/dark/telegram.svg";
import TwitterIconDark from "ASSETS/images/socials/dark/twitter.svg";
import MediumIconDark from "ASSETS/images/socials/dark/medium.svg";
import TelegramIconLight from "ASSETS/images/socials/light/telegram.svg";
import TwitterIconLight from "ASSETS/images/socials/light/twitter.svg";
import MediumIconLight from "ASSETS/images/socials/light/medium.svg";

export const languages = [
  { title: "English", link: "/en" },
  { title: "Chinese", link: "/ch" },
  { title: "Korean", link: "/kr" },
  { title: "Vietnam", link: "/vi" },
];

export const socials = (mode) => [
  {
    link: "https://t.me/FormationFi",
    image: {
      src: mode === "theme-dark" ? TelegramIconDark : TelegramIconLight,
      width: "27",
      height: "27",
      alt: "Telegram",
    },
  },
  {
    link: "https://twitter.com/formationfi",
    image: {
      src: mode === "theme-dark" ? TwitterIconDark : TwitterIconLight,
      width: "26",
      height: "20",
      alt: "Twitter",
    },
  },
  {
    link: "https://medium.com/formation-fi",
    image: {
      src: mode === "theme-dark" ? MediumIconDark : MediumIconLight,
      width: "27",
      height: "26",
      alt: "Medium",
    },
  },
];

export const COIN_GECKO_URL =
  "https://api.coingecko.com/api/v3/coins/formation-fi?tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false";
export const FORM_TOKEN_DEFAULT_PRICE = 0.03;

export const TRANSACTION_STATUS = {
  SUBMITTED: "SUBMITTED",
  SUCCESS: "SUCCESS",
  FAILED: "FAILED",
};

export const TRANSACTION_ACTIONS = {
  SEND: 'SEND',
  APPROVAL: 'APPROVAL',
};
