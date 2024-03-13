import "./global.css";
import AuthSession from "./_components/AuthSession";

export default function RootLayout({children}) {
 return (
      <html>
        <body>
          <AuthSession>
              {children}
          </AuthSession>
        </body>
      </html>
  )
}
