import Navbar from "@/app/components/Navbar"
import Footer from "@/app/components/Footer"


export default function CartProductLayout({
    children, 
  }) {
    return (
      <section>
       
<Navbar/>
   
        {children}
        <Footer/>
      </section>
    )
  }