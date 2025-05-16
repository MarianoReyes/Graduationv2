import React, { useState } from 'react';
import { Send, Check, X } from 'lucide-react';

const RSVP: React.FC = () => {
  const [name, setName] = useState('');
  const [attending, setAttending] = useState('yes');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [dramaLevel, setDramaLevel] = useState(0);
  const [showDramaPopup, setShowDramaPopup] = useState(false);
  const [wasUndecidedOrNo, setWasUndecidedOrNo] = useState(false);
  const [specialMessage, setSpecialMessage] = useState('');

  const dramaticMessages = [
    "No me eperaba eso de ti... 😢",
    "¿Estás seguro? 🥺",
    "¿Muy muy muy seguro? 🥺",
    "¿Y si te digo que habrá pastel? 🎂",
    "Si no vienes, ya no somos amigos 😢",
    "En la noche nos alocamos 🎉",
    "Ya no te voy a querer 😔",
    "Pero... ya había contado contigo 😩",
    "¿Y la lealtad dónde queda? 🤨",
    "Pensé que eras diferente... 💔",
    "Esto va a doler más a mí que a ti 🥹",
    "¡Habrá comida gratis! ¿De verdad dirás que no? 🍕",
    "Imagina todo lo que te vas a perder... 😞",
    "Se va a poner bueno y tú sin estar ahí 😬",
    "Hasta la abuelita ya confirmó y no tengo yo ya 💃",
    "Dicen que el karma existe 👀",
    "Estaba pensando darte un regalo... pero bueno 🎁❌",
    "Hay sorpresas que solo los que vayan verán 👀🎉",
    "Justo había un chisme buenísimo 🤫",
    "La silla que reservé para ti quedará vacía... sola... triste 😔🪑",
    "Te lo voy a recordar para siempre 😠",
    "Así que así termina nuestra historia... 💔📖",
    "Ni para mi cumpleaños me he esforzado así 😢",
    "¿Y si cambio la playlist? Había una canción solo para ti 🎶",
    "¡Casi nadie falta! Tú podrías ser el único 😮",
    "¿Sabías que el 97% de los asistentes viven más felices? 🤯",
    "Ya me  había hecho la idea... pero con tristeza 😕",
    "Está bien... pero la traición duele 🔪💘",
    "Ya le dije a mis papis que venías 😬",
    "Ya tenía tu nombre en el sorteo 😅",
    "Hasta tu crush va a estar ahí 😏",
    "Esto está escalando emocionalmente rápido 😳",
    "¿Es una excusa real... o estás inventando? 😶",
    "¿Y si en lugar de decir no, solo dices... lo pensaré? 🥹",
    "Que insistente sos 😤",
    "Ya rendite, realmente no se puede poner que no 🙏"
  ];  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (attending === 'no') {
      setDramaLevel((prev) => Math.min(prev + 1, dramaticMessages.length - 1));
      setShowDramaPopup(true);
      return;
    }

    if (attending === 'yes' && wasUndecidedOrNo) {
      setSpecialMessage('Gracias, sabía que querías ir 💛');
    }

    setLoading(true);

    try {
      const params = new URLSearchParams();
      params.append('name', name.trim());
      params.append('attending', 'Sí');
      params.append('timestamp', new Date().toLocaleString('es-GT', { timeZone: 'America/Guatemala' }));

      await fetch(
        'https://script.google.com/macros/s/AKfycbwNCboqdGD2Nux023KtHXvuSKr4_-y5ZfDtE-xwPAukcoXdbNgWxiW0KIxJQBtIP4d0/exec?' + params.toString(),
        {
          method: 'GET',
          mode: 'no-cors'
        }
      );

      setSubmitted(true);
      setName('');
      setAttending('yes');
      setDramaLevel(0);
    } catch (err) {
      setError('Hubo un error al enviar tu respuesta.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 md:py-16 bg-gray-50 relative">
      <style>{`
        @keyframes bounceIn {
          0% {
            transform: scale(0.9);
            opacity: 0;
          }
          60% {
            transform: scale(1.05);
            opacity: 1;
          }
          100% {
            transform: scale(1);
          }
        }

        .animate-bounceIn {
          animation: bounceIn 0.4s ease-out;
        }
      `}</style>

      <div className="container mx-auto px-4 max-w-md animate-fadeInUp animation-delay-400">
        <h2 className="text-2xl md:text-3xl font-semibold text-[#14213D] text-center mb-8">
          Confirma tu asistencia
        </h2>

        {submitted ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Check size={32} className="text-green-600" />
              </div>
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">¡Gracias!</h3>
            <p className="text-gray-600">
              {specialMessage || 'Tu respuesta ha sido registrada.'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-8 border border-[#D4AF37]/20">
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md flex items-center">
                <X size={20} className="text-red-500 mr-2" />
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <div className="mb-6">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre Completo
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ¿Asistirás?
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="yes"
                    checked={attending === 'yes'}
                    onChange={() => {
                      setAttending('yes');
                      setDramaLevel(0);
                    }}
                    className="w-4 h-4 text-[#D4AF37] focus:ring-[#D4AF37]"
                  />
                  <span className="ml-2 text-gray-700">Sí, asistiré</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="no"
                    checked={attending === 'no'}
                    onChange={() => {
                      setAttending('no');
                      setWasUndecidedOrNo(true);
                    }}
                    className="w-4 h-4 text-[#D4AF37] focus:ring-[#D4AF37]"
                  />
                  <span className="ml-2 text-gray-700">No podré asistir</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-[#14213D] hover:bg-[#1e325e] text-white font-medium py-2 px-4 rounded-md transition duration-300 flex items-center justify-center ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Enviando...' : 'Enviar Respuesta'}
              <Send size={16} className="ml-2" />
            </button>
          </form>
        )}
      </div>

      {showDramaPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-xl shadow-xl max-w-sm text-center relative animate-bounceIn">
            <h3 className="text-lg font-semibold text-red-600 mb-4">¡Espera! 🚨</h3>
            <p className="text-gray-800 mb-4">{dramaticMessages[dramaLevel]}</p>
            <button
              onClick={() => setShowDramaPopup(false)}
              className="bg-[#D4AF37] text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition"
            >
              Lo pensaré otra vez...
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default RSVP;