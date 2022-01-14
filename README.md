# HiklubFrontEnd
New 2022 FrontEnd repository

# Guia de Nomenclatura y codificación

## Directorios
se escriben siempre en minúscula

## Ficheros

### Componentes
Se utilizará notación PasalCase

### páginas
Se utilizará notación PasalCase para el fichero, y la ruta será siempre en minúscula

## Estructura de la aplicación
Según indica React no existe un sistema estructura definida. Recomiendan:

https://reactjs.org/docs/faq-structure.html

* Agrupar por Features o Routes

* Agrupar por tipo de fichero

### Hiklub estructura
Se opta por una estructura mixta, intentando seguir el patrón MVC (Modelo Vista Controlador)

** `hiklub` contendrá todos aquellos componentes relacionados con la unidad funcional que corresponda

** `components` todos aquellos componentes y vistas comunes a la aplicación
- Botones
- Listas
- layouts (sidebar, navbar)

** `context` los contextos de aplicación

** `pages` las estructuras de página que contendrán componentes visuales

** `lib` recursos de backend y otros servicios

** `utils` es sinónimo de `helpers` todas las funciones que sean transversales
- funciones de fecha

** `resources`

** `styles`

** `api` backend 


#### Guia de estilo de Airbnb TLDR
https://github.com/airbnb/javascript/tree/master/react#naming