function objectRenderer([key, value]) {
    return (
        <li key={key}>
            <strong>{key}</strong>: <ItemRenderer data={value} />
        </li>
    );
}

function ItemRenderer({ data }) {
    if (typeof data === 'object' && data !== null) {
        return (
            <ul>
                {Object.entries(data).map(objectRenderer)}
            </ul>
        );
    }
    else {
        return <span> {data} </span>;
    }
}

export default ItemRenderer;
