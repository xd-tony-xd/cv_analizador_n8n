import { useState } from "react";
import { analizarCV } from "./api";

function App() {
  const [file, setFile] = useState(null);
  const [requisitos, setRequisitos] = useState(`Se busca desarrollador backend con experiencia en Java y Spring Boot...`);
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);

  const enviarCV = async () => {
    if (!file) {
      alert("Sube un CV primero");
      return;
    }

    setLoading(true);
    setResultado(null);

    try {
      const data = await analizarCV(file, requisitos);
      
      // n8n a veces envía un array [{}], extraemos el objeto
      const res = Array.isArray(data) ? data[0] : data;
      setResultado(res);
    } catch (error) {
      console.error(error);
      alert("Error analizando CV");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial", maxWidth: "800px", margin: "auto" }}>
      <h1>Analizador de CV con IA</h1>

      <h3>1. Subir CV (PDF)</h3>
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br /><br />

      <h3>2. Requisitos del puesto</h3>
      <textarea
        rows="7"
        style={{ width: "100%", padding: "10px" }}
        value={requisitos}
        onChange={(e) => setRequisitos(e.target.value)}
      />

      <br /><br />

      <button onClick={enviarCV} disabled={loading} style={{ padding: "10px 20px", cursor: "pointer" }}>
        {loading ? "Analizando..." : "Analizar CV"}
      </button>

      {/* AQUÍ ESTABA EL ERROR: USAR LLAVES DE REACT, NO DE N8N */}
      {resultado && (
        <div style={{
          marginTop: "30px",
          padding: "20px",
          border: "2px solid #27ae60",
          borderRadius: "10px",
          backgroundColor: "#f9fefb"
        }}>
          <h2 style={{ color: "#27ae60" }}>Análisis Completado</h2>

          <div style={{ fontSize: "20px", marginBottom: "10px" }}>
            <b>Puntaje de Match:</b> 
            <span style={{ fontWeight: "bold", marginLeft: "5px" }}>
              {resultado.puntaje}%
            </span>
          </div>

          <p><b>Descripción del perfil:</b></p>
          <div style={{ 
            padding: "15px", 
            backgroundColor: "white", 
            border: "1px solid #eee", 
            borderRadius: "5px" 
          }}>
            {resultado.descripcion}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;