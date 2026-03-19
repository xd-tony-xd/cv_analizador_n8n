export const analizarCV = async (file, requisitos) => {
  const formData = new FormData();
  formData.append("cv", file);
  formData.append("requisitos", requisitos);

  const response = await fetch(
    "https://n8n-dqmewasf.us-west-1.clawcloudrun.com/webhook/analizar-cv",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  // Si n8n devuelve un array, tomamos el primer elemento; si no, el objeto directo
  return Array.isArray(data) ? data[0] : data;
};