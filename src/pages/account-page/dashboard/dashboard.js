import React, { Component } from "react";
import InstantBook from "../../../assets/instantbook.jpg"
import Lightning from "../../../assets/illustration_icon_instant_book.webp"
import Clicking from "../../../assets/illustration_icon_post_a_task.webp"
import Img1 from "../../../assets/imgcard1.webp"
import Img2 from "../../../assets/imgcard2.webp"
import Img3 from "../../../assets/imgcard3.webp"
import Img4 from "../../../assets/imgcard4.webp"
import Img5 from "../../../assets/img5.webp"
import Img6 from "../../../assets/img6.webp"
import Img7 from "../../../assets/img7.webp"
import Img8 from "../../../assets/img8.webp"
import pressureWasher from "../../../assets/pressure-washer.svg";
import "./dashboard.scss"
// TODO @JUbi
export default class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard">
        <section className="dashboard__top">
          <img src={InstantBook}></img>
        </section>
        <section className="dashboard__booknow">
          <div>
            <img src={Lightning}></img>
            <h2>Book now & consider the job done</h2>
          </div>
          <p>Arrange & pay for a top-rated Tasker in just a few clicks</p>
          <div className="dashboard__booknow-imgCard">
            <h4>Home Cleaning</h4>
            <div className="dashboard__booknow-imgCard-cards1">
              <img src={Img1}></img>
              <img src={Img2}></img>
            </div>
            <h4 className="removals">Removals</h4>
            <div className="dashboard__booknow-imgCard-cards2">
              <img src={Img3}></img>
              <img src={Img4}></img>
            </div>
          </div>
        </section>
        <section className="dashboard__postTask">
          <div>
            <img src={Clicking}></img>
            <h2>Post a task & get offers</h2>
          </div>
          <p>Receive & review offers from Taskers who can help</p>
          <div>
            <ul className="dashboard__postTask__task-items">
              {[
                "Home cleaning",
                "Home cleaning",
                "Home cleaning",
                "Home cleaning",
                "Home cleaning",
                "Home cleaning",
                "Home cleaning",
                "Home cleaning"
              ].map(taskType => (
                <li>
                  <div className="dashboard__postTask--circle">
                    <img src={pressureWasher} />
                  </div>
                  <span>{taskType}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section className="dashboard__popular">
          <div>
            <img src={Lightning}></img>
            <h2>Popular Instant Bookings</h2>
          </div>

          <div className="dashboard__popular-imgCard">

            <div className="dashboard__popular-imgCard-cards1">
              <img src={Img5}></img>
              <img src={Img6}></img>
            </div>

            <div className="dashboard__popular-imgCard-cards2">
              <img src={Img7}></img>
              <img src={Img8}></img>
            </div>
          </div>
        </section>
        <section className="dashboard__footer">
          <h3>Can’t find what you need?</h3>
          <p>Post a task and receive offers from Taskers on how they can help!</p>
          <button>Post a task & get offers</button>
        </section>
      </div>
    );
  }
}
