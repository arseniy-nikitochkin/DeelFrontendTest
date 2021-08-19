import React from 'react';

import { sleep } from '../utils';
import Loader from '../assets/oval.svg';

const DATA = [
    'Israel',
    'Russia',
    'Belarus',
    'Ukraine',
    'Turkey',
    'Brazil',
    'Colombia',
];

class CountryItem extends React.Component {
    render() {
        const { country, searchValue, onItemClick } = this.props;
        const startIndex = country.toLowerCase().indexOf(searchValue.toLowerCase());
        const endIndex = startIndex + searchValue.length;

        return (
            <div
                className="countries-list-item"
                onMouseDown={onItemClick(country)} // Using onMouseDown here instead of click for proper work with onBlur
            >
                {country.substring(0, startIndex)}
                <span className="highlight">
                    {country.substring(startIndex, endIndex)}
                </span>
                {country.substring(endIndex, country.length)}
            </div>
        );
    }
}

class ClassComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            countries: [],
            value: '',
            error: '',
            loading: false,
            hasFocus: false,
        };

        this.onInputChange = this.onInputChange.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onItemClick = this.onItemClick.bind(this);
    }

    async componentDidMount() {
        try {
            this.setState({ loading: true });
            const countries = await this.getData();
            this.setState({ countries, loading: false });
        } catch (e) {
            this.setState({ error: 'Something went wrong', loading: false });
        }
    }

    async getData() {
        await sleep(1000);
        // throw new Error();
        return DATA;
    }

    onInputChange(event) {
        this.setState({ value: event.target.value });
    }

    onItemClick(value) {
        return () => this.setState({ value });
    }

    onFocus() {
        this.setState({ hasFocus: true });
    }

    onBlur() {
        this.setState({ hasFocus: false });
    }

    render() {
        const filteredCountries = this.state.countries.filter(country => {
            return country.toLowerCase().includes(this.state.value.toLowerCase())
        });

        return (
            <div>
                <div className="title">Class Component</div>
                <div>
                    <div className="input-container">
                        <input
                            type="text"
                            className="countries-input"
                            value={this.state.value}
                            onFocus={this.onFocus}
                            onBlur={this.onBlur}
                            onChange={this.onInputChange}
                        />
                        {this.state.loading && <img className="loader" src={Loader}/>}
                    </div>
                    {this.state.hasFocus && (
                        <div className="countries-list">
                            {filteredCountries.map(deelCountry => (
                                <CountryItem
                                    country={deelCountry}
                                    searchValue={this.state.value}
                                    onItemClick={this.onItemClick}
                                />
                            ))}
                        </div>
                    )}
                    {this.state.error && (
                        <div className="error">{this.state.error}</div>
                    )}
                </div>
            </div>
        );
    }
}

export default ClassComponent;
