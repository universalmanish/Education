import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

import * as schema from "@/db/schema"

const sql = neon("postgresql://origin_owner:Cwl2qj3ZRUmK@ep-wandering-boat-a1q0al4l.ap-southeast-1.aws.neon.tech/origin?sslmode=require");
//@ts-ignore
const db = drizzle(sql, {schema});

export default db;
