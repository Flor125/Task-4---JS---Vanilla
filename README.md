# Amazing Events 🎪📅

¡Bienvenido a **Amazing Events**! Esta es una aplicación web interactiva desarrollada con **HTML5, CSS3, Bootstrap 5 y JavaScript Vanilla**. Consume datos de una API externa en tiempo real para listar, filtrar y mostrar estadísticas de diversos eventos (conciertos, ferias de comida, museos, etc.).

---

## 🚀 Características Principales

*   **Página de Inicio (Home):** Muestra todos los eventos disponibles.
*   **Filtros Dinámicos:**
    *   **Barra de Búsqueda:** Filtra eventos por título, categoría o fecha en tiempo real.
    *   **Categorías Dinámicas:** Los *checkboxes* de categorías se generan automáticamente basándose en los datos provistos por la API.
    *   **Filtros Cruzados:** Combina la búsqueda de texto y los checkboxes para búsquedas sumamente precisas.
*   **Secciones Específicas:**
    *   **Próximos Eventos (Upcoming Events):** Listado filtrado automáticamente para mostrar solo los eventos futuros respecto a la fecha actual del sistema API.
    *   **Eventos Pasados (Past Events):** Listado filtrado automáticamente con los eventos que ya ocurrieron.
*   **Detalles del Evento:** Una página dinámica (`details.html`) que extrae la información del evento seleccionado a través de parámetros de consulta (`URLSearchParams`) e ilustra su descripción, precio, lugar y capacidad.
*   **Tabla de Estadísticas (Stats):**
    *   Muestra el evento con mayor asistencia, el de menor asistencia y el de mayor capacidad.
    *   Genera estadísticas agrupadas por categoría para eventos futuros (ganancias estimadas y porcentaje de asistencia estimado).
    *   Genera estadísticas agrupadas por categoría para eventos pasados (ganancias reales y porcentaje de asistencia real).
*   **Formulario de Contacto:** Vista estática para la comunicación del cliente.

---

## 🛠️ Tecnologías Utilizadas

*   **HTML5 & CSS3:** Estructuración y estilos personalizados.
*   **Bootstrap 5:** Framework CSS para el diseño *responsive* y componentes visuales pre-estilizados (como el carrusel, las tarjetas y la grilla).
*   **JavaScript (ES6+):** Programación reactiva, manipulación dinámica del DOM y lógica de filtrado cruzado.
*   **Fetch API:** Peticiones HTTP asíncronas para obtener la información de los eventos en formato JSON desde una API externa (`https://mindhub-xj03.onrender.com/api/amazing`).

---

## 📂 Estructura del Proyecto

El proyecto está organizado de la siguiente manera:

```text
├── index.html                  # Página principal de inicio (Home)
├── upcomingevents.html          # Vista de próximos eventos
├── PE.html                     # Vista de eventos pasados
├── details.html                # Vista de detalles del evento seleccionado
├── stats.html                  # Página con tablas de rendimiento y estadísticas
├── Contact.html                # Formulario de contacto
├── styles.css                  # Hoja de estilos personalizados (custom)
├── images/                     # Recursos gráficos y logo corporativo
│   └── Logo.png
└── scripts/                    # Lógica JavaScript modularizada por página
    ├── styles.js               # Lógica para index.html (Home)
    ├── styles-UE.js            # Lógica para upcomingevents.html
    ├── styles-PE.js            # Lógica para PE.html
    ├── styles-details.js       # Lógica para details.html
    └── styles-stats.js         # Lógica para stats.html (cálculos de estadísticas)
```

---

## 💻 Ejecución en Modo Local

Debido a que el proyecto utiliza módulos de JavaScript (`type="module"`), los navegadores modernos restringen la carga de archivos locales directamente a través del protocolo `file://` debido a políticas de seguridad CORS. 

Para ejecutar el proyecto localmente, debes correr un servidor HTTP. Aquí tienes algunas opciones fáciles:

### Opción 1: Live Server (Recomendado para VS Code)
1. Instala la extensión **Live Server** en Visual Studio Code.
2. Haz clic derecho sobre `index.html` y selecciona **Open with Live Server**.

### Opción 2: Python (Servidor integrado)
Si tienes Python instalado, ejecuta en la terminal dentro de la carpeta del proyecto:

```bash
# Para Python 3.x
python -m http.server 8000

# Para Python 2.x
python -m SimpleHTTPServer 8000
```
Luego abre tu navegador en `http://localhost:8000`.

### Opción 3: Servidor NodeJS (http-server)
Si tienes Node.js instalado, puedes ejecutar:

```bash
npx http-server . -p 8080
```
Luego abre tu navegador en `http://localhost:8080`.

---

## 🧩 Detalle Técnico del Filtro Cruzado

La aplicación implementa una combinación de eventos (`input` y `change`) que escuchan tanto a la barra de búsqueda como a los *checkboxes* de las categorías. Cuando cualquiera de estos elementos cambia de estado:
1. Se recuperan las categorías seleccionadas.
2. Se extrae el texto ingresado en la barra de búsqueda.
3. Se aplica un filtrado simultáneo (*filtro cruzado*), asegurando que los eventos presentados cumplan con ambos criterios.
4. En caso de no haber resultados que cumplan con la condición, se renderiza dinámicamente un mensaje amigable indicando que no se encontraron eventos.
