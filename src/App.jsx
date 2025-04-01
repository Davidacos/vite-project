import { useState } from 'react';
import Hero from "./components/Hero/Hero";
import Navbar from "./components/Navbar/Navbar";
import FloatingButton from "./components/FloatingButton/FloatingButton";
import BibleModal from "./components/BibleModal/BibleModal";
import Fondo from "../src/assets/fondo.png";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [currentVerse, setCurrentVerse] = useState(null);

  const bgimagen = {
    backgroundImage: `url(${Fondo})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'bottom',
    backgroundSize: 'cover',
  };

  return (
    <div style={bgimagen} className="relative min-h-screen overflow-hidden">
      <Navbar />
      <Hero />

      <FloatingButton onClick={() => setShowModal(true)} />

      {showModal && (
        <BibleModal
          onClose={() => setShowModal(false)}
          onVerseSelected={(verse) => setCurrentVerse(verse)}
        />
      )}

      {currentVerse && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="font-bold">{currentVerse.reference}</h3>
          <p>{currentVerse.text}</p>
        </div>
      )}
    </div>
  );
}

export default App;