# React + TypeScript + Vite

En esta aplicacion Se realizo el consumo de servicios provistos por un backen de ASP.NET Core 8 Web API,

El mismo tiene un sistema de Logueo y register en el cual para poder loguearse tiene que estar registrado, tambien posee un ABM de Clientes, de Productos y un detalle de las ordenes creadas en el cual por medio de un boton se puede crear nuevas ordenes y la misma se va ver reflejado en el listado tienen tambien la posibilidad de ver un detalle mas puntual por medio de un Dialog

Cuenta con un boton de Logout y la sesion del usuario se guarda en el LocalStorage la misma se elimina a los 10 minutos de esa manera hace que el usaurio tenga que volver a loguarse a los 10 min

la app esta construida por varios componentes especificos para su uso

# MicroserviceApp inicio de aplicacion

para poder correr la aplicacion se debe correr el comando "npm run dev"

en el caso de no levantar verificar las dependencias, correr npm install y luego npm run build
