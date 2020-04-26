//Jubi:home page slider component
import React, { Component } from "react";
import { withRouter } from "react-router-dom"
import { reqTaskList } from "../../api/api";
class Slider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
    async componentDidMount() {
        try {
            const result = await reqTaskList();
            if (result.status === 200) {
                this.setState({ data: result.data.taskList });
            }
        } catch (error) {
            alert("failed to request task list");
        }
    }

    generateUrlPath(item) {
        return `/browse-tasks/${item.title.replace(
            / /g,
            "-"
        )}-${item._id}`
    }

    render() {
        return (
            <>
                <div className="homepage__scrolling-items-slider slider1">
                    {this.state.data.map((item, index) => (
                        <div className="homepage__scrolling-items-slider-itembox" onClick={() => {
                            this.props.history.push(
                                this.generateUrlPath(item)
                            );
                        }}>
                            <span>{item.status}</span>
                            <div className="homepage__scrolling-items-slider-itembox-middle">
                                <img src={item.photo}></img>
                                <h5>{item.title}</h5>
                                <p>${item.price}</p>
                            </div>
                            <div className="homepage__scrolling-items-slider-itembox-footer">
                                <svg height="16" width="16" viewBox="0 0 24 24">
                                    <path d="M16.2 8.16l4.74.73a1.23 1.23 0 0 1 .67 2.11l-3.46 3.28a1.23 1.23 0 0 0-.37 1.1l.77 4.68a1.24 1.24 0 0 1-1.82 1.29L12.5 19.1a1.28 1.28 0 0 0-1.16 0l-4.27 2.17A1.25 1.25 0 0 1 5.27 20l.85-4.68a1.19 1.19 0 0 0-.34-1.09l-3.41-3.4a1.23 1.23 0 0 1 .71-2.1l4.75-.64a1.26 1.26 0 0 0 .95-.67l2.16-4.24a1.25 1.25 0 0 1 2.24 0l2.09 4.28a1.22 1.22 0 0 0 .93.7z"></path>
                                </svg>
                                <div className="homepage__scrolling-items-slider-itembox-footer-stars">5 Stars</div>
                            </div>
                        </div>))}
                    <div className="homepage__scrolling-items-slider-itembox">
                        <span>Delivery</span>
                        <div className="homepage__scrolling-items-slider-itembox-middle">
                            <img src="https://eu7cmie.cloudimg.io/s/crop/64x64/https://assets-airtasker-com.s3.amazonaws.com/uploads/user/avatar/295110/image-6ee21ba43a3d4f0eb694c4c95b2eaaf9.jpg"></img>
                            <h5>Deliver boxes to storage</h5>
                            <p>$180</p>
                        </div>
                        <div className="homepage__scrolling-items-slider-itembox-footer">
                            <svg height="16" width="16" viewBox="0 0 24 24">
                                <path d="M16.2 8.16l4.74.73a1.23 1.23 0 0 1 .67 2.11l-3.46 3.28a1.23 1.23 0 0 0-.37 1.1l.77 4.68a1.24 1.24 0 0 1-1.82 1.29L12.5 19.1a1.28 1.28 0 0 0-1.16 0l-4.27 2.17A1.25 1.25 0 0 1 5.27 20l.85-4.68a1.19 1.19 0 0 0-.34-1.09l-3.41-3.4a1.23 1.23 0 0 1 .71-2.1l4.75-.64a1.26 1.26 0 0 0 .95-.67l2.16-4.24a1.25 1.25 0 0 1 2.24 0l2.09 4.28a1.22 1.22 0 0 0 .93.7z"></path>
                            </svg>
                            <div className="homepage__scrolling-items-slider-itembox-footer-stars">5 Stars</div>
                        </div>
                    </div>
                    {/* {this.state.data.map((item, index) =>(<div></div>))} */}

                </div>
                <div className="homepage__scrolling-items-slider slider2">
                    {this.state.data.map((item, index) => (
                        <div className="homepage__scrolling-items-slider-itembox" onClick={() => {
                            this.props.history.push(
                                this.generateUrlPath(item)
                            );
                        }}>
                            <span>{item.status}</span>
                            <div className="homepage__scrolling-items-slider-itembox-middle">
                                <img src={item.photo}></img>
                                <h5>{item.title}</h5>
                                <p>${item.price}</p>
                            </div>
                            <div className="homepage__scrolling-items-slider-itembox-footer">
                                <svg height="16" width="16" viewBox="0 0 24 24">
                                    <path d="M16.2 8.16l4.74.73a1.23 1.23 0 0 1 .67 2.11l-3.46 3.28a1.23 1.23 0 0 0-.37 1.1l.77 4.68a1.24 1.24 0 0 1-1.82 1.29L12.5 19.1a1.28 1.28 0 0 0-1.16 0l-4.27 2.17A1.25 1.25 0 0 1 5.27 20l.85-4.68a1.19 1.19 0 0 0-.34-1.09l-3.41-3.4a1.23 1.23 0 0 1 .71-2.1l4.75-.64a1.26 1.26 0 0 0 .95-.67l2.16-4.24a1.25 1.25 0 0 1 2.24 0l2.09 4.28a1.22 1.22 0 0 0 .93.7z"></path>
                                </svg>
                                <div className="homepage__scrolling-items-slider-itembox-footer-stars">5 Stars</div>
                            </div>
                        </div>))}
                    <div className="homepage__scrolling-items-slider-itembox">
                        <span>Delivery</span>
                        <div className="homepage__scrolling-items-slider-itembox-middle">
                            <img src="https://eu7cmie.cloudimg.io/s/crop/64x64/https://assets-airtasker-com.s3.amazonaws.com/uploads/user/avatar/295110/image-6ee21ba43a3d4f0eb694c4c95b2eaaf9.jpg"></img>
                            <h5>Deliver boxes to storage</h5>
                            <p>$180</p>
                        </div>
                        <div className="homepage__scrolling-items-slider-itembox-footer">
                            <svg height="16" width="16" viewBox="0 0 24 24">
                                <path d="M16.2 8.16l4.74.73a1.23 1.23 0 0 1 .67 2.11l-3.46 3.28a1.23 1.23 0 0 0-.37 1.1l.77 4.68a1.24 1.24 0 0 1-1.82 1.29L12.5 19.1a1.28 1.28 0 0 0-1.16 0l-4.27 2.17A1.25 1.25 0 0 1 5.27 20l.85-4.68a1.19 1.19 0 0 0-.34-1.09l-3.41-3.4a1.23 1.23 0 0 1 .71-2.1l4.75-.64a1.26 1.26 0 0 0 .95-.67l2.16-4.24a1.25 1.25 0 0 1 2.24 0l2.09 4.28a1.22 1.22 0 0 0 .93.7z"></path>
                            </svg>
                            <div className="homepage__scrolling-items-slider-itembox-footer-stars">5 Stars</div>
                        </div>
                    </div>
                    {/* {this.state.data.map((item, index) =>(<div></div>))} */}
                </div>


            </>
        )
    }
}
export default withRouter(Slider);