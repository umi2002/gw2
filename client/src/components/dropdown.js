function DropDown({ data, setInputValue, setShowDropdown, handleChange }) {
    console.log(setShowDropdown);
    function renderOption(option) {
        function handleClick() {
            setInputValue(option);
            handleChange({ target: { value: option } });
            setShowDropdown(false);
        }

        return <li onClick={handleClick}>{option}</li>;
    }

    function setOptions() {
        return data.map(renderOption);
    }

    return (
        <span>
            <ul>
                {setOptions()}
            </ul>
        </span>
    );
}

export default DropDown;
