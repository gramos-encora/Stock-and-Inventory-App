type Category = "food" | "electronics" | "clothing";

export default function NewProductForm() {
  return (
    <form>
      <label>
        Name
        <input type="text" name="" />
      </label>
      <label>
        Category
        <select name="category">
          <option value="food">Food</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
        </select>
      </label>
      <label>
        Stock
        <input type="number" name="" />
      </label>
      <label>
        Unit Price
        <input type="number" name="" />
      </label>
      <label>
        Expiration Date
        <input type="date" name="" />
      </label>

      <div className="flex justify-end">
        <button type="submit" className="bg-gray-500 text-black px-4 py-1">
          Search
        </button>
        <button type="reset">Cancel</button>
      </div>
    </form>
  );
}
