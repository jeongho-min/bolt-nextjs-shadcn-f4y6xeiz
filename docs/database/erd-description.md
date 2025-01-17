# 병원 예약 시스템 ERD 설명

## User (사용자)

소셜 로그인 사용자 정보를 저장하는 테이블
| 필드 | 타입 | 설명 |
|------|------|------|
| id | uuid | 기본키 |
| email | string | 사용자 이메일 |
| name | string | 사용자 실명 |
| nickname | string | 사용자 닉네임 |
| profile_image | string | 프로필 이미지 URL |
| phone | string | 전화번호 |
| provider | enum | 소셜 로그인 제공자 (kakao/naver) |
| provider_id | string | 소셜 로그인 제공자의 고유 ID |
| created_at | timestamp | 생성일시 |
| updated_at | timestamp | 수정일시 |

## Reservation (예약)

회원 예약 정보를 저장하는 테이블
| 필드 | 타입 | 설명 |
|------|------|------|
| id | uuid | 기본키 |
| user_id | uuid | 예약자 ID (User 테이블 참조) |
| patient_name | string | 환자명 |
| phone | string | 연락처 |
| symptoms | string | 증상 |
| reservation_date | timestamp | 예약일시 |
| status | enum | 예약상태 (대기중/예약확정/진료완료/취소) |
| memo | text | 메모 |
| created_at | timestamp | 생성일시 |
| updated_at | timestamp | 수정일시 |

## NonMemberReservation (비회원 예약)

비회원 예약 정보를 저장하는 테이블
| 필드 | 타입 | 설명 |
|------|------|------|
| id | uuid | 기본키 |
| patient_name | string | 환자명 |
| phone | string | 연락처 |
| symptoms | string | 증상 |
| reservation_date | timestamp | 예약일시 |
| status | enum | 예약상태 (대기중/예약확정/진료완료/취소) |
| reservation_password | string | 예약 조회용 비밀번호 |
| memo | text | 메모 |
| created_at | timestamp | 생성일시 |
| updated_at | timestamp | 수정일시 |

## Department (진료과)

진료과 정보를 저장하는 테이블
| 필드 | 타입 | 설명 |
|------|------|------|
| id | uuid | 기본키 |
| name | string | 진료과명 |
| description | string | 진료과 설명 |
| is_active | boolean | 활성화 여부 |
| created_at | timestamp | 생성일시 |
| updated_at | timestamp | 수정일시 |

## Disease (질병)

질병 정보를 저장하는 테이블
| 필드 | 타입 | 설명 |
|------|------|------|
| id | uuid | 기본키 |
| name | string | 질병명 |
| description | string | 질병 설명 |
| symptoms | text | 증상 |
| causes | text | 원인 |
| treatments | text | 치료법 |
| image_url | string | 이미지 URL |
| is_active | boolean | 활성화 여부 |
| created_at | timestamp | 생성일시 |
| updated_at | timestamp | 수정일시 |

## Doctor (의사)

의사 정보를 저장하는 테이블
| 필드 | 타입 | 설명 |
|------|------|------|
| id | uuid | 기본키 |
| department_id | uuid | 소속 진료과 ID (Department 테이블 참조) |
| name | string | 의사명 |
| position | string | 직위 |
| specialties | string | 전문분야 |
| image_url | string | 프로필 이미지 URL |
| biography | text | 약력 |
| is_active | boolean | 활성화 여부 |
| created_at | timestamp | 생성일시 |
| updated_at | timestamp | 수정일시 |

## Schedule (진료 일정)

의사별 진료 일정을 저장하는 테이블
| 필드 | 타입 | 설명 |
|------|------|------|
| id | uuid | 기본키 |
| doctor_id | uuid | 의사 ID (Doctor 테이블 참조) |
| date | date | 진료 날짜 |
| start_time | time | 진료 시작 시간 |
| end_time | time | 진료 종료 시간 |
| max_patients | int | 최대 환자 수 |
| is_available | boolean | 예약 가능 여부 |
| created_at | timestamp | 생성일시 |
| updated_at | timestamp | 수정일시 |

## 테이블 관계

- User -(1:N)-> Reservation: 한 사용자는 여러 예약을 할 수 있음
- Department -(1:N)-> Doctor: 한 진료과는 여러 의사를 가질 수 있음
- Doctor -(1:N)-> Schedule: 한 의사는 여러 진료 일정을 가질 수 있음
- Department -(1:N)-> Disease: 한 진료과는 여러 질병을 다룰 수 있음
