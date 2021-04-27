import React, { Component } from 'react';
import '../styles/detail.css';
import axios from 'axios';

export default class CountryDetail extends Component {
    state = {
        countryDetail: [],
        otherCountries: [],
        currency: []
    };

    componentDidMount() {
        const { match } = this.props;
        console.log(match.params.alpha2Code)
        const path = `https://restcountries.eu/rest/v2/alpha/${match.params.alpha2Code}`;
        axios.get(path).then(response => {
            this.setState({
                countryDetail: response.data,
                otherCountries: response.data.altSpellings.map((res)=>{
                    return res+', '
                 }),
                 currency: response.data.currencies.map((res)=>{
                     return Object.values(res)+', ';
                 }),
            });
        });
     }

    render() {
        return (
            <section className="destailSection">
                
                <div className="countryDetail">
                    <div className="countryRow">
                      <div className="col-md-4">
                        <img src={this.state.countryDetail.flag} className="img-fluid" alt="..." />
                      </div>
                      <div className="col-md-8">
                        <h5 className="mt-0">About {this.state.countryDetail.name}</h5>
                        <ul>
                            <li>Capital: <b>{this.state.countryDetail.capital}</b></li>
                            <li>Region: <b>{this.state.countryDetail.region}</b></li>
                            <li>Sub-region: <b>{this.state.countryDetail.subregion}</b></li>
                            <li>Calling Code: <b>{this.state.countryDetail.callingCodes}</b></li>
                            <li>Other Name: <b>{this.state.otherCountries}</b></li>
                            <li>Currency: <b>{this.state.currency}</b></li>
                            <li>Population: <b>{this.state.countryDetail.population}</b></li>
                            <li>Demonym: <b>{this.state.countryDetail.demonym}</b></li>
                            <li>Area: <b>{this.state.countryDetail.area}</b></li>
                            <li>Code: <b>{this.state.countryDetail.numericCode}</b></li>
                            <li>Timezone: <b>{this.state.countryDetail.timezones}</b></li>
                        </ul></div>
                    </div>
                </div>
            </section>
        );
    }
}