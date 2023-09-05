import { ROOT_ROUTE, ITEMS_ROUTE } from "../constants";

import InputBox from "../components/input_box";
import ItemRenderer from "./item_renderer";

class ItemSearch extends InputBox {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            itemData: null,
            itemLoaded: false,
            error: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    async handleChange(event) {
        super.handleChange(event);
    }

    async handleButtonClick() {
        const itemRoute = ROOT_ROUTE + ITEMS_ROUTE + "/" + this.state.inputValue;
        try {
            const response = await fetch(itemRoute);
            if (response.status === 404) {
                this.setState({ error: "No item matches that ID", itemLoaded: false });
                return; // exit early
            }

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            this.setState({ itemData: data, itemLoaded: true, error: null });
        }
        catch (error) {
            console.error("Error fetching data:", error);
            this.setState({ error: error.message, itemLoaded: false });
        }
    }

    render() {
        return (
            <div>
                <input
                    type="text"
                    value={this.state.inputValue}
                    onChange={this.handleChange}
                    placeholder="Search for an item"
                />
                <button onClick={this.handleButtonClick}>Search</button>
                <p>{this.state.error}</p>
                {this.state.itemLoaded && <ItemRenderer itemKey={this.state.inputValue} data={this.state.itemData} />}
            </div>)
    }
}

export default ItemSearch;
