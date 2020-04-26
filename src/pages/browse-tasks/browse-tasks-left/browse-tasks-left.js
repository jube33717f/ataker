import React, { Component } from "react";
import "./browse-tasks-left.scss";
import { connect } from "react-redux";
import { Route, withRouter, Link } from "react-router-dom";
import { reqTaskList } from "../../../api/api";
import formatDate from "../../../utils/date-formatter";
import { reloadTaskList, addTaskList } from "../../../redux/actions"

// TODO @JUBI
class BrowseTasksLeft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: -1,
      newsShow: false,
      newsNum: this.props.taskList.listData.length,
      //itemShow:false
    };
    this.setCurrentIndex = this.setCurrentIndex.bind(this);
    this.refresh = this.refresh.bind(this);
  }
  setCurrentIndex(event) {
    // console.log('a')
    this.setState({
      currentIndex: parseInt(event.currentTarget.getAttribute('indexc'), 10)
      // console.log(currentIndex)
    })
    // console.log(this.state.currentIndex)
  }
  refresh() {
    // console.log('a')
    if (this.props.taskList.listData && this.props.taskList.listData.length > 0) {
      this.setState({ newsShow: false, newsNum: this.props.taskList.listData.length });
    }
    this.forceUpdate();
  }

  //SONIA:
  generatePath(item) {
    return `${item.title.replace(
      / /g,
      "-"
    )}-${item._id}`;
  }

  ////
  generateStatus(status) {
    if (status === "assigned-topay") {
      return "assigned"
    } else {
      return status
    }
  }

  async componentDidMount() {
    try {
      const result = await reqTaskList();
      if (result.status === 200) {
        this.props.addTaskList(result.data.taskList);
        this.setState({ newsNum: result.data.taskList.length });
      }
    } catch (error) {
      alert("failed to request task list");
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(this.props) != JSON.stringify(prevProps)) {
      if (this.props.taskList.readyToReload) {
        try {
          const result = await reqTaskList();
          if (result.status === 200) {
            this.props.addTaskList(result.data.taskList);
            this.setState({ newsShow: true, newsNum: result.data.taskList.length - this.state.newsNum })
          }
        } catch (error) {
          alert("failed to request task list");
        }
        this.props.reloadTaskList(false)
      }
    }
    // console.log(prevProps.price)
    // if(this.props.price!==prevProps.price){

    //     this.forceUpdate();
    // }
  }

  render() {

    return (
      <div className="task__list">
        {this.state.newsShow && (<div onClick={this.refresh} className="task__list--newlist--loadmore--frame">
          <div className="task__list--newlist--loadmore">
            <span className="newlist--loadmore--count" >{this.state.newsNum} </span>
            <span className="newlist--loadmore--message"> new task{this.state.newsNum < 2 ? '' : 's'}</span>
          </div>
        </div>)}

        <div className="loaderific--not--loading"></div>

        <div className="list vertical--scroll">
          <div className="group">
            {/* {this.props.price===[]?'':''} */}
            {/* this.props.price===[]? */}
            {this.props.price.length !== 0 ? (this.props.taskList.listData.filter(data => data.price - 0 > this.props.price[0] && data.price - 0 < this.props.price[1]).sort((a, b) => Date.parse(b.postDate) - Date.parse(a.postDate))
              .map((item, index) => (
                // SONIA：把下一行原来的<a>换成了div+onclick事件，这样可以通过react router跳转到下个页面
                //this.state.currentIndex === index ? 'newtask__list--item--open' : ''
                //   <a key={index} className="newtask__list--item newtask__list--item--open">

                <div
                  key={index}
                  className={['newtask__list--item', 'newtask__list--item--open', this.state.currentIndex === index ? 'newtask__list--item--open--style' : ''].join(' ')}//jubi
                  indexc={index}
                  onMouseDown={this.setCurrentIndex}
                  onClick={() => {
                    this.props.history.push(
                      `${this.props.match.path}/${this.generatePath(item)}`
                    );

                  }}
                >
                  <div className="newtask__list--item--header">
                    <span className="newtask__list--item--header--title">
                      {item.title}
                    </span>
                    <div className="newtask__list--item--header--price">
                      <span>${item.price}</span>
                    </div>
                  </div>
                  <div className="newtask__list--item--body">
                    <div className="avatar__img newtask__list--item--body--avatar">
                      <img src={item.photo} />
                    </div>
                    <div className="newtask__list--item--avatar--online">
                      <span className="newtask__list--item--avatar--online--detail">
                        {item.place}
                      </span>
                    </div>
                    <div className="newtask__list--item--dateat--icon--calendar">
                      <span className="newtask__list--item--dateat--icon--calendar--detail">
                        {formatDate(item.dueDate)}
                      </span>
                    </div>
                  </div>
                  <div className="newtask__list--item--footer">
                    <span className="newtask__list--item--footer--status">
                      {this.generateStatus(item.status)}
                    </span>
                    <span className="newtask__list--item--footer--bids">
                      {/* SONIA: */}
                      {item.offers ? `${item.offers.length} offer${item.offers.length > 1 ? 's' : ''}` : `0 offer`}
                    </span>
                  </div>
                  {/* </a> */}
                </div>
              ))) :
              (this.props.taskList.listData.sort((a, b) => Date.parse(b.postDate) - Date.parse(a.postDate)).map((item, index) => (
                // SONIA：把下一行原来的<a>换成了div+onclick事件，这样可以通过react router跳转到下个页面
                //this.state.currentIndex === index ? 'newtask__list--item--open' : ''
                //   <a key={index} className="newtask__list--item newtask__list--item--open">

                <div
                  key={index}
                  className={['newtask__list--item', 'newtask__list--item--open', this.state.currentIndex === index ? 'newtask__list--item--open--style' : ''].join(' ')}//jubi
                  indexc={index}
                  onMouseDown={this.setCurrentIndex}
                  onClick={() => {
                    this.props.history.push(
                      `${this.props.match.path}/${this.generatePath(item)}`
                    );

                  }}
                >
                  <div className="newtask__list--item--header">
                    <span className="newtask__list--item--header--title">
                      {item.title}
                    </span>
                    <div className="newtask__list--item--header--price">
                      <span>${item.price}</span>
                    </div>
                  </div>
                  <div className="newtask__list--item--body">
                    <div className="avatar__img newtask__list--item--body--avatar">
                      <img src={item.photo} />
                    </div>
                    <div className="newtask__list--item--avatar--online">
                      <span className="newtask__list--item--avatar--online--detail">
                        {item.place}
                      </span>
                    </div>
                    <div className="newtask__list--item--dateat--icon--calendar">
                      <span className="newtask__list--item--dateat--icon--calendar--detail">
                        {formatDate(item.dueDate)}
                      </span>
                    </div>
                  </div>
                  <div className="newtask__list--item--footer">
                    <span className="newtask__list--item--footer--status">
                      {item.status}
                    </span>
                    <span className="newtask__list--item--footer--bids">
                      {/* SONIA: */}
                      {item.offers ? `${item.offers.length} offer${item.offers.length > 1 ? 's' : ''}` : `0 offer`}
                    </span>
                  </div>
                  {/* </a> */}
                </div>
              )))}

          </div>

          <div className="newtask__list--loading">
            <div className="loaderific--not--loading"></div>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(state => ({ taskList: state.taskList, price: state.price.price }), { addTaskList, reloadTaskList })(
  withRouter(BrowseTasksLeft)
);