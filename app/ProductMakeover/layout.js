import Navbar from "@/app/components/Navbar"
import Footer from "@/app/components/Footer"


export default function ProducMakeOvertLayout({
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