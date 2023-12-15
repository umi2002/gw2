function ItemPrices({ buys, sells }) {
    function formatPrice(price) {
        return `${Math.floor(price / 10000)}g ${Math.floor(
            (price % 10000) / 100,
        )}s ${(price % 10000) % 100}c`;
    }

    if (!buys || !sells) {
        return <p>Loading...</p>;
    }

    return (
        <div id="item-prices">
            <p>Buy quantity: {buys.quantity}</p>
            <p>Buy unit price: {formatPrice(buys.unit_price)}</p>
            <p>Sell quantity: {sells.quantity}</p>
            <p>Sell unit price: {formatPrice(sells.unit_price)}</p>
        </div>
    );
}
export default ItemPrices;
