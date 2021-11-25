import { NavLink, Switch, Route } from 'react-router-dom';

const Navigation = () => (
    <nav>
        <ul>
            <li><NavLink to='/'>Home</NavLink></li>
            <li><NavLink to='/profile'>Profile</NavLink></li>
            <li><a href="http://127.0.0.1:8000/user/login/">Login</a></li>
            <li><a href="http://127.0.0.1:8000/user/logout/">Logout</a></li>
            <li><NavLink to='/shop'>Shop</NavLink></li>
        </ul>
    </nav>
);

export default Navigation




