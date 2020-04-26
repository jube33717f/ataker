import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import $ from 'jquery';
import { Player, ControlBar } from 'video-react';
import "./video-react.css";
import pressureWasher from "../../assets/pressure-washer.svg";
import videoPlayer from "../../assets/home-video-player.jpg"
import emily from "../../assets/tasker-emily.jpg"
import brandon from "../../assets/tasker-brandon.jpg"
import samantha from "../../assets/tasker-samantha.jpg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/fontawesome-free-solid'
import "./home.scss";
import Slider from "./slider"
// TODO @SONIA/@Jubi/@Davin
export default class Home extends Component {
  constructor(props){
    super(props)
    this.state={
        tab1:true,
        tab2:false,
        tab3:false,
    }
  }

  
  render() {

    return (
      <>
      <div className="homepage">
        <div className="homepage__top-section">
          <div className="homepage__header">
            <h1>The best person for the job isn't always who you think</h1>
            <h2>Find the people with the skills you need on Airtasker</h2>
            <div className="homepage__header--button">Get started now</div>
          </div>
        </div>
        <div className="homepage__wrapper--narrow">
          <h2>What do you need done?</h2>
          <ul className="homepage__task-items">
            {[
              "Home cleaning",
              "Home cleaning",
              "Home cleaning",
              "Home cleaning",
              "Home cleaning",
              "Home cleaning",
              "Home cleaning"
            ].map(taskType => (
              <li>
                <div className="homepage__task-items--circle">
                  <img src={pressureWasher} />
                </div>
                <div>{taskType}</div>
              </li>
            ))}
          </ul>
        </div>
        <div className="homepage__scrolling-items">
          <div className="homepage__wrapper--narrow">
            <h2> See what others are getting done</h2>
          </div>
          <Slider></Slider>
        </div>
        <button className="homepage__button-second">Get started now</button>
        <div className="homepage__howitworks">

          <div className="homepage__howitworks-firtpart">
            <h2>How does Airtasker work?</h2>
            <p>Check out the video below to see exactly how Airtasker can help you get those to-dos done once and for all.</p>
          </div>
          <div className="homepage__howitworks-secondpart">
              <img src={videoPlayer}></img>
              {/* <button> ▶</button> */}
              
          <Player
                className="homepage__howitworks-secondpart-vedio"
                playsInline
                poster={videoPlayer}
                src="https://s3-ap-southeast-2.amazonaws.com/assets-airtasker-com/uploads/home/how-it-works.webm"
                //src="https://s3-ap-southeast-2.amazonaws.com/assets-airtasker-com/uploads/home/how-it-works.ogv"
                // src="https://s3-ap-southeast-2.amazonaws.com/assets-airtasker-com/uploads/home/how-it-works.mp4"
              />
              
          </div>
          <div className="sp-description">
                  <div className="sp-description-item">
                      <img src="https://www.airtasker.com/images/homepage/home-how-it-works-step-image-1.png"/>
                      <div>
                          <h3>Post your Task</h3>
                          <p>Tell us what you need. It's FREE to post</p>
                      </div>
                  </div>
                  <div className="sp-description-item">
                      <img src="https://www.airtasker.com/images/homepage/home-how-it-works-step-image-2.png"></img>
                      <div>
                          <h3>Review offers</h3>
                          <p>Get offers from trusted Taskers and view profiles.</p>
                      </div>
                  </div>
                  <div className="sp-description-item">
                      <img src="https://www.airtasker.com/images/homepage/home-how-it-works-step-image-3.png"></img>
                      <div>
                          <h3>Get it done</h3>
                          <p>Choose the right person for your task and get it done.</p>
                      </div>
                 </div>
                 
              </div>
              <div className="tp">
                  <div className="tp-top">
                     <h2>Meet some Taskers!</h2>
                      <p>Discover the story behind the people that are making the Airtasker community great, how and why they do what they do.</p>
                    
                  </div>
                  <div className="tp-midtap">
                      <div className={this.state.tab1?'tp-midtap-active':''} onClick={()=>{
                          this.setState({tab1:true,tab2:false,tab3:false})
                      }}><span>Samantha</span></div>
                      <div className={this.state.tab2?'tp-midtap-active':''} onClick={()=>{
                          this.setState({tab1:false,tab2:true,tab3:false})
                      }}><span>Emily</span></div>
                      <div className={this.state.tab3?'tp-midtap-active':''} onClick={()=>{
                          this.setState({tab1:false,tab2:false,tab3:true})
                      }}><span>Brendan</span></div>
                  </div>
                  {this.state.tab1&&<div className="tp-midcontent">
                      <div className="tp-midcontent-img">
                          <img src={samantha}></img>
                    </div>
                    <div className="tp-midcontent-ct">
                        <h4>Samantha</h4>
                        <p>Specialities: assembly, pet care, gardening</p>
                        <p>Returning to the workforce as a single mum, Sam had to find something that could be flexible and cover the cost of childcare.</p>
                        <h5>Trust</h5>
                        <p><FontAwesomeIcon style={{color:'#F2BA7C'}}icon={faStar}/><FontAwesomeIcon style={{color:'#F2BA7C'}} icon={faStar}/><FontAwesomeIcon style={{color:'#F2BA7C'}} icon={faStar}/><FontAwesomeIcon style={{color:'#F2BA7C'}} icon={faStar}/><FontAwesomeIcon style={{color:'#F2BA7C'}} icon={faStar}/></p>
                        <p>4.9 stars from 185 reviews</p>
                        <h5>What the reviews say</h5>
                        <p>Very nice and caring in trying circumstances! Thanks again</p>
                        <p>--Tim S.</p>
                    </div>
                    </div>}
                  {this.state.tab2&&<div className="tp-midcontent">
                  <div className="tp-midcontent-img">
                          <img src={emily}></img></div>
                          <div className="tp-midcontent-ct">
                          <h4>Emily</h4>
                        <p>Specialities: delivery, cleaning, packing</p>
                        <p>In-between jobs, Emily was looking for a way to earn some extra cash... Maybe even using her clown school skills!</p>
                        <h5>Trust</h5>
                        <p><FontAwesomeIcon style={{color:'#F2BA7C'}}icon={faStar}/><FontAwesomeIcon style={{color:'#F2BA7C'}} icon={faStar}/><FontAwesomeIcon style={{color:'#F2BA7C'}} icon={faStar}/><FontAwesomeIcon style={{color:'#F2BA7C'}} icon={faStar}/><FontAwesomeIcon style={{color:'#F2BA7C'}} icon={faStar}/></p>
                        <p>5 stars from 6 reviews</p>
                        <h5>What the reviews say</h5>
                        <p>She was an absolute lifesaver. Quick, friendly and super efficient!</p>
                        <p>--Myles B.</p>
                        </div>
                    </div>}
                  {this.state.tab3&&<div className="tp-midcontent">
                  <div className="tp-midcontent-img">
                          <img src={brandon}></img>

                  </div>
                          <div className="tp-midcontent-ct">
                          <h4>Brendan</h4>
                        <p>Specialities: handyman, electrician, delivery</p>
                        <p>A sparky by trade, Brendon jumped onboard when he went back to studying. Here's how Airtasker fit in with his busy lifestyle...</p>
                        <h5>Trust</h5>
                        <p><FontAwesomeIcon style={{color:'#F2BA7C'}}icon={faStar}/><FontAwesomeIcon style={{color:'#F2BA7C'}} icon={faStar}/><FontAwesomeIcon style={{color:'#F2BA7C'}} icon={faStar}/><FontAwesomeIcon style={{color:'#F2BA7C'}} icon={faStar}/><FontAwesomeIcon style={{color:'#F2BA7C'}} icon={faStar}/></p>
                        <p>5 stars from 305 reviews</p>
                        <h5>What the reviews say</h5>
                        <p>Nice work and will use Brendon again if any other lighting task</p>
                        <p>--Steven Z.</p>
                        </div>
                    </div>}
                    
             </div>
             <div className="lp">
                 <h2>Looking to earn some extra money or choose when and how you work?</h2>
                 <button className="homepage__button-second bt">Become a Tasker</button>
            </div>
             
          

        
        
      <div className="footer">
          
          <div className="footer_p1">
          <svg width="19" height="19"  viewBox="0 0 24 24"><path d="M19.46 5.44c-2.15-1.79-4.65-1.53-6.53.66l-.86 1h-.15l-.82-1c-1.9-2.19-4.4-2.45-6.57-.65a5.09 5.09 0 0 0-1.74 3.24 4.4 4.4 0 0 0 1.15 3.61l6 6.51a2.84 2.84 0 0 0 2.11.94 2.85 2.85 0 0 0 2.12-.94l6-6.53a4.54 4.54 0 0 0 1.14-3.57 5.1 5.1 0 0 0-1.85-3.27zM4.28 8.88a3.53 3.53 0 0 1 1.23-2.29 3.14 3.14 0 0 1 2-.84 3.3 3.3 0 0 1 2.43 1.33l.84 1 3.26 3.23-1 1-3-2.27a.75.75 0 0 0-1 .11L6.61 13l-1.55-1.7a2.92 2.92 0 0 1-.78-2.42zM19 11.29l-6 6.51a1.34 1.34 0 0 1-1 .45 1.34 1.34 0 0 1-.93-.38l1.46-1.46a.77.77 0 0 0 0-1.07.75.75 0 0 0-1.06 0l-1.42 1.43-.66-.72 1.33-1.33a.75.75 0 0 0 0-1.06.74.74 0 0 0-1.06 0l-1.28 1.28-.75-.83 2.08-2.39 3 2.24a.76.76 0 0 0 1-.07l2-2a.75.75 0 0 0 0-1.06l-2.65-2.61a1.85 1.85 0 0 0 .14-.14l.87-1C15 6 16.56 5 18.49 6.58a3.61 3.61 0 0 1 1.24 2.31 3 3 0 0 1-.73 2.4z"></path></svg>
          <span>Bushfire Recovery</span>
          </div>
          <div className="footer_p2">
            
          </div>
          <span>Receive the help you need</span>
        </div>
        </div>
      </div>
      </>
    );
  }
}
