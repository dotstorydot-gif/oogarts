import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase credentials missing. Ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.')
}

export const supabase = createClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder'
)

// Global database self-seeding routine to guarantee all mock data exists and parent-child relations are satisfied.
export const ensureDatabaseSeeded = async () => {
    try {
        console.log("Checking database lookup data...");

        // 1. Seed Specialties
        const { data: specs } = await supabase.from('specialties').select('id');
        if (!specs || specs.length === 0) {
            console.log("Seeding specialties...");
            await supabase.from('specialties').insert([
                { name: 'General Medicine', description: 'Primary care and general health checkups', icon: 'Stethoscope', doctor_count: 1 },
                { name: 'Cardiology', description: 'Heart and cardiovascular system', icon: 'Heart', doctor_count: 1 },
                { name: 'Neurology', description: 'Brain, spinal cord, and nervous system', icon: 'Brain', doctor_count: 1 },
                { name: 'Pediatrics', description: 'Medical care for infants and children', icon: 'Baby', doctor_count: 1 },
                { name: 'Orthopedics', description: 'Bones, joints, ligaments, tendons', icon: 'Bone', doctor_count: 1 },
                { name: 'Ophthalmology', description: 'Eye and vision care', icon: 'Eye', doctor_count: 1 }
            ]);
        }

        // 2. Seed Doctors
        const { data: docs } = await supabase.from('doctors').select('id');
        if (!docs || docs.length === 0) {
            console.log("Seeding doctors...");
            const defaultDocs = [
                { id: 'DOC-1', name: 'Dr. Sarah Jenkins', specialty: 'General Medicine', email: 'sarah.j@example.com', phone: '+1 (555) 987-6543', status: 'Active', image: 'https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=200' },
                { id: 'DOC-2', name: 'Dr. Michael Chen', specialty: 'Neurology', email: 'michael.c@example.com', phone: '+1 (555) 019-2834', status: 'Active', image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200' },
                { id: 'DOC-3', name: 'Dr. Emily Parker', specialty: 'Pediatrics', email: 'emily.p@example.com', phone: '+1 (555) 456-7890', status: 'Active', image: 'https://images.unsplash.com/photo-1594824432257-f67b5cbeb730?auto=format&fit=crop&q=80&w=200' },
                { id: 'DOC-4', name: 'Dr. James Wilson', specialty: 'Orthopedics', email: 'james.w@example.com', phone: '+1 (555) 321-0987', status: 'Active', image: 'https://images.unsplash.com/photo-1537368910025-7028a609b13c?auto=format&fit=crop&q=80&w=200' },
                { id: 'DOC-5', name: 'Dr. Lisa Torres', specialty: 'Cardiology', email: 'lisa.t@example.com', phone: '+1 (555) 123-9876', status: 'Active', image: 'https://images.unsplash.com/photo-1622253692010-333f2da60318?auto=format&fit=crop&q=80&w=200' },
                { id: 'DOC-6', name: 'Dr. Robert Kim', specialty: 'Ophthalmology', email: 'robert.k@example.com', phone: '+1 (555) 789-0123', status: 'Active', image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200' }
            ];
            for (const doc of defaultDocs) {
                await supabase.from('doctors').upsert(doc);
            }
        }

        // 3. Seed Patients
        const { data: pts } = await supabase.from('patients').select('id');
        if (!pts || pts.length === 0) {
            console.log("Seeding patients...");
            await supabase.from('patients').insert([
                {
                    id: 'PAT-1001',
                    name: 'Sophia Martinez',
                    email: 'sophia.m@example.com',
                    phone: '+1 (555) 123-4567',
                    dob: '1992-05-15',
                    gender: 'Female',
                    blood_type: 'A+',
                    status: 'Active',
                    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
                    last_visit: 'Oct 12, 2024'
                },
                {
                    id: 'PAT-1002',
                    name: 'James',
                    email: 'james@demo.io',
                    phone: '+1 (555) 987-6543',
                    dob: '1985-08-20',
                    gender: 'Male',
                    blood_type: 'O-',
                    status: 'Active',
                    image: 'https://ui-avatars.com/api/?name=James&background=random',
                    last_visit: 'Nov 04, 2024'
                }
            ]);

            // Seed Vitals
            await supabase.from('vitals').insert([
                { patient_id: 'PAT-1001', blood_pressure: '120/80', heart_rate: 72, temperature: 36.6, weight: 70, oxygen_sat: 98 },
                { patient_id: 'PAT-1002', blood_pressure: '135/85', heart_rate: 80, temperature: 37.1, weight: 82, oxygen_sat: 96 }
            ]);
        }

        // 4. Seed Inventory
        const { data: items } = await supabase.from('inventory').select('id');
        if (!items || items.length === 0) {
            console.log("Seeding inventory...");
            const defaultInventory = [
                { name: 'Surgical Gloves', category: 'Clinical Supplies', status: 'normal', stock: 1200, unit: 'Pairs', trend: '+12%' },
                { name: 'Syringes 5ml', category: 'Clinical Supplies', status: 'normal', stock: 800, unit: 'Units', trend: '-5%' },
                { name: 'Paracetamol 500mg', category: 'Pharmacy', status: 'normal', stock: 2500, unit: 'Tablets', trend: '+8%' },
                { name: 'Amoxicillin 250mg', category: 'Pharmacy', status: 'low', stock: 35, unit: 'Bottles', trend: '+15%' },
                { name: 'MRI Contrast Agent', category: 'Diagnostics', status: 'normal', stock: 120, unit: 'Vials', trend: '0%' },
                { name: 'Defibrillator Pads', category: 'Devices', status: 'low', stock: 12, unit: 'Sets', trend: '-20%' }
            ];
            await supabase.from('inventory').insert(defaultInventory);
        }

        // 5. Seed Appointments
        const { data: appts } = await supabase.from('appointments').select('id');
        if (!appts || appts.length === 0) {
            console.log("Seeding appointments...");
            await supabase.from('appointments').insert([
                {
                    id: `APP-101`,
                    patient_id: 'PAT-1001',
                    doctor_id: 'DOC-2',
                    doctor_name: 'Dr. Michael Chen',
                    specialty: 'Neurology',
                    date: new Date().toISOString().split('T')[0],
                    time: '10:00 AM',
                    type: 'Clinic Visit',
                    status: 'Scheduled'
                },
                {
                    id: `APP-102`,
                    patient_id: 'PAT-1002',
                    doctor_id: 'DOC-1',
                    doctor_name: 'Dr. Sarah Jenkins',
                    specialty: 'General Medicine',
                    date: new Date().toISOString().split('T')[0],
                    time: '11:30 AM',
                    type: 'Clinic Visit',
                    status: 'Scheduled'
                }
            ]);
        }

        // 6. Seed Lab Requests
        const { data: labs } = await supabase.from('lab_requests').select('id');
        if (!labs || labs.length === 0) {
            console.log("Seeding lab requests...");
            await supabase.from('lab_requests').insert([
                { patient_id: 'PAT-1001', doctor_id: 'DOC-2', test_name: 'Complete Blood Count (CBC)', priority: 'Normal', status: 'Pending' },
                { patient_id: 'PAT-1002', doctor_id: 'DOC-1', test_name: 'Lipid Panel', priority: 'Urgent', status: 'In Analysis' },
                { patient_id: 'PAT-1001', doctor_id: 'DOC-2', test_name: 'Thyroid Stimulating Hormone (TSH)', priority: 'Normal', status: 'Completed' }
            ]);
        }

        // 7. Seed Prescriptions
        const { data: rx } = await supabase.from('prescriptions').select('id');
        if (!rx || rx.length === 0) {
            console.log("Seeding prescriptions...");
            await supabase.from('prescriptions').insert([
                { id: `RX-1021`, patient_id: 'PAT-1001', name: 'Lisinopril 10mg', dosage: '1 tablet daily', frequency: 'Daily', status: 'Active', days_left: 30 },
                { id: `RX-2934`, patient_id: 'PAT-1002', name: 'Atorvastatin 20mg', dosage: '1 tablet nightly', frequency: 'Nightly', status: 'Active', days_left: 14 }
            ]);
        }

        console.log("Database self-seeding complete!");
    } catch (err) {
        console.error("Database seeding failed:", err);
    }
};
