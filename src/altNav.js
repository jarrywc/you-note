import axios from "axios";
import {SearchMain} from "./nav";
import {Navbar, NavbarBrand, NavItem} from "react-bootstrap";
import {Link} from "react-router-dom";

export const AltNav = () => {

    // let navigate = useNavigate();
    //
    // const onClickReact = (link) => {
    //     navigate(link, { replace: true });
    // }

    const onClick = async (e) => {
        console.log('Go to '+e.target.value)
        await axios.get('/'+e.target.value );
        // window.location.pathname = "/landing";
        // window.location.reload();

    }

    return (
        <Navbar className="navbar-expand-lg ">
            <img className="nav-icon" src="/static/younote.png" alt=""/>
            <div className="nav-header">YouNote</div>
            <SearchMain />
            <NavItem>
                <Link className="home-btn" to="/videos/list" style={{textDecoration:"none"}} href="">List</Link>
            </NavItem>
            {/*<NavItem>*/}
            {/*    <a className="sign-btn" onClick={onClick} defaultValue={'/landing'} style={{textDecoration:"none"}} href="">Home</a>*/}
            {/*</NavItem>*/}
            <NavItem>
                <a className="sign-btn" onClick={onClick} defaultValue={'/logout'} style={{textDecoration:"none"}} href="">Logout</a>
            </NavItem>

        </Navbar>



    );
}