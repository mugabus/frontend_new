import React from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>MetaMask SIWE App</title>
      </head>
      <body style={{ fontFamily: "sans-serif", margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
