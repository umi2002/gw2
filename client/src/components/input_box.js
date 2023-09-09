function InputBox({ inputValue, placeHolder, handleChange, handleKeyDown }) {
    return (
        <input
            className="InputBox"
            type="text"
            value={inputValue}
            placeholder={placeHolder}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
        />
    );
}

export default InputBox;
