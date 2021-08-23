import React from 'react';
import { cn, getSelectedIndex } from '../../utils';

class CountryItem extends React.PureComponent {
    onMouseOver = () => {
        const { selected, onItemSelect, index } = this.props;
        if (!selected) {
            onItemSelect(index);
        }
    }

    render() {
        const { country, searchValue, selected, onItemPick } = this.props;
        const startIndex = country.toLowerCase().indexOf(searchValue.toLowerCase());
        const endIndex = startIndex + searchValue.length;

        return (
            <div
                className={cn({
                    'countries-list-item': true,
                    'countries-list-item-selected': selected,
                })}
                onMouseOver={this.onMouseOver}
                onMouseDown={() => onItemPick(country)} // Using onMouseDown here instead of click for proper work with onBlur
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

class CountriesList extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            selected: null
        }
    }

    componentDidMount() {
        window.addEventListener('keydown', this.keyboardHandler)
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.keyboardHandler);
    }

    onItemSelect = (index) => {
        this.setState({ selected: index });
    }

    keyboardHandler = (event) => {
        const { selected } = this.state;
        const { filteredCountries, onItemPick } = this.props;

        if (event.code === 'ArrowDown') {
            if (typeof selected !== 'number') {
                this.setState({ selected: 0 });
            } else {
                this.setState(({ selected }) => ({ selected: getSelectedIndex(selected, filteredCountries.length, true) }))
            }
            return;
        }

        if (event.code === 'ArrowUp') {
            if (typeof selected !== 'number') {
                this.setState({ selected: 0 });
            } else {
                this.setState(({ selected }) => ({ selected: getSelectedIndex(selected, filteredCountries.length) }))
            }
            return;
        }

        if (event.code === 'Enter' && typeof selected === 'number') {
            onItemPick(filteredCountries[selected]);
            this.setState({ selected: null });
            return;
        }

        this.setState({ selected: null });
    }

    render() {
        const { filteredCountries, value, onItemPick } = this.props;

        return (
            <div className="countries-list">
                {filteredCountries.map((deelCountry, index) => (
                    <CountryItem
                        index={index}
                        country={deelCountry}
                        searchValue={value}
                        selected={this.state.selected === index}
                        onItemSelect={this.onItemSelect}
                        onItemPick={onItemPick}
                    />
                ))}
            </div>
        );
    }
}

export default CountriesList;