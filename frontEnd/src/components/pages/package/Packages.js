import React, { Component } from "react";
import { Link } from "react-router-dom";
class Packages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cities: [],
            type:null
        };

    }
    getData() {
        const { type } = this.props.match.params
        this.state.type=type
        console.table(type)
        fetch("http://localhost:8000/backend/packages", {
            method: "POST",
            body: JSON.stringify({
                type: type
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => response.json())
            .then(data => {
                this.setState({
                    cities: data.cities,
                })
                console.table(this.state.cities)
            });
    }

    async componentDidMount() {
        this.getData()
    }

    render() {
        var cities = this.state.cities
        var cityHtml = []
        if (!this.state.cities) {
            // resource is not yet loaded

            return <div class="preloader">
                <div className="loader loader1">
                    <span style={{ '--i': 1 }} />
                    <span style={{ '--i': 2 }} />
                    <span style={{ '--i': 3 }} />
                    <span style={{ '--i': 4 }} />
                    <span style={{ '--i': 5 }} />
                    <span style={{ '--i': 6 }} />
                    <span style={{ '--i': 7 }} />
                    <span style={{ '--i': 8 }} />
                    <span style={{ '--i': 9 }} />
                    <span style={{ '--i': 10 }} />
                    <span style={{ '--i': 11 }} />
                    <span style={{ '--i': 12 }} />
                    <span style={{ '--i': 13 }} />
                    <span style={{ '--i': 14 }} />
                    <span style={{ '--i': 15 }} />
                    <span style={{ '--i': 16 }} />
                    <span style={{ '--i': 17 }} />
                    <span style={{ '--i': 18 }} />
                    <span style={{ '--i': 19 }} />
                    <span style={{ '--i': 20 }} />
                    <div className="rocket" />
                </div></div>

                ;


        }
        else {
            for (let i = 0; i < cities.length; i++) {
                cityHtml.push(
                    <div className="col-lg-4 col-md-6 col-sm-6 wow fadeInUp animated" data-wow-duration="1500ms" data-wow-delay="0ms">
                        <div className="package-card">
                            <div className="package-thumb">
                                <Link to={`${process.env.PUBLIC_URL}/aboutCity/${cities[i].name}`}>
                                    <img src={cities[i].images[1]} alt="" className="img-fluid" style={{ height:"280px"}} />
                                </Link>
                            </div>
                            <div className="package-details">
                               
                                <h3>
                                    <i className="flaticon-arrival" />
                                    <Link to={`${process.env.PUBLIC_URL}/aboutCity/${cities[i].name}`}>{cities[i].name}</Link>
                                </h3>
                                <div className="package-info">
                                    <h5><i className="flaticon-footprints icon-beside-word" />{cities[0].type}</h5>
                                </div>
                            </div>
                        </div>
                    </div>)
            }}
            return (
                <div>
                    {/* ===============  breadcrumb area start =============== */}
                    <div className="breadcrumb-area">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12">
                                    <div className="breadcrumb-wrap">
                                        <h2>Explore Places with {this.state.type}</h2>
                                        <ul className="breadcrumb-links">
                                            <li>
                                                <Link to={`${process.env.PUBLIC_URL}/`}>Home</Link>
                                                <i className="bx bx-chevron-right" />
                                            </li>
                                            <li>Explore Places with {this.state.type}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* ===============  breadcrumb area end =============== */}

                    {/* ===============  Package  area start =============== */}
                    <div className="package-area pt-120">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12">
                                    <div className="section-head pb-45">
                                        <h5>Choose Your Place</h5>
                                        <h2>Select Your best Place For Your Travel</h2>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                {cityHtml}
                            </div>
                        </div>
                    </div>
                    {/* ===============  Package  area end =============== */}
                </div>
            );
        }
    }

export default Packages;
