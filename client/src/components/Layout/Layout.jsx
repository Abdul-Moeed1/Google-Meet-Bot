import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import {Footer} from "./Footer";


export const Layout = () => {
    console.log("Loyut rendered");
    
    return (
        <>
            <div >
                <Navbar />
                <div className="content">
                    <Outlet />
                </div>
                <Footer />
            </div>
        </>
    );
}