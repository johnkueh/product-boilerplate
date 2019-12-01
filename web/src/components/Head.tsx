import React from "react";
import { Helmet } from "react-helmet";

const defaultTitle = "MetricsJar";
const defaultDescription = "";
const defaultOGURL = "";
const defaultOGImage = `${process.env.BASE_URL}/static/metricsjar-og-image.png`;

interface Props {
  title: string;
  description?: string;
  url?: string;
  ogImage?: string;
}

const Head: React.FC<Props> = props => {
  const title = props.title ? `${props.title} | MetricsJar` : defaultTitle;
  return (
    <Helmet>
      <meta charSet="UTF-8" />
      <title>{title}</title>
      <meta
        name="description"
        content={props.description || defaultDescription}
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/static/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/static/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/static/favicon-16x16.png"
      />
      <link rel="manifest" href="/static/site.webmanifest" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />
      <meta property="og:url" content={props.url || defaultOGURL} />
      <meta property="og:title" content={title} />
      <meta
        property="og:description"
        content={props.description || defaultDescription}
      />
      <meta property="og:image" content={props.ogImage || defaultOGImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta
        content={props.ogImage || defaultOGImage}
        name="twitter:image:src"
      />
      <meta content="summary_large_image" name="twitter:card" />
    </Helmet>
  );
};

export default Head;
