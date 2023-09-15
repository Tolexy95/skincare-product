import Navbar from "@/app/components/Navbar"
import Footer from "@/app/components/Footer"


export default function ProductBrandLayout({
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