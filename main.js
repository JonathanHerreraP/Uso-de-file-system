// Modulos http, url y fs:
const http = require('http')
const url = require('url')
const fs = require('fs')

// Crear servidor:
http
.createServer(function (req, res) {

// Obtengo los parametros de las querys string:
const params = url.parse(req.url, true).query
const nombre = params.nombre
const contenido = params.contenido
const nuevoNombre = params.nuevoNombre



// file system para crear archivo:
if (req.url.includes('/crear')) {
fs.writeFile(nombre, contenido, () => {
res.write('Archivo creado con éxito!')
res.end()
})
} 

// file system para leer archivo:
if (req.url.includes('/leer')) {
fs.readFile(nombre, (err, data) => {
res.write(data)
res.end()
})
}

// file system para renombrar archivo:
if (req.url.includes('/renombrar')) {
fs.rename(nombre, nuevoNombre, (err, data) => {
res.write(`Archivo ${nombre} renombrado por ${nuevoNombre}`)
res.end()
})
} 

// file system para eliminar archivo:
if (req.url.includes('/eliminar')) {
fs.unlink(nombre, (err, data) => {
res.write(`Archivo ${nombre} eliminado con éxito`)
res.end()
})
}

//puerto a utilizar:
})
.listen(8080, () => console.log('Escuchando el puerto 8080'))