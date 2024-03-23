import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

import * as schema from "@/db/schema"

const sql = neon("postgresql://neww_owner:cpmsvbU8igG0@ep-jolly-bird-a1ehvff0.ap-southeast-1.aws.neon.tech/neww?sslmode=require");
//@ts-ignore
const db = drizzle(sql, {schema});

export default db;
