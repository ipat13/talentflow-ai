import type { MetadataRoute } from "next";

export default function security(): MetadataRoute.Headers {
  return {
    headers: [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' blob: data: https://images.unsplash.com https://assets.mixkit.co",
              "media-src 'self' https://assets.mixkit.co",
              "connect-src 'self' https://www.google-analytics.com https://formspree.io",
              "frame-src 'none'",
            ].join("; "),
          },
        ],
      },
    ],
  };
}
