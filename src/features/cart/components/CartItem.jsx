function CartItem({ item, onRemove, onUpdate }) {
  return (
    <div className="flex items-center gap-4 border-b pb-4">
      <img
        src={item.image}
        className="w-20 h-20 object-cover rounded"
      />

      <div className="flex-1">
        <h2 className="font-medium">{item.title}</h2>
        <p className="text-gray-600">₹{item.price}</p>

       <div className="flex items-center gap-3 mt-2">
  <button
    onClick={() =>
      onUpdate(item.productId, item.quantity - 1)
    }
    className="px-2 border rounded"
  >
    -
  </button>

  <span>{item.quantity}</span>

  <button
    onClick={() =>
      onUpdate(item.productId, item.quantity + 1)
    }
    className="px-2 border rounded"
  >
    +
  </button>
</div>
      </div>

      <button
        onClick={() => onRemove(item.productId)}
        className="text-red-500"
      >
        Remove
      </button>
    </div>
  );
}

export default CartItem;