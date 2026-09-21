import { NavLink, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="shell">
      <header className="topbar">
        <div className="topbar__inner">
          <NavLink to="/" className="logo">
            <span className="logo__mark" />
            Листочек
          </NavLink>

          <nav className="nav">
            <NavLink to="/" end>Растения</NavLink>
            <NavLink to="/about">О справочнике</NavLink>
          </nav>
        </div>
      </header>

      {/* сюда подставляется текущая страница */}
      <main className="page">
        <Outlet />
      </main>
    </div>
  );
}
