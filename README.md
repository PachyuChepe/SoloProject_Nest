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

<br><br><br>

### API 명세서

<br><br><br>

### ERD cloud

[![erd Label](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FkPLBX%2FbtsCK9Y5htv%2Fv8wkTYUAP8wC4ksqpMjFkk%2Fimg.png)](https://www.erdcloud.com/d/XM3YguKYdCzXNBdQz)

<br><br><br>
