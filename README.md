### 프로젝트 파일구조

```
SoloProject_Nest/
├── 📁 src/                                  # 소스 코드 폴더
│   ├── 📁 config/                           # 환경 설정 관련 파일들
│   │   └── 📁 redis/                        # Redis 설정 관련 모듈
│   │       ├── 📄 redis.module.ts
│   │       └── 📄 redis.service.ts
│   ├── 📁 auth/                             # 인증 관련 모듈
│   │   ├── 📁 dto/                          # 데이터 전송 객체
│   │   │   └── 📄 login-user.dto.ts
│   │   ├── 📁 guard/                        # 인증 가드
│   │   │   ├── 📄 jwt-auth.guard.ts
│   │   │   └── 📄 local-auth.guard.ts
│   │   ├── 📁 strategy/                     # 인증 전략
│   │   │   ├── 📄 jwt.strategy.ts
│   │   │   └── 📄 local.strategy.ts
│   │   ├── 📄 auth.controller.ts
│   │   ├── 📄 auth.module.ts
│   │   └── 📄 auth.service.ts
│   ├── 📁 user/                             # 사용자 관련 모듈
│   │   ├── 📁 dto/
│   │   │   ├── 📄 create-user.dto.ts
│   │   │   └── 📄 update-user.dto.ts
│   │   ├── 📄 user.entity.ts
│   │   ├── 📄 user.module.ts
│   │   ├── 📄 user.service.ts
│   │   └── 📄 user.controller.ts
│   ├── 📁 performance/                      # 공연 관련 모듈
│   │   ├── 📁 dto/
│   │   │   └── 📄 create-performance.dto.ts
│   │   ├── 📄 performance.entity.ts
│   │   ├── 📄 performance.module.ts
│   │   ├── 📄 performance.service.ts
│   │   └── 📄 performance.controller.ts
│   ├── 📁 booking/                          # 예매 관련 모듈
│   │   ├── 📁 dto/
│   │   ├── 📄 booking.entity.ts
│   │   ├── 📄 booking.module.ts
│   │   ├── 📄 booking.service.ts
│   │   └── 📄 booking.controller.ts
│   ├── 📁 seat/                             # 좌석 관련 모듈
│   │   ├── 📁 dto/
│   │   ├── 📄 seat.entity.ts
│   │   ├── 📄 seat.module.ts
│   │   ├── 📄 seat.service.ts
│   │   └── 📄 seat.controller.ts
│   ├── 📄 app.module.ts
│   └── 📄 main.ts
├── 📄 .env                                  # 환경 변수 파일
├── 📄 .eslintrc.js                          # ESLint 설정 파일
├── 📄 .gitignore
├── 📄 .prettierrc                           # Prettier 설정 파일
├── 📄 cert.pem                              # HTTPS 인증서 파일
├── 📄 key.pem                               # HTTPS 키 파일
├── 📄 nest-cli.json                         # Nest CLI 설정 파일
├── 📄 nodemon.json                          # Nodemon 설정 파일
├── 📄 package-lock.json
├── 📄 package.json
├── 📄 README.md
├── 📄 tsconfig.build.json
├── 📄 tsconfig.json
└── 📁 test/                                 # 테스트 파일 폴더
    ├── 📄 app.e2e-spec.ts
    └── 📄 jest-e2e.json

```

<br><br><br>

### API 명세서

<br><br><br>

### ERD cloud

[![erd Label](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FkPLBX%2FbtsCK9Y5htv%2Fv8wkTYUAP8wC4ksqpMjFkk%2Fimg.png)](https://www.erdcloud.com/d/XM3YguKYdCzXNBdQz)

<br><br><br>
