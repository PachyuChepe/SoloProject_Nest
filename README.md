### 배포 링크

https://www.vitahub.site

<br><br><br>

### 프로젝트 파일구조

```
SoloProject_Nest/
├── 📁 api-docs/                             # API 문서
│ └── 📄 user.http
├── 📁 dist/                                 # [.gitignore] 빌드 파일
├── 📁 node_modules/                         # [.gitignore] 노드 모듈
├── 📁 public/                               # 클라이언트
│ └── 📄 index.html
├── 📁 src/                                  # 소스코드
│ ├── 📁 auth/                               # 인증 관련 모듈
│ │ ├── 📄 auth.controller.ts
│ │ ├── 📄 auth.module.ts
│ │ ├── 📄 auth.service.ts
│ │ ├── 📁 dto/                              # 데이터 전송 객체
│ │ │ └── 📄 login-user.dto.ts
│ │ ├── 📁 guard/                            # 가드 (인증 절차)
│ │ │ ├── 📄 jwt-auth.guard.ts
│ │ │ └── 📄 local-auth.guard.ts
│ │ └── 📁 strategy/                         # 인증 전략
│ │ ├── 📄 jwt.strategy.ts
│ │ └── 📄 local.strategy.ts
│ ├── 📁 booking/                            # 예약 관련 모듈
│ │ ├── 📄 booking.controller.ts
│ │ ├── 📄 booking.entity.ts
│ │ ├── 📄 booking.module.ts
│ │ ├── 📄 booking.service.ts
│ │ └── 📁 dto/
│ │ └── 📄 create-booking.dto.ts
│ ├── 📁 config/                             # 설정 관련 모듈
│ │ ├── 📁 cloudflare/
│ │ │ ├── 📄 cloudflare.module.ts
│ │ │ └── 📄 cloudflare.service.ts
│ │ └── 📁 redis/
│ │ ├── 📄 redis.module.ts
│ │ └── 📄 redis.service.ts
│ ├── 📁 performance/                        # 공연 관련 모듈
│ │ ├── 📄 performance.controller.ts
│ │ ├── 📄 performance.entity.ts
│ │ ├── 📄 performance.module.ts
│ │ ├── 📄 performance.service.ts
│ │ └── 📁 dto/
│ │ ├── 📄 create-performance.dto.ts
│ │ ├── 📄 get-performance-detail.dto.ts
│ │ ├── 📄 search-performance.dto.ts
│ │ └── 📄 update-performance.dto.ts
│ ├── 📁 seat/                               # 좌석 관련 모듈
│ │ ├── 📄 seat.controller.ts
│ │ ├── 📄 seat.entity.ts
│ │ ├── 📄 seat.module.ts
│ │ ├── 📄 seat.service.ts
│ │ └── 📁 dto/
│ │ └── 📄 create-seat.dto.ts
│ ├── 📁 seat-template/                      # 좌석 템플릿 관련 모듈
│ │ ├── 📄 seat-template.controller.ts
│ │ ├── 📄 seat-template.entity.ts
│ │ ├── 📄 seat-template.module.ts
│ │ ├── 📄 seat-template.service.ts
│ │ └── 📁 dto/
│ │ └── 📄 create-seat-template.dto.ts
│ ├── 📁 user/                               # 사용자 관련 모듈
│ │ ├── 📄 user.controller.ts
│ │ ├── 📄 user.entity.ts
│ │ ├── 📄 user.module.ts
│ │ ├── 📄 user.service.ts
│ │ └── 📁 dto/
│ │ ├── 📄 create-user.dto.ts
│ │ └── 📄 update-user.dto.ts
│ ├── 📄 app.controller.spec.ts
│ ├── 📄 app.controller.ts
│ ├── 📄 app.module.ts                       # 애플리케이션 모듈
│ ├── 📄 app.service.ts
│ └── 📄 main.ts                             # 엔트리 포인트
├── 📁 test/
│ ├── 📄 app.e2e-spec.ts
│ └── 📄 jest-e2e.json
├── 📄 .env                                  # [.gitignore] 환경 변수 파일
├── 📄 .env.Example                          # 환경 변수 예시 파일
├── 📄 .eslintrc.js                          # ESLint 설정
├── 📄 .gitignore                            # Git 에서 무시할 파일 목록
├── 📄 .prettierrc                           # Prettier 설정
├── 📄 cert.pem                              # [.gitignore] HTTPS SSL 인증서
├── 📄 key.pem                               # [.gitignore] HTTPS SSL 키
├── 📄 nest-cli.json                         # Nest CLI 설정
├── 📄 nodemon.json                          # Nodemon 설정
├── 📄 package-lock.json                     # npm 락 패키지 파일
├── 📄 package.json                          # npm 패키지 파일
├── 📄 README.md                             # 프로젝트 설명 파일
├── 📄 tsconfig.build.json                   # TypeScript 빌드 설정
└── 📄 tsconfig.json                         # TypeScript 설정
```

<br><br><br>

### API 명세서

https://www.vitahub.site/api

<br><br><br>

### ERD Cloud

[![erd Label](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcFMzOe%2FbtsCSz4V7Xh%2FOjD2osotOXOOzejGxZNLbk%2Fimg.png)](https://www.erdcloud.com/d/XM3YguKYdCzXNBdQz)

<br><br><br>
