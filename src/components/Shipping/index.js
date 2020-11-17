import React, {Component} from 'react';
import { withFirebase } from '../Firebase';
import 'firebase/firestore';
import * as ROUTES from '../../constants/routes';

import logo from './../../img/bologo.png';

const ShippingPage = () => (
    <div>
    <ShippingPageFormBase />
    </div>
);

const shipments = [];
const INITIAL_STATE = {
    title: '',
    date: '',
    from: 'Lyngby',
    to: 'Struer',
    kilos: '<1kg',
    size: 'Medium'
};

class ShippingPageFormBase extends Component {
    constructor(props){
        super(props);

        this.state = {...INITIAL_STATE};
    }

    addInquiry = event => {
        this.props.firebase.db.collection("shipments").add({
            ItemTitle: this.state.title,
            DesiredDate: this.state.date,
            From: this.state.from,
            To: this.state.to,
            ItemWeight: this.state.kilos,
            ItemSize: this.state.size,
            UserEmail: this.props.firebase.auth.currentUser.email
        }).then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        }).catch((error) => {
            console.error("Error adding document: ", error);
        });
        this.state = {...INITIAL_STATE};
        event.preventDefault();
        this.props.history.push(ROUTES.SHIPMENTS);
    };
    
    onChange = event => {
        this.setState({[event.target.name]: event.target.value});
    }

    render(){
        const {title, date, from, to, kilos, size} = this.state;
        const isInvalid = title === '' || date === '';
        console.log(...shipments);
        return (
            <div className="cont">
                    <form className='loginPage mx-auto' onSubmit={this.addInquiry}>
                    <img className='logo' src={logo} alt='logo'/>
                    <div className="form-group">
                        <label htmlFor='title'>Item to ship: </label>
                        <input name='title' type="title" value={title} onChange={this.onChange} className="form-control" id="title" aria-describedby="emailHelp" placeholder="e.g. Computer Screen" />
                    </div>
                    <div className="form-group">
                        <label htmlFor='date'>Desired date: </label>
                        <input name="date" type="date" value={date} onChange={this.onChange} className="form-control" id="date" placeholder="Date" />
                    </div>
                    <div className="form-group">
                        <label htmlFor='from'>From: &nbsp;</label>
                        <select className="form-control" value={from} onChange={this.onChange} name="from" id="from">
                            <option value='Lyngby'>Lyngby</option>
                            <option value='Struer'>Struer</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor='to'>To: &nbsp;</label>
                        <select className="form-control" value={to} onChange={this.onChange} name="to" id="to">
                            <option value='Struer'>Struer</option>
                            <option value='Lyngby'>Lyngby</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor='kilos'>Item weight: &nbsp;</label>
                        <select className="form-control" value={kilos} onChange={this.onChange} name="kilos" id="kilos">
                            <option value='<1kg'> &lt; 1kg</option>
                            <option value='<5kg'> &lt; 5kg</option>
                            <option value='<10kg'> &lt; 10kg</option>
                            <option value='<11kg'> &gt; 10kg</option>
                        </select>
                        </div>
                    <div className="form-group">
                        <label htmlFor='size'>Item size: &nbsp;</label>
                        <select className="form-control" value={size} onChange={this.onChange} name="size" id="size">
                            <option value='Small'>Small</option>
                            <option value='Medium'>Medium</option>
                            <option value='Large'>Large</option>
                            <option value='Xlarge'>Extra Large</option>
                        </select>
                    </div>
                    <div className="form-group text-center">
                        <button disabled={isInvalid} type='submit' className='btn btn-black'>
                            Post inquiry
                        </button>
                    </div>
                    </form>  
                    </div> 
            );
        }
}

export default withFirebase(ShippingPageFormBase);

export { ShippingPage };