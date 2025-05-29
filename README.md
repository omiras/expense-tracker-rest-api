# Expense Tracker REST API - Ejercicio por Iteraciones

Este proyecto consiste en implementar una API REST para la gestión de gastos. El desarrollo se realiza por iteraciones. En cada iteración se debe implementar un endpoint, probarlo y manejar correctamente los datos erróneos o malintencionados del usuario

Este proyecto esta basado en [este](https://roadmap.sh/projects/expense-tracker) y [este otro](https://roadmap.sh/projects/expense-tracker-api) proyecto de roadmap.sh

## Los gastos

Los gastos se representan por 3 campos

- Una descripción que es como mucho de 40 carácteres
- Una cantidad de dinero que debe número positivo
- Una categoría válida (el array validCategories en index.js contiene todas las categorías válidas)

## Setup

Instala las dependencias con:

```
npm install
```

Arranca el servidor con:

```
npm run dev
```

Cuando implementes correctamente todos los endpoints podrás probar la aplicación Web en [http://localhost:3000](http://localhost:3000) 

---

## Iteración 1: Implementar el endpoint `/api/expenses`

**Objetivo:** Devolver la lista de todos los gastos.

- El endpoint debe estar en la ruta `/api/expenses` y responder a peticiones GET.
- Debe leer el fichero `expenses.json` y devolver su contenido como un array JSON.
- Usa `res.json()` para enviar la respuesta.

**Ejemplo de respuesta esperada:**
```json
[
  { "id": 1, "description": "Supermarket shopping", "amount": 45.9, "category": "Food" },
  ...
]
```
**Pista:** Utiliza la función `readExpenses()` ya implementada en `index.js` para leer y devolver el array de gastos.

> Implementa el endpoint en el lugar indicado en `index.js`. Cuando termines, podrás probarlo accediendo a `http://localhost:3000/api/expenses` desde tu navegador o usando una herramienta como [Thunderclient](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client) o curl.

---

## Iteración 1b: Implementar el endpoint `/api/categories`

**Objetivo:** Devolver la lista de categorías válidas.

- El endpoint debe estar en la ruta `/api/categories` y responder a peticiones GET.
- Debe devolver un array de strings con las categorías.

**Ejemplo de respuesta esperada:**
```json
["Food", "Leisure", "Electronics", "Utilities", "Clothing", "Health", "Other"]
```

**Pista:** Devuelve directamente el array `categories` ya definido en `index.js` usando `res.json(categories)`.

---

## Iteración 2: Implementar el endpoint `POST /api/expenses`

**Objetivo:** Añadir un nuevo gasto.

- El endpoint debe estar en la ruta `/api/expenses` y responder a peticiones POST.
- Debe recibir un objeto JSON con los campos `description`, `amount` y `category`.
- Debe añadir el gasto al array y guardarlo en el fichero. Abre el fichero _expenses.json_ para verificar que se ha añadido el nuevo gasto.
- Devuelve el objeto creado (incluyendo el id).

**Ejemplo de body:**
```json
{
  "description": "Book",
  "amount": 20,
  "category": "Leisure"
}
```

**Ejemplo de respuesta esperada:**
```json
{ "id": 5, "description": "Book", "amount": 20, "category": "Leisure" }
```

**Errores:**
- Si falta algún campo, responde con status `400` y `{ "error": "All fields are required" }`.
- Si algún campo es inválido, responde con status `400` e indicando el campo inválido (ver pantallazo más abajo)
- Si la categoría no es válida, responde con status `400` y `{ "error": "Invalid category" }`.

**Pista:**
- Usa la función `readExpenses()` para obtener el array actual de gastos.
- Usa la función `getNextId(expenses)` para calcular el siguiente id.
- Valida que la categoría esté en el array `categories`.
- Añade el nuevo gasto al array y guarda con `saveExpenses(expenses)`.

### ¿Cómo probar este endpoint?

No puedes usar el navegador para hacer una petición POST, PUT o DELETE. Necesitas un plugin como [Thunderclient](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client)

### Ejemplo POST correcto

![Post OK](https://oscarm.tinytake.com/media/176e2b1?filename=1748528867096_TinyTake29-05-2025-04-27-16_638841256611451423.png&sub_type=thumbnail_preview&type=attachment&width=1199&height=425)

### Ejemplo de POST incorrecto

![Post KO](https://oscarm.tinytake.com/media/176e2c2?filename=1748529282392_TinyTake29-05-2025-04-34-17_638841260803441012.png&sub_type=thumbnail_preview&type=attachment&width=1198&height=427)

---

## Iteración 3: Implementar el endpoint `PUT /api/expenses/:id`

**Objetivo:** Modificar un gasto existente.

- El endpoint debe estar en la ruta `/api/expenses/:id` y responder a peticiones PUT.
- Debe recibir un objeto JSON con los campos a modificar.
- Devuelve el objeto actualizado.

**Ejemplo de body:**
```json
{
  "description": "Book Updated",
  "amount": 25,
  "category": "Leisure"
}
```

**Ejemplo de respuesta esperada:**
```json
{ "id": 1, "description": "Book Updated", "amount": 25, "category": "Leisure" }
```

**Errores:**
- Si el id del gasto no existe, responde con status `404` y `{ "error": "Expense not found" }`.
- Si los datos son inválidos, responde con status `400`.

**Pista:**
- Usa `readExpenses()` para obtener el array.
- Busca el gasto por id usando el método de array _find_.
- Actualiza solo los campos enviados.
- Guarda el array actualizado con `saveExpenses(expenses)`.

---

## Iteración 4: Implementar el endpoint `DELETE /api/expenses/:id`

**Objetivo:** Eliminar un gasto por id.

- El endpoint debe estar en la ruta `/api/expenses/:id` y responder a peticiones DELETE.
- Devuelve `{ "success": true }` si se elimina correctamente.

**Ejemplo de respuesta esperada:**
```json
{ "success": true }
```

**Errores:**
- Si el gasto no existe, responde con status `404` y `{ "error": "Expense not found" }`.

**Pista:**
- Usa `readExpenses()` para obtener el array.
- Filtra el array para eliminar el gasto con el id indicado.
- Guarda el array actualizado con `saveExpenses(updatedExpenses)`.

---

## Iteración 5: Implementar el endpoint `/api/expenses/summary`

**Objetivo:** Devolver el total gastado.

- El endpoint debe estar en la ruta `/api/expenses/summary` y responder a peticiones GET.
- Devuelve un objeto con el total gastado.

**Ejemplo de respuesta esperada:**
```json
{ "total": 123.45 }
```

**Errores:**
- Si se accede a una ruta inexistente, responde con status `404` y `{ "error": "Not found" }`.

**Pista:**
- Usa `readExpenses()` para obtener el array.
- Suma el campo `amount` de todos los gastos usando el método de array `reduce`.

---

## Iteración 6

Abre ahora la aplicación Web que consume esta API en http://localhost:3000. Si has implementado correctamente todos los endpoints, esta debería ser enteramente funcional.

![](https://oscarm.tinytake.com/media/176e31b?filename=1748531009198_TinyTake29-05-2025-05-03-24_638841278069784140.png&sub_type=thumbnail_preview&type=attachment&width=1198&height=635)

## Errores y Seguridad

- Si se accede a una ruta inexistente, responde con status `404` y `{ "error": "Not found" }`.
- Valida siempre los datos recibidos del cliente.

---
