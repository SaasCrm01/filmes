// export default function Navbar() {
//   return (
//     <nav className="bg-blue-600 p-4">
//       <div className="container mx-auto flex justify-between items-center">
//         <h1 className="text-white font-bold text-xl">Sistema de Filmes</h1>
//         <ul className="flex space-x-6">
//           <li>
//             <a href="/genres" className="text-white hover:underline">Gêneros</a>
//           </li>
//           <li>
//             <a href="/movies" className="text-white hover:underline">Filmes</a>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// }

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">My App</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Genres</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Movies</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
