### 프로젝트 파일구조

```
SoloProject_Nest/
├── src/
│   ├── config/                        # 환경 설정 파일
│   │   └── redis/
│   │       ├── redis.module.ts
│   │       └── redis.service.ts
│   ├── auth/                          # 인증 모듈
│   │   ├── dto/                       # 데이터 전송 객체
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   │   ├── auth.controller.ts
│   │   └── strategy/                  # 인증 전략
│   │       └── jwt.strategy.ts
│   ├── user/                          # 사용자 관련 모듈
│   │   ├── dto/
│   │   ├── user.entity.ts
│   │   ├── user.module.ts
│   │   ├── user.service.ts
│   │   └── user.controller.ts
│   ├── performance/                   # 공연 관련 모듈
│   │   ├── dto/
│   │   ├── performance.entity.ts
│   │   ├── performance.module.ts
│   │   ├── performance.service.ts
│   │   └── performance.controller.ts
│   ├── booking/                       # 예매 관련 모듈
│   │   ├── dto/
│   │   ├── booking.entity.ts
│   │   ├── booking.module.ts
│   │   ├── booking.service.ts
│   │   └── booking.controller.ts
│   ├── seat/                          # 좌석 관련 모듈
│   │   ├── dto/
│   │   ├── seat.entity.ts
│   │   ├── seat.module.ts
│   │   ├── seat.service.ts
│   │   └── seat.controller.ts
│   ├── app.module.ts
│   └── main.ts
├── .env                               # 환경 변수 파일
└── package.json
```
