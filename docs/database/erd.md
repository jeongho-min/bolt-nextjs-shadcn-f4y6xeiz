erDiagram
User {
uuid id PK
string email
string name
string nickname
string profile_image
string phone
enum provider "kakao/naver"
string provider_id
timestamp created_at
timestamp updated_at
}

    Reservation {
        uuid id PK
        uuid user_id FK
        string patient_name
        string phone
        string symptoms
        timestamp reservation_date
        enum status "대기중/예약확정/진료완료/취소"
        text memo
        timestamp created_at
        timestamp updated_at
    }

    Department {
        uuid id PK
        string name
        string description
        boolean is_active
        timestamp created_at
        timestamp updated_at
    }

    Disease {
        uuid id PK
        string name
        string description
        text symptoms
        text causes
        text treatments
        string image_url
        boolean is_active
        timestamp created_at
        timestamp updated_at
    }

    Doctor {
        uuid id PK
        uuid department_id FK
        string name
        string position
        string specialties
        string image_url
        text biography
        boolean is_active
        timestamp created_at
        timestamp updated_at
    }

    Schedule {
        uuid id PK
        uuid doctor_id FK
        date date
        time start_time
        time end_time
        int max_patients
        boolean is_available
        timestamp created_at
        timestamp updated_at
    }

    NonMemberReservation {
        uuid id PK
        string patient_name
        string phone
        string symptoms
        timestamp reservation_date
        enum status "대기중/예약확정/진료완료/취소"
        string reservation_password
        text memo
        timestamp created_at
        timestamp updated_at
    }

    User ||--o{ Reservation : makes
    Department ||--o{ Doctor : has
    Doctor ||--o{ Schedule : has
    Department ||--o{ Disease : treats
