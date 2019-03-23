import React from 'react';

function DashBoard(props) {

    return(
        <div className="container">
            <div className="row align-items-start">       
                <div className="col-12">
                    <h2>Our History</h2>
                    <p>Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.</p>
                    <p>The restaurant traces its humble beginnings to <em>The Frying Pan</em>, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.</p>
                </div>

                <div className="col-12">
                    <h5>Our Address</h5>
                    <address>
                        1625, Avenue Guarabuava<br />
                        DownTown<br />
		                Curitiba<br />
		                <i className="fa fa-phone fa-lg"></i>: +852 1234 5678<br />
		                <i className="fa fa-fax fa-lg"></i>: +852 8765 4321<br />
		                <i className="fa fa-envelope fa-lg"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                    </address>
                </div>

            </div>
        </div>
    );
}

export default DashBoard;  