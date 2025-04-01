const FloatingButton = ({ onClick }) => {
    return (
      <button
        onClick={onClick}
        className="fixed bottom-8 right-8 z-50 bg-purple-600 hover:bg-purple-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>
    );
  };
  
  export default FloatingButton;