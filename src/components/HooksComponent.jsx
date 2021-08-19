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

function HooksComponent() {
    const [countries, setCountries] = React.useState([]);
    const [value, setValue] = React.useState('');
    const [loading, setLoading] = React.useState('');
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

    const onInputChange = (event) => {
        setValue(event.target.value);
    }

    const onItemClick = (value) => {
        return () => setValue(value);
    }

    const onFocus = () => {
        setFocus(true);
    }

    const onBlur = () => {
        setFocus(false);
    }

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
                    {loading && <img className="loader" src={Loader} />}
                </div>
                {focus && (
                    <div className="countries-list">
                        {filteredCountries.map(deelCountry => (
                            <div
                                className="countries-list-item"
                                onMouseDown={onItemClick(deelCountry)} // Using onMouseDown here instead of click for proper work with onBlur
                            >
                                {deelCountry}
                            </div>
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
