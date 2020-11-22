import React, {Component} from 'react';
import { withFirebase } from '../Firebase';
import {Link} from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import 'firebase/firestore'
import _ from 'lodash';

class Shipments extends Component {
    constructor(props){
        super(props);

        this.state = {
            shipments: [ ],
            sortColumn: {feature: 'date', order: 'asc'}
        }
    }
    
    componentDidMount(){
        var ships = [];

        return this.props.firebase.db.collection("shipments").get().then(snap =>{
            snap.forEach(doc => {
                var id = doc.id;
                var title = doc.data().ItemTitle;
                var date = doc.data().DesiredDate;
                var from = doc.data().From;
                var to = doc.data().To;
                var kilos = doc.data().ItemWeight;
                var size = doc.data().ItemSize;
                var email = doc.data().UserEmail;
                ships.push({id, title, date, from, to, kilos, size, email})
            })
        this.setState({shipments: ships});
        })
    }

    renderDeleteButton(sh){   
        const currentUserEmail = this.props.firebase.auth.currentUser.email;
        if(sh.email === currentUserEmail)
        return <button onClick={() => this.handleDelete(sh)} className="btn btn-danger text-center">Cancel</button>
    }

    handleDelete = (sh) => {
        this.props.firebase.db.collection('shipments').doc(sh.id).delete();
        const shipts = this.state.shipments.filter(s => s.id !== sh.id);
        this.setState({shipments: shipts});
    }

    isUrgent = (sh) => {
        var urgent = false;
        var today = new Date();
        var sh_date = sh.date; 
        var sh_Date = new Date(sh_date);
        if((sh_Date - today)/(1000*60*60*24) < 3)
        urgent = true;

        return urgent;
    }

    onSort = (feature) =>{
        const sortColumn = {...this.state.sortColumn}
        if(sortColumn.feature === feature)
            sortColumn.order = (sortColumn.order === 'asc') ? 'desc' : 'asc';
        else{
            sortColumn.feature = feature;
            sortColumn.order = 'asc';
        }
        this.setState({ sortColumn: {feature: sortColumn.feature, order: sortColumn.order}})
    }

    renderSortIcon = (feature) => {
        const sc = {...this.state.sortColumn}
        if (sc.order === 'asc') return <i className="fa fa-sort-asc" aria-hidden="true" />
        return <i className="fa fa-sort-desc" aria-hidden="true" />
    }


    render() {

        const {
            shipments,
            sortColumn
        } = this.state;

        const sorted = _.orderBy(this.state.shipments, [sortColumn.feature], [sortColumn.order]);
        
        return (
                <div className="text-center cont">
                    <table className="shipmentsTable text-white">
                        <tbody>
                        <tr className="text-center headline">
                            <th colSpan="8"><h1>List of inquiries for shipping</h1></th>
                        </tr>
                        <tr>
                            <th>Item</th>
                            <th className="clickable" onClick={() => this.onSort('date')}>Delivery until{this.renderSortIcon('date')}</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Weight</th>
                            <th>Size</th>
                            <th>Contact</th>
                            <th></th>
                        </tr>
               {sorted.map(sh =>
                    <tr key={sh.id} style={this.isUrgent(sh) ? {color: '#dc3545', backgroundColor: '#ddd'} : {color: 'white'}}>
                        <td>{sh.title}</td>
                        <td>{sh.date}</td>
                        <td>{sh.from}</td>
                        <td>{sh.to}</td>
                        <td>{sh.kilos}</td>
                        <td>{sh.size}</td>
                        <td>{sh.email}</td>
                        <td className="text-center">{this.renderDeleteButton(sh)}</td>
                    </tr>
               )}
               </tbody>
                    </table>
                    {/* <br></br>
                    <Link className="btn btn-black" to={ROUTES.SHIPPING}>Add Inquiry</Link> */}
                </div>
        );
    }
}

export default withFirebase(Shipments);