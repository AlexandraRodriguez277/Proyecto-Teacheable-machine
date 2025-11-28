<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LoL Assistant - Reconocimiento de Roles</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root {
            --primary: #0a1428;
            --secondary: #091428;
            --accent: #c8aa6e;
            --text: #f0e6d2;
            --success: #0acb6a;
            --danger: #e84057;
            --warning: #f0a75c;
            --role-adc: #d4af37;
            --role-fighter: #c41e3a;
            --role-mage: #3c8ce9;
            --role-assassin: #9400d3;
            --role-support: #32cd32;
            --role-tank: #808080;
            --role-jungle: #8b4513;
            --role-minion: #daa520;
            --role-dragon: #ff4500;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        body {
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            color: var(--text);
            min-height: 100vh;
            padding: 20px;
            line-height: 1.6;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        
        header {
            text-align: center;
            padding: 20px 0;
            margin-bottom: 30px;
            position: relative;
        }
        
        .header-content {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 20px;
            flex-wrap: wrap;
        }
        
        .logo {
            font-size: 3rem;
            color: var(--accent);
        }
        
        h1 {
            color: var(--accent);
            font-size: 2.5rem;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }
        
        .subtitle {
            font-size: 1.2rem;
            opacity: 0.9;
            max-width: 600px;
            margin: 0 auto;
        }
        
        .main-content {
            display: flex;
            flex-wrap: wrap;
            gap: 30px;
            margin-bottom: 40px;
        }
        
        .upload-section, .result-section {
            flex: 1;
            min-width: 300px;
            background: rgba(10, 20, 40, 0.7);
            border-radius: 10px;
            padding: 25px;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5);
            border: 1px solid rgba(200, 170, 110, 0.2);
        }
        
        .section-title {
            color: var(--accent);
            margin-bottom: 20px;
            font-size: 1.5rem;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .section-title i {
            font-size: 1.3rem;
        }
        
        .upload-area {
            border: 2px dashed var(--accent);
            border-radius: 8px;
            padding: 30px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s;
            margin-bottom: 20px;
        }
        
        .upload-area:hover {
            background: rgba(200, 170, 110, 0.1);
            transform: translateY(-3px);
        }
        
        .upload-icon {
            font-size: 3rem;
            color: var(--accent);
            margin-bottom: 15px;
        }
        
        .webcam-container {
            margin-top: 25px;
            text-align: center;
        }
        
        #webcam {
            width: 100%;
            max-width: 400px;
            border-radius: 8px;
            margin-bottom: 15px;
            border: 2px solid var(--accent);
        }
        
        .btn-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 10px;
            margin-top: 15px;
        }
        
        .btn {
            background: var(--accent);
            color: var(--primary);
            border: none;
            padding: 12px 20px;
            border-radius: 5px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .btn:hover {
            background: #d1b480;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }
        
        .btn:active {
            transform: translateY(0);
        }
        
        .btn-danger {
            background: var(--danger);
            color: white;
        }
        
        .btn-success {
            background: var(--success);
            color: white;
        }
        
        .btn-warning {
            background: var(--warning);
            color: var(--primary);
        }
        
        .result-display {
            text-align: center;
            padding: 20px;
            min-height: 200px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        
        .prediction-result {
            font-size: 2rem;
            margin: 15px 0;
            font-weight: bold;
            text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
        }
        
        .confidence {
            font-size: 1.2rem;
            margin: 10px 0;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .confidence-bar {
            width: 200px;
            height: 10px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 5px;
            overflow: hidden;
        }
        
        .confidence-fill {
            height: 100%;
            background: var(--success);
            border-radius: 5px;
            transition: width 0.5s ease;
        }
        
        .role-info {
            margin-top: 25px;
            text-align: left;
            background: rgba(0, 0, 0, 0.3);
            padding: 20px;
            border-radius: 8px;
            width: 100%;
            border-left: 4px solid var(--accent);
        }
        
        .role-title {
            color: var(--accent);
            margin-bottom: 15px;
            font-size: 1.4rem;
        }
        
        .role-description {
            margin-bottom: 15px;
        }
        
        .role-tips {
            background: rgba(200, 170, 110, 0.1);
            padding: 15px;
            border-radius: 5px;
            margin-top: 15px;
        }
        
        .features {
            display: flex;
            flex-wrap: wrap;
            gap: 25px;
            margin-top: 40px;
        }
        
        .feature-card {
            flex: 1;
            min-width: 250px;
            background: rgba(10, 20, 40, 0.7);
            border-radius: 10px;
            padding: 25px;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5);
            border: 1px solid rgba(200, 170, 110, 0.2);
            transition: transform 0.3s;
        }
        
        .feature-card:hover {
            transform: translateY(-5px);
        }
        
        .feature-icon {
            font-size: 2.5rem;
            color: var(--accent);
            margin-bottom: 15px;
        }
        
        .feature-card h3 {
            color: var(--accent);
            margin-bottom: 15px;
            font-size: 1.3rem;
        }
        
        footer {
            text-align: center;
            margin-top: 50px;
            padding-top: 20px;
            border-top: 1px solid rgba(200, 170, 110, 0.3);
            font-size: 0.9rem;
            opacity: 0.8;
        }
        
        .hidden {
            display: none;
        }
        
        .loader {
            border: 5px solid rgba(200, 170, 110, 0.3);
            border-top: 5px solid var(--accent);
            border-radius: 50%;
            width: 50px;
            height: 50px;
            animation: spin 1s linear infinite;
            margin: 20px auto;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        #imagePreview {
            margin-top: 20px;
            text-align: center;
        }
        
        #preview {
            max-width: 100%;
            max-height: 300px;
            border-radius: 8px;
            border: 2px solid var(--accent);
        }
        
        .role-adc { color: var(--role-adc); }
        .role-fighter { color: var(--role-fighter); }
        .role-mage { color: var(--role-mage); }
        .role-assassin { color: var(--role-assassin); }
        .role-support { color: var(--role-support); }
        .role-tank { color: var(--role-tank); }
        .role-jungle { color: var(--role-jungle); }
        .role-minion { color: var(--role-minion); }
        .role-dragon { color: var(--role-dragon); }
        
        @media (max-width: 768px) {
            .main-content {
                flex-direction: column;
            }
            
            .header-content {
                flex-direction: column;
                text-align: center;
            }
            
            h1 {
                font-size: 2rem;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <div class="header-content">
                <div class="logo">
                    <i class="fas fa-dragon"></i>
                </div>
                <div>
                    <h1>LoL Assistant</h1>
                    <p class="subtitle">Reconocimiento de roles y elementos de League of Legends - Aprende y mejora tu juego con IA</p>
                </div>
            </div>
        </header>
        
        <div class="main-content">
            <section class="upload-section">
                <h2 class="section-title"><i class="fas fa-upload"></i> Analizar Imagen</h2>
                <div class="upload-area" id="uploadArea">
                    <div class="upload-icon">
                        <i class="fas fa-cloud-upload-alt"></i>
                    </div>
                    <p>Arrastra una imagen aquí o haz clic para seleccionar</p>
                    <p class="subtitle">Formatos soportados: JPG, PNG, GIF</p>
                    <input type="file" id="fileInput" accept="image/*" class="hidden">
                </div>
                
                <div class="webcam-container">
                    <h3 class="section-title"><i class="fas fa-camera"></i> Usa tu cámara</h3>
                    <video id="webcam" autoplay playsinline></video>
                    <div class="btn-container">
                        <button id="startWebcam" class="btn">
                            <i class="fas fa-video"></i> Activar Cámara
                        </button>
                        <button id="capture" class="btn btn-success" disabled>
                            <i class="fas fa-camera"></i> Capturar Imagen
                        </button>
                        <button id="stopWebcam" class="btn btn-danger" disabled>
                            <i class="fas fa-stop"></i> Detener Cámara
                        </button>
                    </div>
                </div>
                
                <div id="imagePreview" class="hidden">
                    <h3 class="section-title"><i class="fas fa-image"></i> Vista Previa</h3>
                    <img id="preview" src="" alt="Vista previa">
                </div>
            </section>
            
            <section class="result-section">
                <h2 class="section-title"><i class="fas fa-chart-bar"></i> Resultado</h2>
                <div class="result-display">
                    <div id="loader" class="loader hidden"></div>
                    <div id="predictionResult">
                        <i class="fas fa-search" style="font-size: 3rem; opacity: 0.5; margin-bottom: 20px;"></i>
                        <p>Sube o captura una imagen para analizar</p>
                        <p class="subtitle">El modelo reconocerá entre 9 categorías de League of Legends</p>
                    </div>
                </div>
                
                <div id="roleInfo" class="role-info hidden">
                    <h3 class="role-title" id="roleName">Nombre del Rol</h3>
                    <p class="role-description" id="roleDescription">Descripción del rol...</p>
                    <div class="role-tips">
                        <strong>Consejos de juego:</strong>
                        <p id="roleTips">Consejos específicos para este rol...</p>
                    </div>
                </div>
            </section>
        </div>
        
        <div class="features">
            <div class="feature-card">
                <div class="feature-icon">
                    <i class="fas fa-crosshairs"></i>
                </div>
                <h3>Asistente en Partida</h3>
                <p>Detecta roles en tiempo real para ayudarte a tomar mejores decisiones durante el juego. Identifica campeones y sus funciones al instante.</p>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">
                    <i class="fas fa-chart-line"></i>
                </div>
                <h3>Análisis de Partidas</h3>
                <p>Analiza partidas anteriores para identificar áreas de mejora en tu estrategia. Comprende las composiciones de equipo y contra-picks.</p>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">
                    <i class="fas fa-mobile-alt"></i>
                </div>
                <h3>App de Práctica</h3>
                <p>Practica y aprende los roles de los campeones de forma interactiva. Ideal para nuevos jugadores que quieren familiarizarse con el juego.</p>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">
                    <i class="fas fa-universal-access"></i>
                </div>
                <h3>Accesibilidad</h3>
                <p>Apoyo a jugadores con discapacidad visual mediante descripciones de audio. Hace el juego más inclusivo para todos.</p>
            </div>
        </div>
        
        <footer>
            <p>LoL Assistant - Haciendo que aprender League of Legends sea más fácil, accesible y divertido</p>
            <p>Modelo entrenado con Teachable Machine | Reconocimiento de 9 categorías de LoL: Tirador, Luchador, Mago, Asesino, Soporte, Tanque, Monstruos de la jungla, Minions y Dragones</p>
        </footer>
    </div>

    <script>
        // Elementos DOM
        const uploadArea = document.getElementById('uploadArea');
        const fileInput = document.getElementById('fileInput');
        const preview = document.getElementById('preview');
        const imagePreview = document.getElementById('imagePreview');
        const predictionResult = document.getElementById('predictionResult');
        const loader = document.getElementById('loader');
        const roleInfo = document.getElementById('roleInfo');
        const roleName = document.getElementById('roleName');
        const roleDescription = document.getElementById('roleDescription');
        const roleTips = document.getElementById('roleTips');
        const startWebcam = document.getElementById('startWebcam');
        const stopWebcam = document.getElementById('stopWebcam');
        const capture = document.getElementById('capture');
        const webcam = document.getElementById('webcam');
        
        // Información sobre los roles (basado en tu descripción)
        const roleData = {
            'Tirador': {
                class: 'role-adc',
                description: 'Los Tiradores (ADC - Attack Damage Carry) son campeones que se especializan en infligir daño constante a distancia, principalmente con ataques básicos. Suelen ser frágiles pero con un alto potencial de daño en las fases tardías del juego.',
                tips: 'Enfócate en farmear para conseguir objetos lo más rápido posible. Mantente en la parte trasera en los combates y prioriza tu posicionamiento sobre todo.'
            },
            'Luchador': {
                class: 'role-fighter',
                description: 'Los Luchadores (también conocidos como Bruisers) son campeones versátiles que combinan daño y resistencia. Son efectivos en combates cuerpo a cuerpo y pueden ser una amenaza tanto para tanques como para carries enemigos.',
                tips: 'Busca oportunidades para flanquear al equipo enemigo. Tu objetivo principal son los carries enemigos. Equilibra objetos de daño y resistencia.'
            },
            'Mago': {
                class: 'role-mage',
                description: 'Los Magos son campeones que dependen de habilidades con gran poder de daño y efectos de control. Suelen tener poca resistencia pero un gran impacto en combates de equipo gracias a su daño en área y utilidad.',
                tips: 'Mantén tu distancia y coordina tus habilidades para maximizar el daño. Controla la visión para evitar emboscadas y aprovecha tu rango de habilidades.'
            },
            'Asesino': {
                class: 'role-assassin',
                description: 'Los Asesinos se especializan en eliminar rápidamente a objetivos prioritarios (generalmente carries). Tienen alta movilidad y daño explosivo, pero son frágiles y dependen de entrar y salir de combate rápidamente.',
                tips: 'Espera el momento adecuado para entrar en combate. Tu objetivo son los carries enemigos. Aprovecha tu movilidad para flanquear y eliminar objetivos clave.'
            },
            'Soporte': {
                class: 'role-support',
                description: 'Los Soportes se enfocan en ayudar a su equipo mediante curaciones, escudos, control de masas y utilidad general. Su objetivo es facilitar que sus aliados tengan éxito, especialmente el ADC en fase de líneas.',
                tips: 'Protege a tu carry y proporciona visión con guardianes de visión. Prioriza la utilidad para el equipo sobre tu propio daño. Comunica información importante a tu equipo.'
            },
            'Tanque': {
                class: 'role-tank',
                description: 'Los Tanques son campeones con alta resistencia y capacidad para iniciar combates o proteger aliados. Absorben daño y crean espacio para que sus carries hagan daño de forma segura.',
                tips: 'Inicia combates favorables para tu equipo y protege a tus carries. Posiciónate entre el equipo enemigo y tus aliados más frágiles. Controla objetivos con tu durabilidad.'
            },
            'Monstruos de la jungla': {
                class: 'role-jungle',
                description: 'Los Monstruos de la jungla son criaturas neutrales que otorgan beneficios (oro, experiencia y efectos) al ser eliminadas. Los campeones jungleros se benefician de estas recompensas para ganar ventaja.',
                tips: 'Controla los objetivos épicos como el Barón Nashor y los Dragones. Ganka las líneas cuando tengas oportunidad. Mantén un ritmo de farmeo eficiente en la jungla.'
            },
            'Minions': {
                class: 'role-minion',
                description: 'Los Minions son unidades que aparecen periódicamente en las calles. Otorgan oro y experiencia al ser eliminados (farmeo). Son esenciales para ganar ventaja económica y presionar las estructuras enemigas.',
                tips: 'Farmea minions para conseguir oro y experiencia. Controla las oleadas para presionar las torres enemigas de forma segura. Aprovecha las oleadas para crear presión en el mapa.'
            },
            'Dragones': {
                class: 'role-dragon',
                description: 'Los Dragones son objetivos neutrales que otorgan beneficios permanentes a todo el equipo al ser eliminados. Cada tipo de dragón proporciona un buff diferente, y acumular almas de dragón otorga poderosos efectos.',
                tips: 'Controla la fosa del dragón para asegurar estos poderosos beneficios para tu equipo. Prioriza dragones según la composición de tu equipo y la situación de la partida.'
            }
        };
        
        // Variables globales
        let model;
        let webcamStream;
        
        // Inicializar la aplicación
        document.addEventListener('DOMContentLoaded', function() {
            // Configurar eventos
            uploadArea.addEventListener('click', () => fileInput.click());
            uploadArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                uploadArea.style.background = 'rgba(200, 170, 110, 0.2)';
            });
            uploadArea.addEventListener('dragleave', () => {
                uploadArea.style.background = '';
            });
            uploadArea.addEventListener('drop', (e) => {
                e.preventDefault();
                uploadArea.style.background = '';
                if (e.dataTransfer.files.length) {
                    fileInput.files = e.dataTransfer.files;
                    handleImageUpload(e.dataTransfer.files[0]);
                }
            });
            
            fileInput.addEventListener('change', (e) => {
                if (e.target.files.length) {
                    handleImageUpload(e.target.files[0]);
                }
            });
            
            startWebcam.addEventListener('click', startWebcamFunc);
            stopWebcam.addEventListener('click', stopWebcamFunc);
            capture.addEventListener('click', captureImage);
            
            // Cargar el modelo (simulación)
            loadModel();
        });
        
        // Cargar el modelo de Teachable Machine
        async function loadModel() {
            try {
                // En una implementación real, aquí cargarías tu modelo
                // const modelURL = 'URL_DEL_MODELO/model.json';
                // const metadataURL = 'URL_DEL_MODELO/metadata.json';
                // model = await tmImage.load(modelURL, metadataURL);
                
                console.log('Cargando modelo de Teachable Machine...');
                
                // Simulación de carga del modelo
                setTimeout(() => {
                    model = 'loaded'; // En una implementación real, esto sería el modelo cargado
                    console.log('Modelo cargado correctamente');
                }, 1500);
                
            } catch (error) {
                console.error('Error al cargar el modelo:', error);
                predictionResult.innerHTML = '<p style="color: var(--danger)">Error al cargar el modelo. Intenta recargar la página.</p>';
            }
        }
        
        // Manejar la subida de imagen
        function handleImageUpload(file) {
            if (!file.type.match('image.*')) {
                alert('Por favor, selecciona una imagen válida.');
                return;
            }
            
            const reader = new FileReader();
            reader.onload = function(e) {
                preview.src = e.target.result;
                imagePreview.classList.remove('hidden');
                classifyImage(preview);
            };
            reader.readAsDataURL(file);
        }
        
        // Clasificar la imagen
        async function classifyImage(imgElement) {
            if (!model) {
                predictionResult.innerHTML = '<p style="color: var(--warning)">El modelo aún se está cargando. Intenta de nuevo en unos segundos.</p>';
                return;
            }
            
            loader.classList.remove('hidden');
            predictionResult.innerHTML = '';
            roleInfo.classList.add('hidden');
            
            try {
                // Simulación de clasificación (reemplaza con la llamada real a tu modelo)
                setTimeout(() => {
                    loader.classList.add('hidden');
                    
                    // Resultados simulados (en la práctica, estos vendrían del modelo)
                    const mockResults = [
                        { className: 'Tirador', probability: 0.92 },
                        { className: 'Asesino', probability: 0.05 },
                        { className: 'Mago', probability: 0.03 }
                    ];
                    
                    displayResults(mockResults);
                }, 2000);
                
                // En una implementación real, usarías:
                // const predictions = await model.classify(imgElement);
                // displayResults(predictions);
                
            } catch (error) {
                console.error('Error al clasificar la imagen:', error);
                loader.classList.add('hidden');
                predictionResult.innerHTML = '<p style="color: var(--danger)">Error al analizar la imagen. Intenta con otra imagen.</p>';
            }
        }
        
        // Mostrar resultados
        function displayResults(predictions) {
            const topPrediction = predictions[0];
            const confidencePercent = (topPrediction.probability * 100).toFixed(1);
            
            // Determinar la clase CSS según el rol
            const roleClass = roleData[topPrediction.className] ? roleData[topPrediction.className].class : '';
            
            predictionResult.innerHTML = `
                <p class="prediction-result ${roleClass}">${topPrediction.className}</p>
                <div class="confidence">
                    <span>Confianza: ${confidencePercent}%</span>
                    <div class="confidence-bar">
                        <div class="confidence-fill" style="width: ${confidencePercent}%"></div>
                    </div>
                </div>
            `;
            
            // Mostrar información del rol si está disponible
            if (roleData[topPrediction.className]) {
                roleName.textContent = topPrediction.className;
                roleName.className = `role-title ${roleClass}`;
                roleDescription.textContent = roleData[topPrediction.className].description;
                roleTips.textContent = roleData[topPrediction.className].tips;
                roleInfo.classList.remove('hidden');
            } else {
                roleInfo.classList.add('hidden');
            }
        }
        
        // Funciones para la cámara web
        async function startWebcamFunc() {
            try {
                webcamStream = await navigator.mediaDevices.getUserMedia({ 
                    video: { width: 640, height: 480 } 
                });
                webcam.srcObject = webcamStream;
                startWebcam.disabled = true;
                stopWebcam.disabled = false;
                capture.disabled = false;
            } catch (error) {
                console.error('Error al acceder a la cámara:', error);
                alert('No se pudo acceder a la cámara. Asegúrate de permitir el acceso a la cámara en tu navegador.');
            }
        }
        
        function stopWebcamFunc() {
            if (webcamStream) {
                webcamStream.getTracks().forEach(track => track.stop());
                webcam.srcObject = null;
                startWebcam.disabled = false;
                stopWebcam.disabled = true;
                capture.disabled = true;
            }
        }
        
        function captureImage() {
            const canvas = document.createElement('canvas');
            canvas.width = webcam.videoWidth;
            canvas.height = webcam.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(webcam, 0, 0, canvas.width, canvas.height);
            
            preview.src = canvas.toDataURL('image/png');
            imagePreview.classList.remove('hidden');
            classifyImage(preview);
        }
    </script>
</body>
</html>
