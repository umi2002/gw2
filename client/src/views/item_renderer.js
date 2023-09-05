function ItemRenderer({ itemKey, data }) {
    if (typeof data === 'object' && data !== null) {
        return (
            <div>
                {Object.entries(data).map(([key, value]) => (
                    <ItemRenderer key={key} itemKey={key} data={value} />
                ))}
            </div>
        );
    } else {
        return <p>{itemKey}: {data}</p>;
    }
}

export default ItemRenderer;
