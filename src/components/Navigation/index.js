import React from 'react';
import {Link} from 'react-router-dom';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';

const Navigation = ({authUser}) => (
<div>
    {authUser ? <NavigationAuth /> : null}
</div>
)
const NavigationAuth = () => (
    <div className="navbar navbar-expand-md navig">
    <ul className="navbar-nav ml-auto">
    <li className="nav-item">
      <Link className="btn btn-black" to={ROUTES.SHIPMENTS}>Shipping inquiries</Link>
    </li>
    <li>&nbsp;&nbsp;</li>
    <li className="nav-item">
      <Link className="btn btn-black" to={ROUTES.SHIPPING}>Add Inquiry</Link>
      </li>
      <li>&nbsp;&nbsp;</li>
    <li className="nav-item">
        <SignOutButton/>
    </li>
    </ul>
    </div>

);
 
export default Navigation