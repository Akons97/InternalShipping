import React from 'react';
import {Link} from 'react-router-dom';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import { render } from '@testing-library/react';

const Navigation = ({authUser}) => (
<div>
    {authUser ? <NavigationAuth /> : null}
</div>
)
const NavigationAuth = () => (
    <div className="navbar navbar-expand-md navig">
    <ul class="navbar-nav ml-auto">
    <li class="nav-item">
      <Link className="btn btn-black" to={ROUTES.SHIPMENTS}>Shipping inquiries</Link>
    </li>
    <li>&nbsp;&nbsp;</li>
    <li class="nav-item">
      <Link className="btn btn-black" to={ROUTES.SHIPPING}>Add Inquiry</Link>
      </li>
      <li>&nbsp;&nbsp;</li>
    <li class="nav-item">
        <SignOutButton/>
    </li>
    </ul>
    </div>

);
 
export default Navigation