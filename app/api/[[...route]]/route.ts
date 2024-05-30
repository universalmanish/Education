import db from '@/db/drizzle';
import { subject } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { ilike } from 'drizzle-orm';

export const runtime = 'edge';

const app = new Hono().basePath('/api')


app.get('/1', async (c) => {
  const query = c.req.query('q');
  if (!query) {
    return c.json({ message: 'Query parameter is missing' }, 400);
  }
  try {
    const data = await db.query.subject.findMany({
      where: (subject, { ilike }) => ilike(subject.title, `%${query}%`),
    });
     return c.json(data)
  } catch (error) {
    console.error('Error searching the database:', error);
    return c.json({ message: 'Internal Server Error' }, 500);
  }
});

app.get('/2', async (c) => {
  const query = c.req.query('q');
  if (!query) {
    return c.json({ message: 'Query parameter is missing' }, 400);
  }
  try {
    const data = await db.query.branch.findMany({
      where: (branch, { ilike }) => ilike(branch.title, `%${query}%`),
    });
     return c.json(data)
  } catch (error) {
    console.error('Error searching the database:', error);
    return c.json({ message: 'Internal Server Error' }, 500);
  }
});


export const GET = handle(app)
export const POST = handle(app)