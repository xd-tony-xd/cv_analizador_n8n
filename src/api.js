export const analizarCV = async (file, requisitos) => {
  const formData = new FormData();
  formData.append("cv", file);
  formData.append("requisitos", requisitos);

  try {
    const response = await fetch(
      "https://n8n-dqmewasf.us-west-1.clawcloudrun.com/webhook/analizar-cv",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`Error del servidor: ${response.status}`);
    }

    const text = await response.text();
    
    if (!text || text.trim() === "") {
      throw new Error("Respuesta vacía de n8n");
    }

    const data = JSON.parse(text);
    return Array.isArray(data) ? data[0] : data;

  } catch (error) {
    console.error("Error en la petición:", error);
    throw error;
  }
};