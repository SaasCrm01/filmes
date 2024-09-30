import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <p>© {new Date().getFullYear()} Sistema de Cadastro de Filmes. Todos os direitos reservados.</p>
          </div>
          <div className="col-md-6 text-md-end">
            <a href="#" className="text-white">Privacy Policy</a>
            <span className="mx-2">|</span>
            <a href="#" className="text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
