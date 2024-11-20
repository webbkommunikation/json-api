### 1

1. Ladda ner Postman (https://www.postman.com/downloads/)
2. Se om du kan få ett svar från https://api.sampleapis.com/beers/ale via Postman
3. Klona ner detta repo https://github.com/grundlaggande-javascript/json-api och öppna det i VSCode. Bry dig inte om koden i själva repot.
4. Ladda ner Node (https://nodejs.org/en/download/prebuilt-installer). Se till att starta om datorn efteråt.
5. Kör `npm install`
6. Kör `node server.js`
7. Kör sedan följande endpoints i Postman och se till att du förstår vad som händer med filen `products.json`

- **GET /products**  
   - Retrieve all products.

- **GET /products/:id**  
   - Retrieve a single product by ID.

- **POST /products**  
   - Add a new product with validation.

- **PUT /products/:id**  
   - Update an existing product by ID with validation.

- **DELETE /products/:id**  
   - Delete a product by ID.