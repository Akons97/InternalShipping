import React from 'react';

import logo from './../../img/bologo.png';

const ShippingPage = () => {
    return (
        <div className="formContainer">
                <form className='loginPage mx-auto'>
                <img className='logo' src={logo} alt='logo'/>
                <div className="form-group">
                    <label for='title'>Item to ship: </label>
                    <input name='title' type="title" className="form-control" id="title" aria-describedby="emailHelp" placeholder="e.g. Computer Screen" />
                </div>
                <div className="form-group">
                    <label for='date'>Desired date: </label>
                    <input name="date" type="date" className="form-control" id="date" placeholder="Date" />
                </div>
                <div className="form-group">
                    <label for='from'>From: &nbsp;</label>
                    <select className="form-control" name="from" id="from">
                        <option value='lyngby'>Lyngby</option>
                        <option value='struer'>Struer</option>
                    </select>
                </div>
                <div className="form-group">
                    <label for='to'>To: &nbsp;</label>
                    <select className="form-control" name="to" id="to">
                        <option value='struer'>Struer</option>
                        <option value='lyngby'>Lyngby</option>
                    </select>
                </div>
                <div className="form-group">
                    <label for='kilos'>Item weight: &nbsp;</label>
                    <select className="form-control" name="kilos" id="kilos">
                        <option value='1'> &lt; 1kg</option>
                        <option value='5'> &lt; 5kg</option>
                        <option value='10'> &lt; 10kg</option>
                        <option value='11'> &gt; 10kg</option>
                    </select>
                    </div>
                 <div className="form-group">
                    <label for='size'>Item size: &nbsp;</label>
                    <select className="form-control" name="size" id="size">
                        <option value='small'>Small</option>
                        <option value='medium'>Medium</option>
                        <option value='large'>Large</option>
                        <option value='xlarge'>Extra Large</option>
                    </select>
                </div>
                <div className="form-group text-center">
                    <button type='submit' className='btn btn-black'>
                        Post inquiry
                    </button>
                </div>
                </form>  
                </div> 
    );
};

export default ShippingPage;