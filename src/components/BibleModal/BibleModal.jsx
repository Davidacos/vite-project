import { useState, useEffect } from 'react';

const BibleModal = ({ onClose, onVerseSelected }) => {
    // Datos bíblicos simulados (en una app real, esto vendría de una API/JSON)
    const bibleStructure = {
        genesis: { chapters: 50, verses: Array(50).fill().map((_, i) => i < 30 ? 20 : 15) },
        exodus: { chapters: 40, verses: Array(40).fill().map((_, i) => i < 25 ? 25 : 10) },
        john: { chapters: 21, verses: [51, 25, 36, 54, 47, 71, 53, 59, 41, 42, 57, 50, 38, 31, 27, 33, 26, 40, 42, 31, 25] },
        psalms: { chapters: 150, verses: Array(150).fill().map((_, i) => i < 100 ? 20 : 10) },
        revelation: { chapters: 22, verses: [20, 29, 22, 11, 14, 17, 17, 13, 21, 11, 19, 17, 18, 20, 8, 21, 18, 24, 21, 15, 27, 21] }
    };

    const [book, setBook] = useState('john');
    const [chapter, setChapter] = useState(1);
    const [verse, setVerse] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Generar opciones de capítulos basado en el libro seleccionado
    const chapters = Array.from({ length: bibleStructure[book]?.chapters || 0 }, (_, i) => i + 1);

    // Generar opciones de versículos basado en libro y capítulo
    const verses = Array.from({
        length: bibleStructure[book]?.verses[chapter - 1] || 0
    }, (_, i) => i + 1);

    useEffect(() => {
        // Resetear a capítulo 1 y versículo 1 al cambiar libro
        setChapter(1);
        setVerse(1);
    }, [book]);

    useEffect(() => {
        // Resetear a versículo 1 al cambiar capítulo
        setVerse(1);
    }, [chapter]);

    const bookOptions = [
        { id: 'genesis', name: 'Génesis' },
        { id: 'exodus', name: 'Éxodo' },
        { id: 'psalms', name: 'Salmos' },
        { id: 'john', name: 'Juan' },
        { id: 'revelation', name: 'Apocalipsis' }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `https://bible-api.com/${book}%20${chapter}:${verse}?translation=kjv`
            );

            if (!response.ok) throw new Error('Error al buscar');

            const data = await response.json();

            if (!data.text) throw new Error('Texto no encontrado');

            onVerseSelected({
                reference: `${bookOptions.find(b => b.id === book).name} ${chapter}:${verse}`,
                text: data.text,
                book,
                chapter,
                verse
            });

            onClose();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                <div className="bg-purple-600 p-4 rounded-t-lg flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white">Buscador Bíblico</h2>
                    <button onClick={onClose} className="text-white hover:text-purple-200 text-2xl">
                        &times;
                    </button>
                </div>

                <div className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Selector de Libro */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Libro</label>
                            <select
                                value={book}
                                onChange={(e) => setBook(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                                disabled={loading}
                            >
                                {bookOptions.map((option) => (
                                    <option key={option.id} value={option.id}>{option.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Selector de Capítulo */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Capítulo</label>
                            <select
                                value={chapter}
                                onChange={(e) => setChapter(parseInt(e.target.value))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                                disabled={loading || !chapters.length}
                            >
                                {chapters.map((chap) => (
                                    <option key={chap} value={chap}>{chap}</option>
                                ))}
                            </select>
                        </div>

                        {/* Selector de Versículo */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Versículo</label>
                            <select
                                value={verse}
                                onChange={(e) => setVerse(parseInt(e.target.value))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                                disabled={loading || !verses.length}
                            >
                                {verses.map((ver) => (
                                    <option key={ver} value={ver}>{ver}</option>
                                ))}
                            </select>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        >
                            {loading ? 'Buscando...' : 'Buscar Versículo'}
                        </button>

                        {error && (
                            <p className="text-red-500 text-sm text-center mt-2">{error}</p>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BibleModal;