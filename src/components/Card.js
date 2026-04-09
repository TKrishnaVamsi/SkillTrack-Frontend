function Card({ children }) {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6">
      {children}
    </div>
  );
}

export default Card;