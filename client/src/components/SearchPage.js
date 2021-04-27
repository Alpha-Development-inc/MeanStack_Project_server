import React, { Component } from 'react';
import './styles/allCountries.css';
import axios from 'axios';
import { NavLink } from 'react-router-dom';


export default class Countries extends Component {
    state = {
        pageNumber: 0,
        pagination: 50,
        count: 0,
        countries: [],
        visCountries: []
    };

    componentDidMount() {
        axios.get("https://restcountries.eu/rest/v2/all").then(response => {
            this.setState({
                countries: response.data,
                visCountries: response.data.slice(this.state.count, this.state.pagination)
            });
        });
    }

    getNext = () => {
        this.state.pageNumber++;
        const start = this.state.count, end = start + this.state.pagination;
        this.setState({
            visCountries: this.state.countries.slice(start, end)
        });
    };

    getPrev = () => {
        this.state.pageNumber--;
        const start = this.state.count, end = start + this.state.pagination;
        this.setState({
            visCountries: this.state.countries.slice(end, start)
        });
    };

    render() {
        return (
            <section>
                <div className="row countryList">
                    {this.state.visCountries.map(country => {
                        count: this.state.count++
                        return (
                            <div className="col-md-6" key={country.alpha2Code}>
                                <div className="card">
                                    <br></br>
                                    <h5 className="card-header text-white bg-info">{this.state.count}: {country.name}</h5>
                                    <div className="card-body row">
                                        <div className="col-md-6 text-center"><img className="imgCountry" src={country.flag} /></div>
                                        <div className="col-md-6 desc">
                                            <ul>
                                            <li><p><b>Capital: </b> {country.capital}</p></li>
                                            <li><p><b>Region:</b> {country.region}</p></li>
                                            <li><p><b>Population: </b> {country.population}</p></li>
                                            <li><p><b>Area: </b> {country.area}</p></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <NavLink className="btn-link text-danger" to={`/country/${country.alpha2Code}`}>Click to Country Detail</NavLink>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        <li className="page-item active"><a onClick={this.getPrev} className="page-link">Previous {this.state.pagination} countries</a></li>
                        
                        <li className="page-item active"> <a onClick={this.getNext} className="page-link">Next {this.state.pagination} countries</a></li>
                    </ul>
                </nav>
            </section>
        );
    }
}