import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

import * as schema from "@/db/schema"

const sql = neon("postgresql://Education_owner:0knUDgwEhb7i@ep-silent-dew-a12p8zb6.ap-southeast-1.aws.neon.tech/Education?sslmode=require");
//@ts-ignore
const db = drizzle(sql, {schema});

export default db;
