import React from 'react';
import q from "../Footer/Footer.module.css";

const Footer = () => {
    return (
        <footer className={q.footer}>
            <div className="mainContainer">
                <div className={q.footerItems}>
                    <span>@max-romanov</span>
                    <span>@pashabn</span>
                    <span>2022</span>
                    <span>RSSchool</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
