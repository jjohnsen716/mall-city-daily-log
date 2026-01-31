export const metadata = {
  title: "Mall City Mechanical – Daily Log",
  description: "Voice-driven daily log app"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "Arial, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
