# App Expedientes - Frontend

## Tecnologias / Librerias utilizadas

- **Axios:** Librería para realizar peticiones HTTP. Fue utilizada por su facilidad al manejar respuestas, interceptores, errores y cabeceras personalizadas.

- **TanStack Query:** Librería para el fetching de datos, caché automático, revalidación en segundo plano y manejo de errores. Se incluyó por su sencillez, eficiencia y por optimizar el consumo de APIs mediante las ``actions``.

- **Zustand:** Librería ligera para el manejo de estado global. Se utilizó para gestionar el estado de autenticación debido a su simplicidad, rendimiento y capacidad para crear stores escalables.

- **Sonner:** Librería de notificaciones modernas e interactivas. Fue integrada para mejorar la experiencia de usuario al mostrar mensajes de éxito, error y estados de la aplicación.

- **Zod + React Hook Form:** Tecnologías utilizadas para el manejo y validación de datos en formularios. Permiten crear esquemas tipados, definir interfaces y asegurar que los campos enviados cumplan con las reglas definidas.

## Instalacion y ejecucion 

1. Clonar el repositorio
````bash
git clone https://github.com/Riot-21/expedientes-frontend.git
````
2. Instalar dependencias
````
npm install
````
3. Configurar variables de entrono para archivo ``.env`` (clonar ``.env.template``)
````v
NEXT_PUBLIC_API_URL= "url_backend"
````

4. Ejecutar proyecto
````
npm run dev
````

5. Levantar backend y registrar un usuario para poder loguearse, ver pasos en:
   ``https://github.com/Riot-21/expedientes-backend``
