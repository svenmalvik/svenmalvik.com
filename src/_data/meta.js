export const url = process.env.URL || "http://localhost:8080";
export const siteName = "Sven Malvik";
export const siteDescription =
  "Tech Leader and Trance Music DJ - Mixing the best trance tracks every week";
export const siteType = "Person"; // schema
export const locale = "en_EN";
export const lang = "en";
export const skipContent = "Skip to content";
export const author = {
  name: "Sven Malvik",
  avatar: "/icon-512x512.png",
  email: "sven@malvik.de",
  website: "https://www.svenmalvik.com",
  social: "https://www.linkedin.com/in/svenmalvik",
};
export const creator = {
  name: "Sven Malvik",
  email: "sven@malvik.de",
  website: "https://www.svenmalvik.com",
  social: "https://www.linkedin.com/in/svenmalvik",
};
export const pathToSvgLogo = "src/assets/images/favicon.svg";
export const themeColor = "#4129D6";
export const themeBgColor = "#FBFBFB";
export const opengraph_default =
  "/assets/images/template/opengraph-default.jpg";
export const opengraph_default_alt =
  "Tech Leader and Trance Music DJ - Sharing insights about AI and weekly trance mixes";
export const blog = {
  name: "Sven Malvik's Blog",
  description:
    "Insights about AI leadership, tech, and trance music - sharing my journey at the intersection of technology and music.",
  feedLinks: [
    {
      title: "Atom Feed",
      url: "/feed.xml",
      type: "application/atom+xml",
    },
    {
      title: "JSON Feed",
      url: "/feed.json",
      type: "application/json",
    },
  ],
  tagSingle: "Tag",
  tagPlural: "Tags",
  tagMore: "More tags:",
  paginationLabel: "Blog",
  paginationPage: "Page",
  paginationPrevious: "Previous",
  paginationNext: "Next",
  paginationNumbers: true,
};
export const details = {
  aria: "section controls",
  expand: "expand all",
  collapse: "collapse all",
};
export const navigation = {
  navLabel: "Menu",
  ariaTop: "Main menu",
  ariaBottom: "Legal",
  ariaPlatforms: "Social platforms",
  drawerNav: false,
  tranceMusic: {
    title: "Trance Music",
    url: "/trance-music/",
  },
};
export const themeSwitch = {
  title: "Theme",
  light: "light",
  dark: "dark",
};
export const greenweb = {
  providers: {
    domain: "netlify.com",
    service: "cdn",
  },
  credentials: {
    domain: "",
    doctype: "",
    url: "",
  },
};
export const viewRepo = {
  allow: false,
  infoText: "View this page on GitHub",
};
export const easteregg = true;
