-- Enable Storage
INSERT INTO storage.buckets (id, name, public) 
VALUES ('medical-records', 'medical-records', false)
ON CONFLICT (id) DO NOTHING;

-- Enable Storage
INSERT INTO storage.buckets (id, name, public) 
VALUES ('medical-records', 'medical-records', false)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies
DROP POLICY IF EXISTS "Allow authenticated users to upload medical records" ON storage.objects;
CREATE POLICY "Allow authenticated users to upload medical records"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'medical-records');

DROP POLICY IF EXISTS "Allow users to view their own medical records" ON storage.objects;
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
  status TEXT NOT NULL,
  result_details TEXT
);

-- Ensure column exists if table was already created
DO $$ 
BEGIN 
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='lab_results' AND column_name='result_details') THEN
    ALTER TABLE lab_results ADD COLUMN result_details TEXT;
  END IF;
END $$;

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id TEXT PRIMARY KEY,
  patient_id TEXT REFERENCES patients(id) ON DELETE CASCADE,
  doctor_name TEXT NOT NULL,
  specialty TEXT NOT NULL,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('Clinic Visit', 'Telemedicine')),
  status TEXT NOT NULL DEFAULT 'Scheduled',
  notes TEXT,
  prescribed_tests TEXT[]
);

-- Doctor Schedules
CREATE TABLE IF NOT EXISTS doctor_schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id TEXT NOT NULL,
  day_of_week INTEGER NOT NULL, -- 0-6
  start_time TEXT NOT NULL,
  end_time TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('Clinic Visit', 'Telemedicine')),
  is_active BOOLEAN DEFAULT true
);

-- Doctor Time Off
CREATE TABLE IF NOT EXISTS doctor_time_off (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  reason TEXT,
  status TEXT DEFAULT 'Approved'
);

-- Lab Requests
CREATE TABLE IF NOT EXISTS lab_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id TEXT REFERENCES patients(id) ON DELETE CASCADE,
  doctor_id TEXT NOT NULL,
  test_name TEXT NOT NULL,
  priority TEXT DEFAULT 'Normal',
  status TEXT DEFAULT 'Pending',
  request_date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE medical_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE prescriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE lab_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctor_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctor_time_off ENABLE ROW LEVEL SECURITY;
ALTER TABLE lab_requests ENABLE ROW LEVEL SECURITY;

-- Development: Allow anon/authenticated full access for demo purposes
DROP POLICY IF EXISTS "Public Read Access" ON patients;
CREATE POLICY "Public Read Access" ON patients FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Read Access" ON medical_history;
CREATE POLICY "Public Read Access" ON medical_history FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Read Access" ON prescriptions;
CREATE POLICY "Public Read Access" ON prescriptions FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Read Access" ON lab_results;
CREATE POLICY "Public Read Access" ON lab_results FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Read Access" ON appointments;
CREATE POLICY "Public Read Access" ON appointments FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Read Access" ON doctor_schedules;
CREATE POLICY "Public Read Access" ON doctor_schedules FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Read Access" ON doctor_time_off;
CREATE POLICY "Public Read Access" ON doctor_time_off FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Read Access" ON lab_requests;
CREATE POLICY "Public Read Access" ON lab_requests FOR SELECT USING (true);

-- Allow service role / authenticated to insert/update
DROP POLICY IF EXISTS "Full Access for Authenticated" ON patients;
CREATE POLICY "Full Access for Authenticated" ON patients FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Full Access for Authenticated" ON medical_history;
CREATE POLICY "Full Access for Authenticated" ON medical_history FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Full Access for Authenticated" ON prescriptions;
CREATE POLICY "Full Access for Authenticated" ON prescriptions FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Full Access for Authenticated" ON lab_results;
CREATE POLICY "Full Access for Authenticated" ON lab_results FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Full Access for Authenticated" ON appointments;
CREATE POLICY "Full Access for Authenticated" ON appointments FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Full Access for Authenticated" ON doctor_schedules;
CREATE POLICY "Full Access for Authenticated" ON doctor_schedules FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Full Access for Authenticated" ON doctor_time_off;
CREATE POLICY "Full Access for Authenticated" ON doctor_time_off FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Full Access for Authenticated" ON lab_requests;
CREATE POLICY "Full Access for Authenticated" ON lab_requests FOR ALL USING (true) WITH CHECK (true);
