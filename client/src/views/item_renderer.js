import "../css/item_renderer.css"

function objectRenderer([key, value]) {
    return (
        <li key={key}>
            <strong>{key}</strong>: <ItemRenderer data={value} />
        </li>
    );
}

function ItemRenderer({ data }) {
    if (typeof data === "object" && data !== null) {
        return (
            <ul>
                {Object.entries(data).map(objectRenderer)}
            </ul>
        );
    }
    else if (typeof data === "string" && data.slice(-3) === "png") {
        return <p> <img src={data} /> </p>;
    }
    else {
        return <span> {data} </span>;
    }
}

export default ItemRenderer;
