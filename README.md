# Notice Board Application

A full-stack Notice Board application built as part of the Reno Platforms Web Development Assignment.

## 🚀 Live Demo

**Application:** https://reno-assignment-cyan.vercel.app/

## 📂 Repository

**GitHub:** https://github.com/Ahmad-Salik/reno-assignment.git

---

## Features

- Create notices
- View all notices
- Edit existing notices
- Delete notices with confirmation
- Responsive UI for desktop and mobile
- Server-side validation
- Urgent notices displayed first using Prisma `orderBy`
- RESTful API using Next.js API Routes
- Data persisted using Prisma ORM and MySQL

---

## Tech Stack

- Next.js (Pages Router)
- React
- Prisma ORM
- MySQL (TiDB Cloud)
- Tailwind CSS
- Vercel

---

## Project Structure

```
.
├── components/
├── lib/
├── pages/
│   ├── api/
│   ├── notice/
│   └── index.js
├── prisma/
│   └── schema.prisma
├── public/
├── styles/
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- MySQL / TiDB Cloud database

### Installation

Clone the repository:

```bash
git clone https://github.com/Ahmad-Salik/reno-assignment.git
```

Navigate into the project:

```bash
cd reno-assignment
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
DATABASE_URL="your_database_connection_string"
```

Generate Prisma Client:

```bash
npx prisma generate
```

Push the schema to your database:

```bash
npx prisma db push
```

Run the development server:

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/notices` | Fetch all notices |
| GET | `/api/notices/[id]` | Fetch a single notice |
| POST | `/api/notices` | Create a notice |
| PUT | `/api/notices/[id]` | Update a notice |
| DELETE | `/api/notices/[id]` | Delete a notice |

---

## Database Schema

```prisma
model Notice {
  id          Int      @id @default(autoincrement())
  title       String
  body        String   @db.Text
  category    String
  priority    String
  publishDate DateTime
  image       String?
  createdAt   DateTime @default(now())
}
```

---

## Validation

Server-side validation is implemented for:

- Required title
- Required body
- Valid publish date
- Appropriate HTTP status codes

---

## Deployment

The application is deployed on Vercel.

Live URL:

https://reno-assignment-cyan.vercel.app/

---

## Future Improvements

Given more time, I would add:

- Authentication and authorization
- Image upload support using cloud storage
- Search and filtering
- Pagination
- Rich text editor for notices
- Unit and integration tests
- Better error handling and logging

---

## AI Usage

AI tools (GitHub Copilot and ChatGPT) were used to assist with:

- Project scaffolding
- Code suggestions
- Debugging Prisma and deployment issues
- README preparation

All generated code was reviewed, modified, tested, and integrated manually.

---

## Author

**Ahmad Salik**

GitHub: https://github.com/Ahmad-Salik
