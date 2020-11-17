import React, {Component} from 'react';
import { withFirebase } from '../Firebase';
import {Link} from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import 'firebase/firestore'


class Shipments extends Component {
    constructor(props){
        super(props);

        this.state = {
            shipments: [ ]
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

    render() {
        return (
                <div className="text-center cont">
                    <table className="shipmentsTable text-white">
                        <tbody>
                        <tr className="text-center headline">
                            <th colspan="8"><h1>List of inquiries for shipping</h1></th>
                        </tr>
                        <tr>
                            <th>Item</th>
                            <th>Delivery until</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Weight</th>
                            <th>Size</th>
                            <th>Contact</th>
                            <th></th>
                        </tr>
               {this.state.shipments.map(sh =>
                    <tr key={sh.id} style={this.isUrgent(sh) ? {color: '#dc3545', backgroundColor: '#fff'} : {color: 'white'}}>
                        <td>{sh.title}</td>
                        <td>{sh.date}</td>
                        <td>{sh.from}</td>
                        <td>{sh.to}</td>
                        <td>{sh.kilos}</td>
                        <td>{sh.size}</td>
                        <td>{sh.email}</td>
                        <td className="text-center">{this.renderDeleteButton(sh)}</td>
                        {console.log(this.isUrgent(sh))}
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