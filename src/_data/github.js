import EleventyFetch from "@11ty/eleventy-fetch";

export default async function () {
  let url = "https://api.github.com/users/svenmalvik/repos";

  const options = {
    duration: "1d",
    type: "json",
  };

  // Add GitHub token if available
  if (process.env.GITHUB_TOKEN) {
    options.fetchOptions = {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
    };
  }

  let data = await EleventyFetch(url, options);
  return data;
}
