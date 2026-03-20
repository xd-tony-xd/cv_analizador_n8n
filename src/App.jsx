import { useState } from "react";
import { analizarCV } from "./api";

function App() {
  const [file, setFile] = useState(null);
  const [requisitos, setRequisitos] = useState("");
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const enviarCV = async () => {
    if (!file || !requisitos) {
      alert("Por favor, sube un PDF y escribe los requisitos.");
      return;
    }

    setLoading(true);
    setResultado(null);
    setErrorMsg(null);

    try {
      const data = await analizarCV(file, requisitos);
      setResultado(data);
    } catch (error) {
      setErrorMsg("Hubo un problema al conectar con la IA. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif", maxWidth: "700px", margin: "auto" }}>
      <header style={{ textAlign: "center", marginBottom: "30px" }}>
        <h1>🚀 Analizador de CV con IA</h1>
      </header>

      <div style={{ backgroundColor: "#f4f4f4", padding: "20px", borderRadius: "10px" }}>
        <h3>1. Sube tu CV (PDF)</h3>
        <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files[0])} />

        <h3 style={{ marginTop: "20px" }}>2. Requisitos</h3>
        <textarea
          rows="5"
          style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
          value={requisitos}
          onChange={(e) => setRequisitos(e.target.value)}
          placeholder="Pega aquí lo que busca la empresa..."
        />

        <button 
          onClick={enviarCV} 
          disabled={loading}
          style={{ 
            width: "100%", marginTop: "20px", padding: "15px", 
            backgroundColor: loading ? "#ccc" : "#007bff", color: "white", 
            border: "none", borderRadius: "5px", cursor: "pointer" 
          }}
        >
          {loading ? "Analizando..." : "Analizar Perfil"}
        </button>
      </div>

      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}

      {resultado && (
        <div style={{ marginTop: "30px", padding: "20px", border: "2px solid green", borderRadius: "10px" }}>
          <h2>Resultado: {resultado.puntaje}%</h2>
          <p>{resultado.descripcion}</p>
        </div>
      )}
    </div>
  );
}

export default App;