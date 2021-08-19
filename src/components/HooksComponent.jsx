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

const CountryItem = (props) => {
    const { country, searchValue, onItemClick } = props;
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

function HooksComponent() {
    const [countries, setCountries] = React.useState([]);
    const [value, setValue] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');
    const [focus, setFocus] = React.useState(false);

    const getData = async () => {
        await sleep(1000);
        // throw new Error();
        return DATA;
    }

    React.useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const data = await getData();
                setLoading(false);
                setCountries(data);
            } catch (e) {
                setLoading(false);
                setError('Something went wrong');
            }
        })();
    }, []);

    const onInputChange = React.useCallback((event) => {
        setValue(event.target.value);
    }, []);

    const onItemClick = React.useCallback((value) => {
        return () => setValue(value);
    }, []);

    const onFocus = React.useCallback(() => {
        setFocus(true);
    }, []);

    const onBlur = React.useCallback(() => {
        setFocus(false);
    }, []);

    const filteredCountries = countries.filter(country => {
        return country.toLowerCase().includes(value.toLowerCase())
    });

    return (
        <div>
            <div className="title">Functional Component with Hooks</div>
            <div>
                <div className="input-container">
                    <input
                        type="text"
                        className="countries-input"
                        value={value}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        onChange={onInputChange}
                    />
                    {loading && <img className="loader" src={Loader}/>}
                </div>
                {focus && (
                    <div className="countries-list">
                        {filteredCountries.map(deelCountry => (
                            <CountryItem country={deelCountry} searchValue={value} onItemClick={onItemClick}/>
                        ))}
                    </div>
                )}
                {error && (
                    <div className="error">{error}</div>
                )}
            </div>
        </div>
    );
}

export default HooksComponent;
