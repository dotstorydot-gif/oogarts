import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vzrjhxzmidigicoyhuos.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6cmpoeHptaWRpZ2ljb3lodW9zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4MjU2OTMsImV4cCI6MjA4ODQwMTY5M30.yV6Em_5lONJ1yBm8z7Fq6humIbFLZmQ_PVvM8ShCb7Y'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
