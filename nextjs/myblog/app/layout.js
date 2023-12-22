"use client";
import {RecoilRoot} from "recoil";
import "./global.css";


export default function RootLayout({children}) {
 return (
      <html>
        <body>
          <RecoilRoot>
            {children}
          </RecoilRoot>
        </body>
      </html>
  )
}
