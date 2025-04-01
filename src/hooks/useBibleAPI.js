import { useState, useEffect } from 'react';

const useBibleAPI = (book, chapter, verse) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mapeo de libros en español -> inglés (para la API)
  const bookMap = {
    "Génesis": "genesis",
    "Éxodo": "exodus",
    "Juan": "john",
    "Hechos": "acts",
    "Apocalipsis": "revelation"
    // Agrega todos los libros aquí...
  };

  // Traducciones de términos específicos (KJV -> Español)
  const translationMap = {
    "God": "Dios",
    "Lord": "Señor",
    "heaven": "cielo",
    // Agrega más términos según necesites...
  };

  useEffect(() => {
    const fetchVerse = async () => {
      setLoading(true);
      try {
        const englishBook = bookMap[book];
        if (!englishBook) throw new Error("Libro no soportado");

        const response = await fetch(
          `https://bible-api.com/${englishBook}%20${chapter}:${verse}?translation=kjv`
        );

        if (!response.ok) throw new Error("Error al cargar el versículo");
        
        const jsonData = await response.json();
        
        if (!jsonData.text) {
          throw new Error("Texto no encontrado");
        }

        // Traducción simple (puedes mejorarla)
        let translatedText = jsonData.text;
        Object.entries(translationMap).forEach(([en, es]) => {
          translatedText = translatedText.replace(new RegExp(en, "gi"), es);
        });

        setData({
          reference: `${book} ${chapter}:${verse}`,
          text: translatedText,
          original: jsonData.text
        });
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    if (book && chapter && verse) {
      fetchVerse();
    }
  }, [book, chapter, verse]);

  return { data, loading, error };
};

export default useBibleAPI;