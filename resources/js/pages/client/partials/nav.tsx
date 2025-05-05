import { Link } from '@inertiajs/react';

const Nav = () => {
    return (
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">

            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link" data-widget="pushmenu" href="#" role="button"><i
                        className="fas fa-bars"></i></Link>
                </li>
            </ul>

            {/*SEARCH FORM */}
            {/* <form class="form-inline ml-3">*/}
            {/*  <div class="input-group input-group-sm">*/}
            {/*    <input class="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search">*/}
            {/*    <div class="input-group-append">*/}
            {/*      <button class="btn btn-navbar" type="submit">*/}
            {/*        <i class="fas fa-search"></i>*/}
            {/*      </button>*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*</form> */}


        </nav>
    );
};

export default Nav;
