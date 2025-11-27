<img width="1536" height="1024" alt="chatUstudy_imagen" src="https://github.com/user-attachments/assets/d7187ffe-2fa9-487c-b4ff-c77102099d43" />

**ChatUStudy** Es una aplicación móvil y web diseñada para estudiantes, que centraliza la comunicación académica en un solo lugar. Permite chatear en tiempo real con compañeros, crear grupos de estudio, publicar información académica y organizar eventos en un calendario. Su objetivo es facilitar la colaboración entre estudiantes y evitar la dispersión de información en múltiples plataformas como WhatsApp, correo o redes sociales.

---

## 📌 Requerimientos Funcionales

- **RF1 – Registro de usuario**  
  Permite crear una cuenta para acceder a las funciones del sistema.

- **RF2 – Sistema de publicaciones académicas categorizadas**  
  Los usuarios pueden crear, ver y filtrar publicaciones según categorías de interés.

- **RF3 – Chat colaborativo con filtros de información**  
  Mensajería en tiempo real con opciones para filtrar mensajes académicos.

- **RF4 – Generación de resúmenes automáticos de conversaciones**  
  El sistema puede producir resúmenes breves de chats extensos.

- **RF5 – Calendario académico integrado**  
  Gestión de eventos, fechas importantes y recordatorios.

- **RF6 – Notificaciones inteligentes**  
  Avisos priorizados según importancia académica o urgencia.

- **RF7 – Modo concentración**  
  Permite silenciar mensajes no académicos para mejorar el enfoque.

- **RF8 – Inicio de sesión de usuario**  
  Acceso seguro mediante credenciales registradas.

- **RF9 – Recuperación de contraseña**  
  Opción para restablecer la contraseña mediante correo electrónico.

- **RF10 – Gestión de perfiles de usuario**  
  Edición de información personal como nombre, foto, biografía, etc.

- **RF11 – Creación y gestión de grupos de estudio**  
  Chats grupales, invitaciones y administración de miembros.

- **RF12 – Roles de usuario diferenciados**  
  Roles como estudiante, profesor o administrador con permisos específicos.

- **RF13 – Búsqueda avanzada**  
  Localización de publicaciones, grupos y usuarios mediante filtros.

- **RF14 – Adjuntar archivos**  
  Envío de imágenes, PDFs y recursos académicos tanto en chat como en publicaciones.

- **RF15 – Moderación de contenido académico**  
  Control del contenido inapropiado o irrelevante para la comunidad educativa.

- **RF16 – Sistema de reacciones y comentarios**  
  Los usuarios pueden reaccionar y comentar en publicaciones o mensajes.

---

## 📌 Requerimientos No Funcionales

- **RNF1 – Rendimiento**  
  Las pantallas principales (chat y publicaciones) deben cargar en menos de **3 segundos** bajo condiciones normales. La app también debe funcionar aceptablemente con conexión limitada.

- **RNF2 – Tolerancia a desconexiones**  
  El sistema debe sincronizar automáticamente los mensajes enviados sin conexión mediante SQLite → Firestore, sin pérdida de datos.

- **RNF3 – Disponibilidad**  
  ChatUStudy debe estar accesible **24/7** desde dispositivos móviles compatibles.

- **RNF4 – Seguridad**  
  Uso de Firebase Authentication, HTTPS para cifrado en tránsito y reglas de Firestore para proteger la información y evitar accesos no autorizados.

- **RNF5 – Usabilidad**  
  Interfaz intuitiva que permita acceder a chat, publicaciones y categorías con máximo **dos clics/taps**.

- **RNF6 – Escalabilidad y concurrencia**  
  Soporte para al menos **200 conexiones simultáneas** sin degradar el rendimiento del chat.

- **RNF7 – Accesibilidad**  
  Adaptación para usuarios con limitaciones visuales (contraste, textos legibles, etiquetas accesibles).

- **RNF8 – Integridad y consistencia de datos**  
  Garantizar datos completos y sin duplicados durante procesos de sincronización con Firebase. No debe haber pérdida de información.

---


<img width="1024" height="1024" alt="url_qrcodecreator com_08_28_59" src="https://github.com/user-attachments/assets/627636c3-bd6d-4403-b838-dbb564fe4424" />
