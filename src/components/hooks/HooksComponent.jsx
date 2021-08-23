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

function HooksComponent() {
    const [countries, setCountries] = React.useState([]);
    const [value, setValue] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');
    const [focus, setFocus] = React.useState(false);

    const filteredCountries = countries.filter(country => {
        return country.toLowerCase().includes(value.toLowerCase())
    });

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
        setFocus(true);
    }, []);

    const onFocus = React.useCallback(() => {
        setFocus(true);
    }, []);

    const onBlur = React.useCallback(() => {
        setFocus(false);
    }, []);

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
                    <CountriesList
                        filteredCountries={filteredCountries}
                        value={value}
                        setValue={setValue}
                        setFocus={setFocus}
                    />
                )}
                {error && (
                    <div className="error">{error}</div>
                )}
            </div>
        </div>
    );
}

export default HooksComponent;
