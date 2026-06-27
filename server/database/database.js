const Database = require('better-sqlite3');
const path = require('path');

// 创建数据库连接
const dbPath = path.join(__dirname, '..', 'data', 'appointments.db');
const db = new Database(dbPath);

// 启用外键约束
db.pragma('foreign_keys = ON');

// 创建预约表
const createTable = db.prepare(`
    CREATE TABLE IF NOT EXISTS appointments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        email TEXT,
        appointment_date TEXT NOT NULL,
        message TEXT,
        status TEXT DEFAULT 'pending',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`);

createTable.run();

// 创建索引
const createIndex = db.prepare(`
    CREATE INDEX IF NOT EXISTS idx_appointment_date ON appointments(appointment_date)
`);
createIndex.run();

const createIndex2 = db.prepare(`
    CREATE INDEX IF NOT EXISTS idx_status ON appointments(status)
`);
createIndex2.run();

console.log('数据库初始化完成');

module.exports = db;