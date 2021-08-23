import React from 'react';

import { sleep } from '../../utils';
import Loader from '../../assets/oval.svg';
import CountriesList from './CountriesList';

const DATA = [
    'Israel',
    'Russia',
    'Belarus',
    'Ukraine',
    'Turkey',
    'Brazil',
    'Colombia',
];

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

    onInputChange = (event) => {
        this.setState({ value: event.target.value, hasFocus: true });
    }

    onItemPick = (value) => {
        this.setState({ value, hasFocus: false });
    }

    onFocus = () => {
        this.setState({ hasFocus: true });
    }

    onBlur = () => {
        this.setState({ hasFocus: false });
    }

    render() {
        const { countries, value, loading, hasFocus, error } = this.state;
        const filteredCountries = countries.filter(country => {
            return country.toLowerCase().includes(value.toLowerCase())
        });

        return (
            <div>
                <div className="title">Class Component</div>
                <div>
                    <div className="input-container">
                        <input
                            type="text"
                            className="countries-input"
                            value={value}
                            disabled={loading}
                            onFocus={this.onFocus}
                            onBlur={this.onBlur}
                            onChange={this.onInputChange}
                        />
                        {loading && <img className="loader" src={Loader}/>}
                    </div>
                    {hasFocus && (
                        <CountriesList
                            filteredCountries={filteredCountries}
                            value={value}
                            onItemPick={this.onItemPick}
                        />
                    )}
                    {error && (
                        <div className="error">{error}</div>
                    )}
                </div>
            </div>
        );
    }
}

export default ClassComponent;
