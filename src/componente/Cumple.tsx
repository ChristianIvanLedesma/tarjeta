import React, { useState, useEffect } from 'react';
import './tarjeta.css';
import audio from '../assets/audio/audio.mp3'; // Asegúrate de que esta ruta sea correcta

type Props = {
    evento: string;
    fecha: string; // Formato de fecha como 'YYYY-MM-DDTHH:mm:ss'
    lugar: string;
    mensaje: string;
};

const Invitacion: React.FC<Props> = ({ evento, fecha, lugar, mensaje }) => {
    const [timeRemaining, setTimeRemaining] = useState<string>('');
    const [audioElement] = useState(new Audio(audio)); // Cargar el audio

    useEffect(() => {
        // Función para reproducir el audio
        const playAudio = () => {
            audioElement.play().catch((error) => {
                console.error("Error al reproducir el audio:", error);
            });
        };

        // Iniciar la cuenta regresiva
        const countdown = setInterval(() => {
            const eventDate = new Date(fecha).getTime();
            const now = new Date().getTime();
            const distance = eventDate - now;

            // Cálculo de días, horas, minutos y segundos
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (distance < 0) {
                clearInterval(countdown);
                setTimeRemaining("¡El evento ha comenzado!");
                audioElement.pause(); // Detiene el audio si el evento ha comenzado
            } else {
                setTimeRemaining(`${days} días, ${hours} horas, ${minutes} minutos, ${seconds} segundos`);
            }
        }, 1000);

        // Reproducir el audio al montar el componente
        playAudio(); 

        return () => {
            clearInterval(countdown); // Limpia el intervalo al desmontar el componente
            audioElement.pause(); // Detiene el audio si el componente se desmonta
        };
    }, [fecha, audioElement]);

    return (
        <div className="tarjeta">
            <h1>¡Estás invitado/a a {evento}!</h1>
            <p>{mensaje}</p>
            <h3>Fecha: {fecha}</h3>
            <h3>Lugar: {lugar}</h3>
            <h3>Cuenta Regresiva: {timeRemaining}</h3>
            <button>Confirmar Asistencia</button>
        </div>
    );
};

export default Invitacion;
