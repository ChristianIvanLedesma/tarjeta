import React, { useState, useEffect } from 'react';
import './tarjeta.css';
import audio from '../assets/audio/audio.mp3'; 
import Formulario from './form'; 

type Props = {
    evento: string;
    fecha: string; 
    lugar: string;
    mensaje: string;
};

const Invitacion: React.FC<Props> = ({ evento, fecha, lugar, mensaje }) => {
    const [timeRemaining, setTimeRemaining] = useState<string>('');
    const [formattedDate, setFormattedDate] = useState<string>(''); 
    const [audioElement] = useState(new Audio(audio)); 
    const [showForm, setShowForm] = useState(false); 
    const [assistanceConfirmed, setAssistanceConfirmed] = useState(false); 

    useEffect(() => {
        
        const eventDate = new Date(fecha);
        const formatted = eventDate.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
        setFormattedDate(formatted);

        
        const playAudio = async () => {
            try {
                await audioElement.play();
            } catch (error) {
                console.error("Error al reproducir el audio:", error);
            }
        };

      
        const countdown = setInterval(() => {
            const now = new Date().getTime();
            const distance = eventDate.getTime() - now;

          
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (distance < 0) {
                clearInterval(countdown);
                setTimeRemaining("¡El evento ha comenzado!");
                audioElement.pause(); 
            } else {
                setTimeRemaining(`${days} días, ${hours} horas, ${minutes} minutos, ${seconds} segundos`);
            }
        }, 1000);

       
        playAudio();

        return () => {
            clearInterval(countdown); 
            audioElement.pause(); 
        };
    }, [fecha, audioElement]);

    
    const handleButtonClick = () => {
        if (assistanceConfirmed) {
            alert("Gracias, tu asistencia ha sido confirmada."); 
        } else {
            setShowForm(!showForm);
        }
    };


    const confirmAssistance = (nombre: string) => {
        setAssistanceConfirmed(true);
        setShowForm(false); 
        alert(`Gracias, ${nombre}. Tu asistencia ha sido confirmada.`); 
    };

    return (
        <div className="tarjeta" onMouseEnter={() => audioElement.play()}>
            <h1>¡Estás invitado/a a {evento}!</h1>
            <p>{mensaje}</p>
            <h3>Fecha: {formattedDate}</h3>
            <h3>Lugar: {lugar}</h3>
            <h3>Cuenta Regresiva: {timeRemaining}</h3>
            
            
            {!showForm && (
                <button onClick={handleButtonClick}>Confirmar Asistencia</button>
            )}

           
            {showForm && <Formulario onConfirm={confirmAssistance} />} 
        </div>
    );
};

export default Invitacion;
