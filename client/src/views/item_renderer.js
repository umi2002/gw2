function objectRenderer([key, value]) {
    return (
        <li key={key}>
            <strong>{key}</strong>: <ItemRenderer className="Item" data={value} />
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
