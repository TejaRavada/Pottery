import React from 'react';
import Location from './assets/Location.png'
import { Link } from 'react-router-dom';
const Address = () => {

    const address = [
        {
            title: 'Office',
            address: '205 North Michigan Avenue, Suite 810 Chicago, 60601, USA',
            phone: '(123) 456-7890',
            mail: 'contact@Evara.com',
            btn: 'View map'
        },
        {
            title: 'Studio',
            address: '205 North Michigan Avenue, Suite 810 Chicago, 60601, USA',
            phone: '(123) 456-7890',
            mail: 'contact@Evara.com',
            btn: 'View map'
        },
        {
            title: 'Shop',
            address: '205 North Michigan Avenue, Suite 810 Chicago, 60601, USA',
            phone: '(123) 456-7890',
            mail: 'contact@Evara.com',
            btn: 'View map'
        }
    ]
    return (
        <section className=" container">
            <div className="address">
                <div className="address_cards">
                    {
                        address.map((item, index) =>
                        (
                            <div className="address_card" key={index}>
                                <h4 className='sub-topic-heading'>{item.title}</h4>
                                <p>{item.address}</p>
                                <p><u>Phone:</u> {item.phone}</p>
                                <p><u>Email:</u> {item.mail}</p>
                                <Link to="#" className='but-link transition' >
                                    <img src={Location} alt="" />
                                    {item.btn}
                                </Link>
                            </div>
                        ))

                    }
                </div>
            </div>
        </section>
    )
}

export default Address