import './App.css';
import Invitacion from './componente/Cumple';

function App() {
  return (
    <>
      <div className="card"> 
        <Invitacion 
          evento="Mi Cumpleaños N°8"
          fecha="2024-12-10T15:00:00" 
          lugar="Edison 2815"
          mensaje="¡Ven a celebrar con nosotros! Será un día increíble con comida, música y diversión."
        />
      </div>
    </>
  );
}

export default App;
