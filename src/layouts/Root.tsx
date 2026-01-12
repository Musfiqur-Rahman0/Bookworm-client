
import { Footer } from "@/components/blocks/Footer";
import { Navbar } from "@/components/blocks/Navbar";
import ScrollToTop from "@/components/ScrollToTop";
import { Outlet } from "react-router";


const Root = () => {
    return <>
        <Navbar />
        <ScrollToTop/>
        <main>
            <Outlet/>
        </main>
        <Footer/>

    </>;
}
export default Root;