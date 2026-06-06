export const appendLeadToSheet = async (values: any[]) => {
  // Cuando tengas la URL de tu Web App de Google Apps Script, pégala aquí:
  const APPS_SCRIPT_URL = "URL_DE_TU_APPS_SCRIPT_AQUI"; 
  
  if (APPS_SCRIPT_URL === "URL_DE_TU_APPS_SCRIPT_AQUI") {
    console.warn("Falta configurar la URL de Apps Script en src/lib/sheets.ts");
    // Simulamos un retraso y un éxito para que continúe la UI
    await new Promise(resolve => setTimeout(resolve, 800));
    return { status: "success" };
  }

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
