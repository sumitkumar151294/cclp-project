import React from 'react';
import "../Topoffer/TopOffer.scss";
import cardarrow from '../../Assets/imgNewUI/card-arrow.png';
import image1 from '../../Assets/imgNewUI/topoffer/Rectangle.png';
import image2 from '../../Assets/imgNewUI/topoffer/Rectangle2.png';
import image3 from '../../Assets/imgNewUI/topoffer/Rectangle3.png';



const BestOffer = () => {
  return (
    <div className='top_offer_wrapper_container'>
        <div className='top_offer_header'>
          <h3>Top Offer</h3>
          <a href='#'> View All <img src={cardarrow} alt='arrow'/></a>
        </div>
        <div className='top_offer_card_container'>
          <div className='offer_card'>
              <img className='top_image' src={image1} alt='image1'/>
              <div className='card_title'>
                <h4>Zomato</h4>
              </div>
              <div className='card_content'>
                <p>Avail 10% Instant discount up to Rs 300 on a minimum order Rs.1750</p>
              </div>
              <div className='card_footer'>
                <a href="#">Claim
                  <img src={cardarrow} alt='arrow'/>
                </a>
              </div>
          </div>
          <div className='offer_card'>
              <img className='top_image' src={image2} alt='image1'/>
              <div className='card_title'>
                <h4>Nike</h4>
              </div>
              <div className='card_content'>
                <p>75% off on a minimum Order of ₹499</p>
              </div>
              <div className='card_footer'>
                <a href="#">Click Here
                  {/* <img src={cardarrow} alt='arrow'/> */}
                </a>
              </div>
          </div>
          <div className='offer_card'>
              <img className='top_image' src={image3} alt='image1'/>
              <div className='card_title'>
                <h4>Faasos</h4>
              </div>
              <div className='card_content'>
                <p>Get Flat INR 120 off on orders above INR 249</p>
              </div>
              <div className='card_footer clp'>
                <a href="#">T&C
                  {/* <img src={cardarrow} alt='arrow'/> */}
                </a>
              </div>
          </div>
          <div className='offer_card'>
              <img className='top_image' src={image3} alt='image1'/>
              <div className='card_title'>
                <h4>Faasos</h4>
              </div>
              <div className='card_content'>
                <p>Get Flat INR 120 off on orders above INR 249</p>
              </div>
              <div className='card_footer clp'>
                <a href="#">T&C
                  {/* <img src={cardarrow} alt='arrow'/> */}
                </a>
              </div>
          </div>
          <div className='offer_card'>
              <img className='top_image' src={image3} alt='image1'/>
              <div className='card_title'>
                <h4>Faasos</h4>
              </div>
              <div className='card_content'>
                <p>Get Flat INR 120 off on orders above INR 249</p>
              </div>
              <div className='card_footer clp'>
                <a href="#">T&C
                  {/* <img src={cardarrow} alt='arrow'/> */}
                </a>
              </div>
          </div>
          <div className='offer_card'>
              <img className='top_image' src={image3} alt='image1'/>
              <div className='card_title'>
                <h4>Faasos</h4>
              </div>
              <div className='card_content'>
                <p>Get Flat INR 120 off on orders above INR 249</p>
              </div>
              <div className='card_footer clp'>
                <a href="#">T&C
                  {/* <img src={cardarrow} alt='arrow'/> */}
                </a>
              </div>
          </div>
        </div>
    </div>
  )
}

export default BestOffer;