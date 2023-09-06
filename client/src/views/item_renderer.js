function ItemRenderer({ itemKey, data }) {
    if (Array.isArray(data)) {
        return (
            <ul>
                {data.map((item, index) => (
                    <li key={index}>
                        <ItemRenderer data={item} />
                    </li>
                ))}
            </ul>
        );
    }
    else if (typeof data === 'object' && data !== null) {
        return (
            <div>
                {Object.entries(data).map(([key, value]) => (
                    <div key={key}>
                        <strong>{key}:</strong>
                        <ItemRenderer itemKey={key} data={value} />
                    </div>
                ))}
            </div>
        );
    }
    else {
        return <p>{itemKey}: {data}</p>;
    }
}

export default ItemRenderer;
