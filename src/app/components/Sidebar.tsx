export default function Sidebar() {
    return (
      <aside className="d-flex flex-column bg-dark text-white vh-100 p-3 sidebar">
        <h2 className="text-center mb-4">Dashboard</h2>
        <ul className="nav flex-column">
          <li className="nav-item">
            <a href="/" className="nav-link text-white">Início</a>
          </li>
          <li className="nav-item">
            <a href="/genres" className="nav-link text-white">Gêneros</a>
          </li>
          <li className="nav-item">
            <a href="/movies" className="nav-link text-white">Filmes</a>
          </li>
        </ul>
      </aside>
    );
  }
  