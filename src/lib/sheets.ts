export const appendLeadToSheet = async (values: any[]) => {
  const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxs-7gU0fgu5dZNAlyogk3ybzwwJtpU_552fI7iot6Nk6uky34xBXE0ZUMtBhTBqc4/exec"; 

  // values es un array: [nombre, email, telefono, programa, fecha]
  const data = new URLSearchParams();
  data.append('nombre', values[0] || '');
  data.append('email', values[1] || '');
  data.append('telefono', values[2] || '');
  data.append('programa', values[3] || '');
  data.append('fecha', values[4] || '');

  try {
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      body: data,
      mode: 'no-cors'
    });
    
    // Al usar mode no-cors (si hiciera falta) o por redirecciones, a veces el body no se lee directamente
    // confiaremos en que la llamada termine
    return { status: "success" };
  } catch (error) {
    console.error("Error al enviar a Apps Script:", error);
    throw error;
  }
};
