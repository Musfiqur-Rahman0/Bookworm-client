
import { Footer } from "@/components/blocks/Footer";
import { Navbar } from "@/components/blocks/Navbar";
import ScrollToTop from "@/components/ScrollToTop";
import { Outlet } from "react-router";


const Root = () => {
    return <>
        <Navbar className="flex items-center justify-center !py-5"/>
        <ScrollToTop/>
        <main className="min-h-[calc(100vh-225px)]">
            <Outlet/>
        </main>
        <Footer/>

    </>;
}
export default Root;