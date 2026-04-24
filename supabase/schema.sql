-- Enable Storage
INSERT INTO storage.buckets (id, name, public) 
VALUES ('medical-records', 'medical-records', false)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies
CREATE POLICY "Allow authenticated users to upload medical records"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'medical-records');

CREATE POLICY "Allow users to view their own medical records"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'medical-records');

-- Create patients table
CREATE TABLE IF NOT EXISTS patients (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  dob DATE,
  gender TEXT,
  blood_type TEXT,
  image TEXT,
  last_visit TEXT,
  status TEXT,
  allergies TEXT[]
);

-- Create medical_history table
CREATE TABLE IF NOT EXISTS medical_history (
  id TEXT PRIMARY KEY,
  patient_id TEXT REFERENCES patients(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  doctor TEXT NOT NULL,
  type TEXT NOT NULL,
  notes TEXT
);

-- Create prescriptions table
CREATE TABLE IF NOT EXISTS prescriptions (
  id TEXT PRIMARY KEY,
  patient_id TEXT REFERENCES patients(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  dosage TEXT NOT NULL,
  frequency TEXT NOT NULL,
  status TEXT NOT NULL,
  days_left INTEGER NOT NULL
);

-- Create lab_results table
CREATE TABLE IF NOT EXISTS lab_results (
  id TEXT PRIMARY KEY,
  patient_id TEXT REFERENCES patients(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  date TEXT NOT NULL,
  status TEXT NOT NULL
);

-- RLS Policies
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE medical_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE prescriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE lab_results ENABLE ROW LEVEL SECURITY;

-- Development: Allow anon/authenticated full access for demo purposes
-- (In a production HIPAA app, these would be restricted by user_id)
CREATE POLICY "Public Read Access" ON patients FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON medical_history FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON prescriptions FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON lab_results FOR SELECT USING (true);

-- Allow service role / authenticated to insert/update
CREATE POLICY "Full Access for Authenticated" ON patients FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Full Access for Authenticated" ON medical_history FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Full Access for Authenticated" ON prescriptions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Full Access for Authenticated" ON lab_results FOR ALL USING (true) WITH CHECK (true);
