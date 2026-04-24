import { createClient } from '@supabase/supabase-js';
import { MOCK_DATABASE } from './mockData';
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables from the root .env file
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
}

// We MUST use the service_role key to bypass RLS when seeding
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

async function seed() {
    console.log('Starting database seed...');

    const { patients } = MOCK_DATABASE;

    for (const patient of patients) {
        console.log(`Seeding patient: ${patient.name}`);

        // Insert patient
        const { error: patientError } = await supabaseAdmin
            .from('patients')
            .upsert({
                id: patient.id,
                name: patient.name,
                email: patient.email,
                phone: patient.phone,
                dob: patient.dob,
                gender: patient.gender,
                blood_type: patient.bloodType,
                image: patient.image,
                last_visit: patient.lastVisit,
                status: patient.status,
                allergies: patient.allergies
            });

        if (patientError) {
            console.error(`Failed to insert patient ${patient.name}:`, patientError);
            continue;
        }

        // Insert History
        if (patient.history && patient.history.length > 0) {
            const historyData = patient.history.map(h => ({
                id: h.id,
                patient_id: patient.id,
                title: h.title,
                date: h.date,
                doctor: h.doctor,
                type: h.type,
                notes: h.notes
            }));
            const { error: histError } = await supabaseAdmin.from('medical_history').upsert(historyData);
            if (histError) console.error(`Failed to insert history for ${patient.name}:`, histError);
        }

        // Insert Prescriptions
        if (patient.prescriptions && patient.prescriptions.length > 0) {
            const rxData = patient.prescriptions.map(rx => ({
                id: rx.id,
                patient_id: patient.id,
                name: rx.name,
                dosage: rx.dosage,
                frequency: rx.frequency,
                status: rx.status,
                days_left: rx.daysLeft
            }));
            const { error: rxError } = await supabaseAdmin.from('prescriptions').upsert(rxData);
            if (rxError) console.error(`Failed to insert prescriptions for ${patient.name}:`, rxError);
        }

        // Insert Labs
        if (patient.labs && patient.labs.length > 0) {
            const labData = patient.labs.map(lab => ({
                id: lab.id,
                patient_id: patient.id,
                name: lab.name,
                date: lab.date,
                status: lab.status
            }));
            const { error: labError } = await supabaseAdmin.from('lab_results').upsert(labData);
            if (labError) console.error(`Failed to insert labs for ${patient.name}:`, labError);
        }
    }

    console.log('Seeding complete!');
}

seed().catch(console.error);
