# servidor-congpt
Descripción General:
Este proyecto consiste en desarrollar una API utilizando Fastify para manejar solicitudes HTTP, realizar comparaciones de precios y extraer datos de precios en tiempo real desde una página web. El servidor utiliza Axios para realizar solicitudes HTTP y Cheerio para extraer datos de páginas web. Además, se integra con la API de OpenAI para procesar y comparar datos de precios mediante modelos de lenguaje.

Requisitos del Sistema:
Comparación de Precios:

Recibir una lista de precios y un precio individual.
Comparar la media de la lista de precios con el precio individual.
Devolver 'true' si el precio individual es menor que la media de la lista, de lo contrario, devolver 'false'.
Scraping de Precios:

Extraer precios de productos de una página web específica.
Utilizar Cheerio para analizar el HTML de la página web y extraer precios en un formato específico.
Integración con OpenAI:

Enviar datos de precios a la API de OpenAI.
Recibir y procesar las respuestas de OpenAI para realizar comparaciones y generar resultados.
Funcionalidades Específicas:
Endpoint /modelo/v1:

Recibir una solicitud POST con datos de precios en el cuerpo de la solicitud.
Extraer precios adicionales mediante scraping de una página web.
Enviar todos los datos de precios a la API de OpenAI para procesamiento.
Devolver la respuesta de OpenAI al cliente.
Endpoint /modelo/v2:

Responder con un mensaje simple de saludo.
Endpoint /modelo/v3:

Devolver los datos recibidos en el cuerpo de la solicitud como respuesta.
Endpoint /scrape:

Realizar scraping de precios de una página web específica.
Devolver los precios extraídos en la respuesta.
Tecnología y Bibliotecas Utilizadas:
Fastify: Framework para construir el servidor y manejar solicitudes HTTP.
Axios: Para realizar solicitudes HTTP.
Cheerio: Para analizar y extraer datos de páginas web.
OpenAI API: Para procesamiento avanzado de datos de precios.
TypeScript: Para proporcionar tipos y mejorar la calidad del código.
Estructura del Código:
El código del proyecto incluye las siguientes partes:

Interfaces:

MyRequestBody: Define la estructura del cuerpo de la solicitud.
MyRequestHeaders: Define la estructura de los encabezados de la solicitud.
Datos de Ejemplo:

listadeejemplo: Objeto que contiene datos de precios de ejemplo para pruebas.
Mensajes para OpenAI:

messages: Array que contiene mensajes predefinidos y dinámicos para enviar a la API de OpenAI.
Funciones del Servidor:

routes: Función principal que define los endpoints del servidor.
cogertexto: Función auxiliar que realiza el scraping de la página web y extrae precios.
Endpoints Definidos:

/modelo/v1: Recibe datos de precios, realiza scraping, envía datos a OpenAI y devuelve la respuesta.
/modelo/v2: Devuelve un mensaje de saludo.
/modelo/v3: Devuelve los datos recibidos en el cuerpo de la solicitud.
/scrape: Realiza scraping de precios y devuelve los datos extraídos.
Ejemplo de Uso
Enviar una solicitud POST a /modelo/v1 con una lista de precios y un precio individual en el cuerpo de la solicitud. El servidor realizará el scraping, enviará los datos a OpenAI y devolverá el resultado de la comparación.

Enviar una solicitud GET a /scrape para obtener los precios extraídos de la página web especificada.

Este proyecto proporciona una base sólida para entender cómo construir y manejar una API RESTful en Node.js utilizando Fastify, realizar scraping de datos web y utilizar servicios de procesamiento avanzado como la API de OpenAI.






