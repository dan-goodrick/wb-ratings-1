import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import LogoutButton from './components/LogoutButton.jsx';
import axios from 'axios'

export default function App() {
  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault()
    axios.post('/api/logout').then((res) => {
      console.log("logout", res.data);
    if (res.data.success){
      navigate('/')
    }
  })
}
  return (
    <>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/movies">All movies</NavLink>
          </li>
          <li>
            <NavLink to="/login">Log in</NavLink>
          </li>
          <li>
            <NavLink to="/me">Your ratings</NavLink>
          </li>
          <li>
            <LogoutButton onLogout={handleLogout}/>
          </li>
        </ul>
      </nav>

      <hr />

      <main>
        <Outlet />
      </main>
    </>
  );
}
