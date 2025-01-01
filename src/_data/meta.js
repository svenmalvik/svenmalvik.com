export const url = process.env.URL || "http://localhost:8080";
export const siteName = "Sven Malvik";
export const siteDescription =
  "Tech Leader and Trance Music DJ - Mixing the best trance tracks every week";
export const siteType = "Person"; // schema
export const locale = "en_EN";
export const lang = "en";
export const skipContent = "Skip to content";
export const author = {
  name: "Lene Saile", // i.e. Lene Saile - page / blog author's name. Must be set.
  avatar: "/icon-512x512.png", // path to the author's avatar. In this case just using a favicon.
  email: "hola@lenesaile.com", // i.e. hola@lenesaile.com - email of the author
  website: "https://www.lenesaile.com", // i.e. https.://www.lenesaile.com - the personal site of the author
  fediverse: "https://front-end.social/@lene", // used for highlighting journalism on the fediverse. Can be Mastodon, Flipboard, Threads, WordPress (with the ActivityPub plugin installed), PeerTube, Pixelfed, etc. https://blog.joinmastodon.org/2024/07/highlighting-journalism-on-mastodon/
};
export const creator = {
  name: "Lene Saile", // i.e. Lene Saile - creator's (developer) name.
  email: "hola@lenesaile.com",
  website: "https://www.lenesaile.com",
  social: "https://front-end.social/@lene",
};
export const pathToSvgLogo = "src/assets/svg/misc/logo.svg"; // used for favicon generation
export const themeColor = "#DD4462"; //  Manifest: defines the default theme color for the application
export const themeBgColor = "#FBFBFB"; // Manifest: defines a placeholder background color for the application page to display before its stylesheet is loaded
export const opengraph_default =
  "/assets/images/template/opengraph-default.jpg"; // fallback/default meta image
export const opengraph_default_alt =
  "Tech Leader and Trance Music DJ - Sharing insights about AI and weekly trance mixes"; // alt text for default meta image"
export const blog = {
  // RSS feed
  name: "My Web Development Blog",
  description:
    "Tell the word what you are writing about in your blog. It will show up on feed readers.",
  // feed links are looped over in the head. You may add more to the array.
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
  // Tags
  tagSingle: "Tag",
  tagPlural: "Tags",
  tagMore: "More tags:",
  // pagination
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
  // this goes into src/common/greenweb.njk
  providers: {
    // if you want to add more than one, edit the array directly.
    domain: "netlify.com",
    service: "cdn",
  },
  credentials: {
    // optional, eg: 	{ domain='my-org.com', doctype = 'webpage', url = 'https://my-org.com/our-climate-record'}
    domain: "",
    doctype: "",
    url: "",
  },
};
export const viewRepo = {
  // this is for the view/edit on github link. The value in the package.json will be pulled in.
  allow: true,
  infoText: "View this page on GitHub",
};
export const easteregg = true;
