export interface Appointment {
    id: string;
    patient_id?: string;
    doctor_name: string;
    specialty: string;
    date: string;
    time: string;
    type: 'Clinic Visit' | 'Telemedicine';
    status: 'Scheduled' | 'Completed' | 'Cancelled';
}

export interface LabResult {
    id: string;
    name: string;
    date: string;
    status: 'Normal' | 'Review' | 'Critical';
    result_details?: string;
}

export interface MedicalHistory {
    id: string;
    title: string;
    date: string;
    doctor: string;
    type: 'Consultation' | 'Surgery' | 'Exam' | 'Emergency';
    notes?: string;
}

export interface Prescription {
    id: string;
    name: string;
    dosage: string;
    frequency: string;
    status: 'Active' | 'Refill Soon' | 'Completed';
    daysLeft: number;
}

export interface Patient {
    id: string;
    name: string;
    email: string;
    phone: string;
    dob: string;
    gender: string;
    bloodType: string;
    image: string;
    lastVisit: string;
    status: 'Active' | 'Inactive';
    allergies: string[];
    history: MedicalHistory[];
    prescriptions: Prescription[];
    labs: LabResult[];
    appointments?: Appointment[];
}

export interface DoctorSchedule {
    id: string;
    doctor_id: string;
    day_of_week: number;
    start_time: string;
    end_time: string;
    type: 'Clinic Visit' | 'Telemedicine';
}

export interface DoctorTimeOff {
    id: string;
    doctor_id: string;
    start_date: string;
    end_date: string;
    reason: string;
    status: string;
}

export interface LabRequest {
    id: string;
    patient_id: string;
    patient_name: string;
    doctor_id: string;
    test_name: string;
    priority: string;
    status: string;
    request_date: string;
}

