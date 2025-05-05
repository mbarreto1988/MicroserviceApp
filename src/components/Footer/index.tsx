import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <p className="footer__text">© {new Date().getFullYear()} Mi Empresa. Todos los derechos reservados.</p>
        <div className="footer__links">
        </div>
      </div>
    </footer>
  );
};

export default Footer;
