// This script helps with setting up Supabase for the ClipperCuts application
// It can be used to create tables, policies, and seed data in Supabase

const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')
require('dotenv').config({ path: '.env.local' })

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Supabase URL and key must be set in .env.local file')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

// Function to read and execute SQL files
async function executeSqlFile(filePath) {
  try {
    const sql = fs.readFileSync(path.join(__dirname, filePath), 'utf8')
    console.log(`Executing ${filePath}...`)
    
    // Split the SQL file by semicolons to execute each statement separately
    const statements = sql
      .split(';')
      .map(statement => statement.trim())
      .filter(statement => statement.length > 0)
    
    for (const statement of statements) {
      const { error } = await supabase.rpc('exec_sql', { query: statement })
      
      if (error) {
        console.error(`Error executing statement: ${statement}`)
        console.error(error)
      }
    }
    
    console.log(`Successfully executed ${filePath}`)
  } catch (error) {
    console.error(`Error reading or executing ${filePath}:`, error)
  }
}

// Main function to run the setup
async function setup() {
  console.log('Starting Supabase setup for ClipperCuts...')
  
  // Execute SQL files in order
  await executeSqlFile('schema.sql')
  await executeSqlFile('policies.sql')
  await executeSqlFile('seed.sql')
  
  console.log('Setup complete!')
}

// Run the setup
setup().catch(error => {
  console.error('Setup failed:', error)
})
