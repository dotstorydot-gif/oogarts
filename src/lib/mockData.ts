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

export interface LabResult {
    id: string;
    name: string;
    date: string;
    status: 'Normal' | 'Review' | 'Critical';
}

export const MOCK_DATABASE: { patients: Patient[] } = {
    patients: [
        {
            id: 'PAT-1001',
            name: 'Sophia Martinez',
            email: 'sophia.m@example.com',
            phone: '+1 (555) 019-2834',
            dob: '1992-04-15',
            gender: 'Female',
            bloodType: 'O+',
            image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
            lastVisit: 'Oct 12, 2024',
            status: 'Active',
            allergies: ['Penicillin', 'Peanuts'],
            history: [
                {
                    id: 'H-1',
                    title: 'Comprehensive Neurology Follow-up',
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
                { id: 'L-1', name: 'Comprehensive Metabolic Panel', date: 'Oct 15, 2024', status: 'Normal' },
                { id: 'L-2', name: 'Lipid Panel', date: 'Oct 15, 2024', status: 'Review' },
                { id: 'L-3', name: 'CBC with Differential', date: 'Oct 15, 2024', status: 'Normal' }
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
