# full-stack-assessment

## Backend

Built with:
- Mongoose
- Express
- Swagger
- [JSDOM](https://www.npmjs.com/package/jsdom)

Data is stored in a MongoDB database provided by [Mongo Atlas](https://www.mongodb.com/atlas)

Deployed on [Railway](https://railway.app?referralCode=Ri5XbE) and available at: https://koombea-backend.jahir.dev

Environment variables:
```bash
DATABASE_URL=mongodb+srv://<user>:<password>@<url>.mongodb.net/?retryWrites=true&w=majority
```

## Frontend

Built with:
- ReactJS
- Vite
- CSS Modules
- [New CSS](https://newcss.net/)

Deployed on [Vercel](https://vercel.com) and available at: https://koombea-frontend.jahir.dev

Environment variables:
```bash
VITE_BACKEND_URL=https://koombea-backend.jahir.dev
```

## Both
Both projects were built using NodeJS v16, yarn, TypeScript and eslint.
