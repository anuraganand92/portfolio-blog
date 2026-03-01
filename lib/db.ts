import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'lib', 'db.json');

type DbSchema = {
    likes: Record<string, number>;
    hits: Record<string, number>;
    subscribers: string[];
};

export function getDb(): DbSchema {
    if (!fs.existsSync(dbPath)) {
        saveDb({ likes: {}, hits: {}, subscribers: [] });
    }
    const data = fs.readFileSync(dbPath, 'utf8');
    try {
        return JSON.parse(data);
    } catch (e) {
        return { likes: {}, hits: {}, subscribers: [] };
    }
}

export function saveDb(data: DbSchema) {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}
