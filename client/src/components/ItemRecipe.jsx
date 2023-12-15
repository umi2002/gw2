function ItemRecipe({ recipes }) {
    if (!recipes) {
        return null;
    }
    return (
        <>
            {recipes.map((recipes, index) => {
                return (
                    <div key={index} className="item-recipe">
                        <p> Recipe {index + 1}: </p>
                        {recipes.map((ingredient, index) => {
                            return (
                                <p key={index}>
                                    {" "}
                                    {ingredient.count} x {ingredient.item_id}{" "}
                                </p>
                            );
                        })}
                    </div>
                );
            })}
        </>
    );
}

export default ItemRecipe;
