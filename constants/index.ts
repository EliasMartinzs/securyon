import { PiVaultLight } from "react-icons/pi";
import { CiCreditCard1 } from "react-icons/ci";

import { IconType } from "react-icons/lib";

export const sidebarIcons: {
  label: string;
  icon: IconType;
  href: string;
}[] = [
  {
    label: "Logins",
    icon: PiVaultLight,
    href: "/dashboard/logins",
  },
  {
    label: "Pagamentos",
    icon: CiCreditCard1,
    href: "/dashboard/payments",
  },
] as const;

export const companies: {
  name: string;
  logoUrl: string;
  websiteUrl: string;
  color: string;
}[] = [
  {
    name: "Google",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    websiteUrl: "https://www.google.com",
    color: "#4285F4",
  },
  {
    name: "Facebook",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
    websiteUrl: "https://www.facebook.com",
    color: "#3B5998",
  },
  {
    name: "Amazon",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    websiteUrl: "https://www.amazon.com",
    color: "#FF9900",
  },
  {
    name: "Apple",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    websiteUrl: "https://www.apple.com",
    color: "#000000",
  },
  {
    name: "Microsoft",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    websiteUrl: "https://www.microsoft.com",
    color: "#F25022",
  },
  {
    name: "Netflix",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/6/69/Netflix_logo.svg",
    websiteUrl: "https://www.netflix.com",
    color: "#E50914",
  },
  {
    name: "Twitter",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/en/6/60/Twitter_Logo_as_of_2021.svg",
    websiteUrl: "https://www.twitter.com",
    color: "#1DA1F2",
  },
  {
    name: "Instagram",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png",
    websiteUrl: "https://www.instagram.com",
    color: "#C13584",
  },
  {
    name: "LinkedIn",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
    websiteUrl: "https://www.linkedin.com",
    color: "#0077B5",
  },
  {
    name: "WhatsApp",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg",
    websiteUrl: "https://www.whatsapp.com",
    color: "#25D366",
  },
  {
    name: "YouTube",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png",
    websiteUrl: "https://www.youtube.com",
    color: "#FF0000",
  },
  {
    name: "GitHub",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg",
    websiteUrl: "https://github.com",
    color: "#181717",
  },
  {
    name: "Dropbox",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/4/48/Dropbox_logo_%282013-2015%29.svg",
    websiteUrl: "https://www.dropbox.com",
    color: "#007EE5",
  },
  {
    name: "Slack",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/b/b9/Slack_Technologies_Logo.svg",
    websiteUrl: "https://www.slack.com",
    color: "#4A154B",
  },
  {
    name: "Spotify",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg",
    websiteUrl: "https://www.spotify.com",
    color: "#1DB954",
  },
  {
    name: "Reddit",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/5/58/Reddit_logo_new.svg",
    websiteUrl: "https://www.reddit.com",
    color: "#FF4500",
  },
  {
    name: "Pinterest",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png",
    websiteUrl: "https://www.pinterest.com",
    color: "#E60023",
  },
  {
    name: "Quora",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/0/02/Quora_Q_icon.png",
    websiteUrl: "https://www.quora.com",
    color: "#A82400",
  },
  {
    name: "Airbnb",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg",
    websiteUrl: "https://www.airbnb.com",
    color: "#FF5A5F",
  },
  {
    name: "Uber",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png",
    websiteUrl: "https://www.uber.com",
    color: "#000000",
  },
  {
    name: "Lyft",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/7/74/Lyft_logo.svg",
    websiteUrl: "https://www.lyft.com",
    color: "#FF5C8A",
  },
  {
    name: "Snapchat",
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/a/ad/Snapchat_logo.svg",
    websiteUrl: "https://www.snapchat.com",
    color: "#FFFC00",
  },
  {
    name: "TikTok",
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg",
    websiteUrl: "https://www.tiktok.com",
    color: "#010101",
  },
  {
    name: "Twitch",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/2/26/Twitch_logo.svg",
    websiteUrl: "https://www.twitch.tv",
    color: "#9146FF",
  },
  {
    name: "Zoom",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/7/75/Zoom_Communications_Logo.svg",
    websiteUrl: "https://www.zoom.us",
    color: "#2D8CFF",
  },
  {
    name: "Adobe",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/d/d7/Adobe_Corporate_Logo.svg",
    websiteUrl: "https://www.adobe.com",
    color: "#FF0000",
  },
  {
    name: "Oracle",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg",
    websiteUrl: "https://www.oracle.com",
    color: "#F80000",
  },
  {
    name: "IBM",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
    websiteUrl: "https://www.ibm.com",
    color: "#0066CC",
  },
  {
    name: "Salesforce",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/3/3e/Salesforce_logo.svg",
    websiteUrl: "https://www.salesforce.com",
    color: "#00A1E0",
  },
  {
    name: "PayPal",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg",
    websiteUrl: "https://www.paypal.com",
    color: "#003087",
  },
  {
    name: "eBay",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/1/1b/EBay_logo.svg",
    websiteUrl: "https://www.ebay.com",
    color: "#E53238",
  },
  {
    name: "Shopify",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/6/68/Shopify_logo_2018.svg",
    websiteUrl: "https://www.shopify.com",
    color: "#7AB55C",
  },
  {
    name: "WordPress",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/0/09/Wordpress-Logo.svg",
    websiteUrl: "https://www.wordpress.com",
    color: "#21759B",
  },
  {
    name: "Bing",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/9/91/Bing_logo_%282016%29.svg",
    websiteUrl: "https://www.bing.com",
    color: "#F25022",
  },
  {
    name: "Yahoo",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/2/24/Yahoo%21_logo.svg",
    websiteUrl: "https://www.yahoo.com",
    color: "#410093",
  },
  {
    name: "Hulu",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/e/e4/Hulu_Logo.svg",
    websiteUrl: "https://www.hulu.com",
    color: "#1CE783",
  },
  {
    name: "Etsy",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/7/75/Etsy_logo.svg",
    websiteUrl: "https://www.etsy.com",
    color: "#E04E39",
  },
  {
    name: "Medium",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/e/ec/Medium_logo_Monogram.svg",
    websiteUrl: "https://www.medium.com",
    color: "#00AB6B",
  },
  {
    name: "Trello",
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/8/8c/Trello_logo.svg",
    websiteUrl: "https://www.trello.com",
    color: "#0079BF",
  },
  {
    name: "Asana",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/e/e6/Asana_logo.svg",
    websiteUrl: "https://www.asana.com",
    color: "#FBAE17",
  },
  {
    name: "Grammarly",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/6/69/Grammarly_Logo.svg",
    websiteUrl: "https://www.grammarly.com",
    color: "#00A400",
  },
  {
    name: "Canva",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/7/74/Canva_Logo.png",
    websiteUrl: "https://www.canva.com",
    color: "#00C4CC",
  },
  {
    name: "Tinder",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/7/76/Tinder_Logo.svg",
    websiteUrl: "https://www.tinder.com",
    color: "#FF6B6B",
  },
  {
    name: "Coursera",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/e/e5/Coursera_logo.svg",
    websiteUrl: "https://www.coursera.org",
    color: "#2A73CC",
  },
  {
    name: "Udemy",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/7/78/Udemy_logo.png",
    websiteUrl: "https://www.udemy.com",
    color: "#EC5252",
  },
  {
    name: "Duolingo",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/d/d7/Duolingo_logo.png",
    websiteUrl: "https://www.duolingo.com",
    color: "#57C83A",
  },
  {
    name: "Stack Overflow",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/e/ef/Stack_Overflow_icon.svg",
    websiteUrl: "https://stackoverflow.com",
    color: "#F48024",
  },
  {
    name: "Kickstarter",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/a/a7/Kickstarter_logo.svg",
    websiteUrl: "https://www.kickstarter.com",
    color: "#2EB7D1",
  },
  {
    name: "Patreon",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/6/62/Patreon_logo.svg",
    websiteUrl: "https://www.patreon.com",
    color: "#F96854",
  },
];

export const scoreWords: string[] = [
  "curta",
  "curta",
  "bom",
  "muito bom",
  "excelente",
] as const;

export const cardColors = [
  { name: "Visa", gradient: "linear-gradient(to right, #1A237E, #283593)" },
  {
    name: "MasterCard",
    gradient: "linear-gradient(to right, #ec0c8e, #2bdaeb)",
  },
  {
    name: "American Express",
    gradient: "linear-gradient(to right, #0078BE, #004A8F)",
  },
  { name: "Discover", gradient: "linear-gradient(to right, #FFDB00, #FFD700)" },
  { name: "JCB", gradient: "linear-gradient(to right, #FFA100, #FF5000)" },
  {
    name: "Diners Club",
    gradient: "linear-gradient(to right, #FF6300, #E93A46)",
  },
  { name: "Elo", gradient: "linear-gradient(to right, #623988, #FF9A00)" },
  {
    name: "Hipercard",
    gradient: "linear-gradient(to right, #B0CB1F, #5C913B)",
  },
] as const;
