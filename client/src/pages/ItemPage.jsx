import Item from "../components/Item";
import { useParams } from "react-router-dom";

function ItemPage() {
    const params = useParams();

    return (
        <main id="App-main">
            <Item id={params.id} isExpanded={true} />
        </main>
    );
}

export default ItemPage;
