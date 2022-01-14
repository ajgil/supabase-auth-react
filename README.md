# HiklubFrontEnd
New 2022 FrontEnd repository

# Guia de Nomenclatura y codificación 

## Directorios
Se escriben siempre en minúscula

## Ficheros

### Componentes
Se utilizará notación `PasalCase`

### páginas
Se utilizará notación `PasalCase` para el fichero, y la ruta web será siempre en _minúscula_

## Estructura de la aplicación
Según indica React no existe un sistema estructura definida. Recomiendan:

https://reactjs.org/docs/faq-structure.html

* Agrupar por Features o Routes

* Agrupar por tipo de fichero

### Hiklub estructura
Se opta por una estructura mixta, intentando seguir el patrón MVC (Modelo Vista Controlador).
En ningún caso se superarán 2 niveles de anidación

```
src/
--- hiklub/
----- klubers/
------- profile/
------- preferences/
----- bookings/
------- bookingsItem/
------- bookingsList/
```

* `hiklub` contendrá todos aquellos componentes relacionados con la unidad funcional que corresponda

* `components` todos aquellos componentes y vistas comunes a la aplicación
    - Botones
    - Listas
    - layouts (sidebar, navbar)
    - Avatar (es común a odes y klubers)

* `context` los contextos de aplicación

* `pages` las estructuras de página que contendrán componentes visuales

* `lib` recursos de backend y otros servicios

* `utils` es sinónimo de `helpers` todas las funciones que sean transversales
    - funciones de fecha

* `resources`

* `styles`

* `api` backend 

## Codificación

### Ramas y features

* La rama principal es `develop`

* Nuevas funcionalidades `feature/funcionalidad`

* Integrar servicios de terceros `integration/servicio`

* Bugs / errores / correcciones `bug/error`


### Rutas
Se utilizarán siempre rutas absolutas

#### Guia de estilo de Airbnb TLDR
https://github.com/airbnb/javascript/tree/master/react#naming