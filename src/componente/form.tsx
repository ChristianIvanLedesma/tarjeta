import React, { useState } from 'react';
import './boton.css';

interface FormularioProps {
    onConfirm: (nombre: string) => void; 
}

const Formulario: React.FC<FormularioProps> = ({ onConfirm }) => {
    const [nombre, setNombre] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); 
        onConfirm(nombre); 
        setNombre(''); 
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input
                    className="BOTON"
                    placeholder="Ingrese su Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)} 
                    required
                />
            </div>
            <button type="submit">Confirmar Asistencia</button>
        </form>
    );
};

export default Formulario;
