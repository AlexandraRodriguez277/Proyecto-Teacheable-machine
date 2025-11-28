const URL = "https://teachablemachine.withgoogle.com/models/eHgGYtTwnj/";

let model, imageInput;

// Modificación: La función init ahora carga el modelo y prepara el input de archivo.
async function init() {
    // 1. Cargar el Modelo
    model = await tmImage.load(URL + "model.json", URL + "metadata.json");
    console.log("Modelo cargado");

    // 2. Preparar el Input de Archivo
    // Asumiendo que tienes un input file con id="imageUpload" en tu HTML
    imageInput = document.getElementById("imageUpload");
    if (imageInput) {
        // Ejecutar 'previewImage' y 'predict' cada vez que se selecciona un nuevo archivo.
        imageInput.addEventListener("change", async (event) => {
            const file = event.target.files[0];
            if (file) {
                previewImage(file);
                await predict(file);
            }
        });
    } else {
        console.error("No se encontró el elemento con id='imageUpload'. Asegúrate de agregarlo a tu HTML.");
    }
}

// Función para mostrar la imagen seleccionada por el usuario.
function previewImage(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        const img = document.createElement("img");
        img.src = e.target.result;
        img.id = "uploadedImage";
        img.style.maxWidth = "400px"; // Establece un tamaño para la previsualización
        img.style.maxHeight = "300px";

        const imageContainer = document.getElementById("imageContainer");
        imageContainer.innerHTML = ""; // Limpia el contenedor
        imageContainer.appendChild(img);
    };
    reader.readAsDataURL(file);
}

// Modificación: La función predict ahora acepta un objeto File, lo convierte en un elemento <img>,
// y lo usa para la predicción.
async function predict(file) {
    const resultadosDiv = document.getElementById("resultados");
    resultadosDiv.innerHTML = "Cargando predicción...";

    // Crear un elemento de imagen temporal a partir del archivo
    const img = document.createElement('img');
    const url = URL.createObjectURL(file);
    img.src = url;

    // Esperar a que la imagen se cargue completamente antes de hacer la predicción
    await new Promise(resolve => img.onload = resolve);

    // Hacer la predicción
    const prediction = await model.predict(img);
    
    // Limpiar y mostrar resultados
    resultadosDiv.innerHTML = "";
    prediction.forEach(p => {
        resultadosDiv.innerHTML += `<p>${p.className}: ${(p.probability * 100).toFixed(2)}%</p>`;
    });

    // Liberar la URL del objeto después de usarla
    URL.revokeObjectURL(url);
}

// Iniciar la aplicación
init();