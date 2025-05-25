import React from "react";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head >
        <link rel="icon" type="image/png" href="/assets/img/favicon.png" />

        {/* <link href="/assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" /> */}
        <link href="/assets/vendor/fontawesome/css/all.min.css" rel="stylesheet" />
        <link href="/assets/vendor/custom-icon/style.css" rel="stylesheet" />
        <link href="/assets/vendor/vl-nav/css/core-menu.css" rel="stylesheet" />
        <link href="/assets/vendor/animate.min.css" rel="stylesheet" />
        <link
          href="/assets/vendor/magnific-popup/magnific-popup.css"
          rel="stylesheet"
        />
        <link href="/assets/vendor/owl/assets/owl.carousel.min.css" rel="stylesheet" />
        <link
          href="/assets/vendor/owl/assets/owl.theme.default.min.css"
          rel="stylesheet"
        />
        {/* <link href="/assets/css/main.css" rel="stylesheet" /> */}
        <link
          rel="stylesheet"
          href="/assets/vendor/vl-nav/css/effects/slide-menu.css"
        />

      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
