import { useParams } from "react-router-dom";
import Item from "../components/Item";

interface Params {
  [key: string]: string | undefined;
  id: string;
}

function ItemPage() {
  const { id } = useParams<Params>() as Params;

  return (
    <main id="App-main">
      <Item id={id} isExpanded={true} />
    </main>
  );
}

export default ItemPage;