export const mockPatients: Patient[] = [
    {
        id: 'PAT-1001',
        name: 'Sophia Martinez',
        email: 'sophia.m@example.com',
        phone: '+1 (555) 123-4567',
        dob: '1992-05-15',
        gender: 'Female',
        bloodType: 'A+',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
        lastVisit: 'Oct 12, 2024',
        status: 'Active',
        allergies: ['Penicillin', 'Peanuts'],
        history: [
            { id: 'h1', title: 'Annual Physical', date: 'Oct 12, 2024', doctor: 'Dr. Michael Chen', type: 'Exam', notes: 'Overall healthy, blood pressure slightly elevated.' },
            { id: 'h2', title: 'Flu Symptoms', date: 'Jan 15, 2024', doctor: 'Dr. Sarah Smith', type: 'Consultation', notes: 'Prescribed rest and fluids.' }
        ],
        prescriptions: [
            { id: 'p1', name: 'Amoxicillin', dosage: '500mg', frequency: 'Twice daily', status: 'Active', daysLeft: 5 },
            { id: 'p2', name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', status: 'Active', daysLeft: 22 }
        ],
        labs: [
            { id: 'l1', name: 'Full Blood Count', date: 'Oct 10, 2024', status: 'Normal' },
            { id: 'l2', name: 'Lipid Panel', date: 'Oct 10, 2024', status: 'Review' }
        ]
    }
];

export const mockDoctorSchedules: DoctorSchedule[] = [
    { id: 'ds1', doctor_id: 'DOC-1', day_of_week: 1, start_time: '09:00', end_time: '14:00', type: 'Clinic Visit' },
    { id: 'ds2', doctor_id: 'DOC-1', day_of_week: 1, start_time: '15:00', end_time: '18:00', type: 'Telemedicine' },
    { id: 'ds3', doctor_id: 'DOC-1', day_of_week: 2, start_time: '09:00', end_time: '17:00', type: 'Clinic Visit' }
];

export const mockLabRequests: LabRequest[] = [
    { id: 'lr1', patient_id: 'PAT-1001', patient_name: 'Sophia Martinez', doctor_id: 'DOC-1', test_name: 'MRI Brain Scan', priority: 'Urgent', status: 'Pending', request_date: '2024-10-24' },
    { id: 'lr2', patient_id: 'PAT-1002', patient_name: 'James Wilson', doctor_id: 'DOC-1', test_name: 'Thyroid Function', priority: 'Normal', status: 'Completed', request_date: '2024-10-22' }
];

export const MOCK_DATABASE: { patients: Patient[] } = {
    patients: [
        {
            id: 'PAT-1001',
            name: 'Sophia Martinez',
            email: 'sophia.m@example.com',
            phone: '+1 (555) 123-4567',
            dob: '1992-05-15',
            gender: 'Female',
            bloodType: 'A+',
            image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
            lastVisit: 'Oct 12, 2024',
            status: 'Active',
            allergies: ['Penicillin', 'Peanuts'],
            history: [
                {
                    id: 'H-1',
                    title: 'Migraine Follow-up',
                    date: 'Oct 12, 2024',
                    doctor: 'Dr. Michael Chen',
                    type: 'Consultation',
                    notes: 'Patient reported decreased frequency of migraines. Continued current treatment plan.'
                },
                {
                    id: 'H-2',
                    title: 'Annual Physical Exam',
                    date: 'Nov 15, 2023',
                    doctor: 'Dr. Sarah Jenkins',
                    type: 'Exam',
                    notes: 'All vitals normal. Recommended lipid panel update.'
                }
            ],
            prescriptions: [
                {
                    id: 'RX-1',
                    name: 'Amoxicillin',
                    dosage: '500mg',
                    frequency: '2x daily after meals',
                    status: 'Active',
                    daysLeft: 14
                },
                {
                    id: 'RX-2',
                    name: 'Lisinopril',
                    dosage: '10mg',
                    frequency: '1x daily morning',
                    status: 'Refill Soon',
                    daysLeft: 3
                }
            ],
            labs: [
                { 
                    id: 'L-1', 
                    name: 'Comprehensive Metabolic Panel', 
                    date: 'Oct 15, 2024', 
                    status: 'Normal',
                    result_details: 'Glucose: 92 mg/dL (Normal: 70-99). BUN: 14 mg/dL (Normal: 7-20). Creatinine: 0.9 mg/dL (Normal: 0.6-1.2).'
                },
                { 
                    id: 'L-2', 
                    name: 'Lipid Panel', 
                    date: 'Oct 15, 2024', 
                    status: 'Review',
                    result_details: 'Total Cholesterol: 210 mg/dL (High). LDL: 135 mg/dL (Borderline High). HDL: 45 mg/dL (Normal).'
                }
            ]
        },
        {
            id: 'PAT-1002',
            name: 'James Wilson',
            email: 'j.wilson@example.com',
            phone: '+1 (555) 832-1192',
            dob: '1985-11-23',
            gender: 'Male',
            bloodType: 'A-',
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
            lastVisit: 'Sep 05, 2024',
            status: 'Active',
            allergies: ['Sulfa Drugs'],
            appointments: [],
            history: [
                {
                    id: 'H-3',
                    title: 'Orthopedic Consultation',
                    date: 'Sep 05, 2024',
                    doctor: 'Dr. Emily Parker',
                    type: 'Consultation',
                    notes: 'Mild osteoarthritis in right knee. Prescribed PT.'
                }
            ],
            prescriptions: [
                {
                    id: 'RX-3',
                    name: 'Ibuprofen',
                    dosage: '400mg',
                    frequency: 'As needed for pain',
                    status: 'Active',
                    daysLeft: 30
                }
            ],
            labs: [
                { id: 'L-4', name: 'X-Ray Right Knee', date: 'Sep 05, 2024', status: 'Normal' }
            ]
        },
        {
            id: 'PAT-1003',
            name: 'Elena Rodriguez',
            email: 'elena.r@example.com',
            phone: '+1 (555) 443-9021',
            dob: '1978-08-09',
            gender: 'Female',
            bloodType: 'B+',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200',
            lastVisit: 'Oct 20, 2024',
            status: 'Active',
            allergies: [],
            appointments: [],
            history: [
                {
                    id: 'H-4',
                    title: 'Cardiology Checkup',
                    date: 'Oct 20, 2024',
                    doctor: 'Dr. Lisa Torres',
                    type: 'Exam',
                    notes: 'BP slightly elevated. Monitoring required.'
                }
            ],
            prescriptions: [
                {
                    id: 'RX-4',
                    name: 'Metoprolol',
                    dosage: '25mg',
                    frequency: '1x daily',
                    status: 'Active',
                    daysLeft: 60
                }
            ],
            labs: [
                { id: 'L-5', name: 'EKG', date: 'Oct 20, 2024', status: 'Review' }
            ]
        }
    ]
};
