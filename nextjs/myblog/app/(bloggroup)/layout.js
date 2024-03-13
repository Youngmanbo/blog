import NavBar from "@/app/(bloggroup)/_components/NavBar";


export default function Layout({children, modal}) {
    return (
           <>
                <NavBar />
                  {children}
                  {modal}
           </>
     )
   }
   