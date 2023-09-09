import { useState } from 'react';

function DropDown(props) {
    const [selectedValue, setSelectedValue] = useState('');

    function handleChange(event) {
        setSelectedValue(event.target.value);
    }

    const handleChangeFunction = props.overrideFunction || handleChange;

    function renderOption(option) {
        return <option value={option}>{option}</option>;
    }

    function setOptions() {
        return props.data.map(renderOption);
    }

    return (
        <div>
            <select value={selectedValue} onChange={handleChangeFunction}>
                {setOptions()}
            </select>
        </div>
    );
}

export default DropDown;
