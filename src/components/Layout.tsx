import Header from "./Header/Header";
import {ReactComponentElement} from "react";
import Footer from "./Footer/Footer";

interface Children {
    children: ReactComponentElement<any>
}


const Layout = ({children}: Children) => (
    <>
        <Header/>
        {children}
        <Footer />
    </>
);

export default Layout;
