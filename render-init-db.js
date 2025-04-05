import { Pool } from 'pg';
import { users, categories, badges } from './shared/schema.js';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import path from 'path';
import { fileURLToPath } from 'url';
import { createInsertSchema } from 'drizzle-zod';
import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const scryptAsync = promisify(scrypt);

async function hashPassword(password) {
  const salt = randomBytes(16).toString('hex');
  const buf = await scryptAsync(password, salt, 64);
  return `${buf.toString('hex')}.${salt}`;
}

async function main() {
  console.log('Starting database initialization...');
  
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL environment variable is not set');
    process.exit(1);
  }
  
  try {
    // Connect to the database
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    });
    
    const db = drizzle(pool);
    
    console.log('Connected to database');
    
    // Create tables if they don't exist
    console.log('Creating tables if they don\'t exist...');
    
    // Try to query users table to see if it exists
    try {
      await db.select().from(users).limit(1);
      console.log('Tables already exist, skipping creation');
    } catch (error) {
      console.log('Creating tables...');
      
      // Create tables
      await db.execute(`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL,
          bio TEXT,
          website_url TEXT,
          portfolio_url TEXT,
          programming_languages TEXT[],
          expertise TEXT[],
          avatar TEXT,
          reputation INTEGER,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        
        CREATE TABLE IF NOT EXISTS categories (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          description TEXT NOT NULL,
          color TEXT NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        
        CREATE TABLE IF NOT EXISTS badges (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL UNIQUE,
          description TEXT NOT NULL,
          color TEXT NOT NULL,
          icon TEXT NOT NULL,
          category TEXT NOT NULL,
          level INTEGER NOT NULL,
          reputation_points INTEGER NOT NULL,
          criteria JSONB NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        
        CREATE TABLE IF NOT EXISTS "session" (
          sid VARCHAR NOT NULL,
          sess JSON NOT NULL,
          expire TIMESTAMP(6) NOT NULL,
          CONSTRAINT "session_pkey" PRIMARY KEY (sid)
        );
      `);
      
      console.log('Tables created successfully');
      
      // Seed initial data
      console.log('Seeding initial data...');
      
      // Create admin user
      const adminPassword = await hashPassword('admin123');
      await db.insert(users).values({
        name: 'Admin User',
        email: 'admin@devquest.com',
        password: adminPassword,
        bio: 'DevQuest administrator',
        reputation: 100,
        createdAt: new Date()
      });
      
      // Seed categories
      const defaultCategories = [
        { name: "JavaScript", description: "Discussions about JavaScript language and ecosystem", color: "#f7df1e" },
        { name: "Python", description: "Python programming language discussions", color: "#306998" },
        { name: "React", description: "React.js framework discussions", color: "#61dafb" },
        { name: "DevOps", description: "DevOps practices and tools", color: "#6c5ce7" },
        { name: "Database", description: "Database systems and design", color: "#e74c3c" },
        { name: "Security", description: "Security concepts and best practices", color: "#f39c12" }
      ];
      
      for (const category of defaultCategories) {
        await db.insert(categories).values({
          ...category,
          createdAt: new Date()
        });
      }
      
      // Seed badges
      const defaultBadges = [
        { 
          name: "Newcomer", 
          description: "Welcome to the community!", 
          category: "account", 
          level: 1, 
          icon: "UserPlus", 
          color: "#4CAF50",
          criteria: JSON.stringify({
            type: "join",
            threshold: 1
          }),
          reputationPoints: 5
        },
        { 
          name: "First Post", 
          description: "Share your first post", 
          category: "participation", 
          level: 1, 
          icon: "MessageSquare", 
          color: "#2196F3",
          criteria: JSON.stringify({
            type: "posts",
            threshold: 1
          }),
          reputationPoints: 5
        }
      ];
      
      for (const badge of defaultBadges) {
        await db.insert(badges).values({
          ...badge,
          createdAt: new Date()
        });
      }
      
      console.log('Initial data seeded successfully');
    }
    
    console.log('Database initialization completed successfully');
    await pool.end();
    
  } catch (error) {
    console.error('Database initialization failed:', error);
    process.exit(1);
  }
}

main();