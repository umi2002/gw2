function InputBox({ inputValue, placeHolder, setInputValue, handleKeyDown }) {
    function handleChange(event) {
        setInputValue(event.target.value);
    };

    return (
        <input
            type="text"
            value={inputValue}
            placeholder={placeHolder}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
        />
    );
}

export default InputBox;
