export type PortfolioItem = {
  title: string;
  client: string;
  industry: string;
  /** Path under /public (e.g. "/portfolio/roofing-reel.jpg") */
  thumbnail: string;
  /** YouTube or Vimeo URL (watch, youtu.be, shorts, or vimeo.com/ID) */
  videoUrl: string;
  /** One-line result, e.g. "42 quote requests in 30 days" */
  results: string;
  description: string;
};

export const portfolio: PortfolioItem[] = [
  {
    title: "[PROJECT TITLE 1]",
    client: "[CLIENT NAME 1]",
    industry: "Roofing",
    thumbnail: "/placeholders/portfolio-1.svg",
    videoUrl: "https://www.youtube.com/watch?v=[YOUTUBE_VIDEO_ID_1]",
    results: "[RESULT 1 — e.g. 38 quote requests in 30 days]",
    description: "[SHORT DESCRIPTION 1 — what was shot and how it was used]",
  },
  {
    title: "[PROJECT TITLE 2]",
    client: "[CLIENT NAME 2]",
    industry: "Renovation",
    thumbnail: "/placeholders/portfolio-2.svg",
    videoUrl: "https://www.youtube.com/watch?v=[YOUTUBE_VIDEO_ID_2]",
    results: "[RESULT 2 — e.g. $120k in booked projects]",
    description: "[SHORT DESCRIPTION 2 — what was shot and how it was used]",
  },
  {
    title: "[PROJECT TITLE 3]",
    client: "[CLIENT NAME 3]",
    industry: "HVAC",
    thumbnail: "/placeholders/portfolio-3.svg",
    videoUrl: "https://vimeo.com/[VIMEO_VIDEO_ID_3]",
    results: "[RESULT 3 — e.g. cost per lead down 45%]",
    description: "[SHORT DESCRIPTION 3 — what was shot and how it was used]",
  },
];
