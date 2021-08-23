import React from 'react';
import { cn, getSelectedIndex } from '../../utils';

const CountryItem = React.memo((props) => {
    const { country, searchValue, selected, index, setSelected, onItemClick } = props;
    const startIndex = country.toLowerCase().indexOf(searchValue.toLowerCase());
    const endIndex = startIndex + searchValue.length;

    const onMouseOver = React.useCallback(() => {
        if (!selected) {
            setSelected(index);
        }
    }, [selected]);

    return (
        <div
            className={cn({
                'countries-list-item': true,
                'countries-list-item-selected': selected,
            })}
            onMouseOver={onMouseOver}
            onMouseDown={onItemClick(country)} // Using onMouseDown here instead of click for proper work with onBlur
        >
            {country.substring(0, startIndex)}
            <span className="highlight">
                {country.substring(startIndex, endIndex)}
            </span>
            {country.substring(endIndex, country.length)}
        </div>
    );
});

const CountriesList = React.memo((props) => {
    const { filteredCountries, setValue, setFocus, value } = props;
    const [selected, setSelected] = React.useState(null);

    React.useEffect(() => {
        window.addEventListener('keydown', keyboardHandler);

        return () => window.removeEventListener('keydown', keyboardHandler);
    }, [selected])

    const keyboardHandler = React.useCallback((event) => {
        if (event.code === 'ArrowDown') {
            if (typeof selected !== 'number') {
                setSelected(0);
            } else {
                setSelected(prevSelected => getSelectedIndex(prevSelected, filteredCountries.length, true))
            }
            return;
        }

        if (event.code === 'ArrowUp') {
            if (typeof selected !== 'number') {
                setSelected(0);
            } else {
                setSelected(prevSelected => getSelectedIndex(prevSelected, filteredCountries.length))
            }
            return;
        }

        if (event.code === 'Enter' && typeof selected === 'number') {
            setValue(filteredCountries[selected]);
            setSelected(null);
            setFocus(false);
            return;
        }

        setSelected(null);
    }, [selected, filteredCountries]);

    const onItemClick = React.useCallback((value) => {
        return () => setValue(value);
    }, []);

    return (
        <div className="countries-list">
            {filteredCountries.map((deelCountry, index) => (
                <CountryItem
                    index={index}
                    country={deelCountry}
                    searchValue={value}
                    selected={selected === index}
                    setSelected={setSelected}
                    onItemClick={onItemClick}
                />
            ))}
        </div>
    )
});

export default CountriesList;