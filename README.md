# 🏡 Village FE
[Village 보러 가기 ➡️](https://village-beryl.vercel.app)

## 🛠️ 기술 스택
- 프론트엔드:
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![React Query](https://img.shields.io/badge/React_Query-FF4154?style=flat-square&logo=reactquery&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-000000?style=flat-square&logo=zustand&logoColor=white)
- 협업 및 배포: 
![Figma](https://img.shields.io/badge/Figma-F24E1E?style=flat-square&logo=figma&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)


## 📺 기능 영상
### 1️⃣ 로그인/마이페이지
![빌리지-로그인_마이페이지](https://github.com/user-attachments/assets/028d2c62-e4ec-42d8-a4d9-24f240050e03)
### 2️⃣ 커뮤니티
![빌리지-커뮤니티](https://github.com/user-attachments/assets/0bc50752-0058-435d-ba6a-fa2a338cba1f)
### 3️⃣ 이웃
![빌리지-이웃](https://github.com/user-attachments/assets/25c99c5b-2d0d-4b33-a66c-466a66d56aa4)
### 4️⃣ 채용 공고
![빌리지-채용공고](https://github.com/user-attachments/assets/f79b8e87-700e-49f9-a021-40c6e754982f)

## 📁 폴더 구조
```plaintext
📁 root/
├── 📁 app/                         # App Router 기반 라우팅 디렉토리
│   ├── 📁 (main)/                  # 메인 라우트 그룹
│   │   ├── 📁 [userId]/            # 유저 프로필 페이지 / 이웃
│   │   ├── 📁 create/              # 프로필 생성
│   │   ├── 📁 edit/                # 프로필 수정
│   │   ├── 📁 hooks/               # 프로필 관련 훅
│   │   ├── 📁 profile/             # 프로필 상세 / 이웃 목록
│   │   ├── 📁 types/               # 프로필 관련 타입 정의
│   │   └── 📁 utils/               # 프로필 관련 유틸 함수
│   ├── 📁 community/               # 커뮤니티 피드, 검색, 스토어
│   ├── 📁 components/              # 앱 전역 UI 컴포넌트(헤더, 모달 등)
│   ├── 📁 hooks/                   # 전역 훅
│   ├── 📁 lib/                     # API, Amplitude, 이미지 리사이즈 등 유틸
│   ├── 📁 neighbors/               # 이웃 관련 페이지
│   ├── 📁 post/                    # 게시글 상세/작성
│   ├── 📁 providers/               # Query / Amplitude Provider
│   ├── 📁 recruit/                 # 채용 공고 / 검색 페이지
│   ├── 📁 settings/                # 설정 페이지
│   ├── 📁 support/                 # 고객 지원 페이지
│   ├── 📁 terms/                   # 약관 페이지
│   ├── 📁 types/                   # 전역 타입 정의
│   ├── 📁 web-auth/                # 소셜 로그인 인증 처리
│   │   └── 📁 kakao/callback/      # 카카오 로그인 콜백
│   ├── 📄 favicon.ico              # 파비콘
│   ├── 📄 globals.css              # 전역 스타일 (Tailwind 등)
│   └── 📄 layout.tsx               # 전체 레이아웃
├── 📁 constants/                   # 상수 파일 정의(지역, 필터 등)
├── 📁 public/                      # 정적 파일 제공 폴더
├── 📁 store/                       # Zustand 상태 관리
├── 📄 postcss.config.js            # PostCSS 설정
└── 📄 tailwind.config.ts           # TailwindCSS 설정
```

## ⚙️ 실행 방법
1. **저장소 클론**
   ```bash
   git clone https://github.com/m01310g/Village.git
   ```
2. **의존성 설치**
   ```bash
   npm install
   ```
3. **실행**
   ```bash
   npm run dev
   ```
4. **환경 변수 설정**
- 프로젝트 루트에 `.env` 파일을 생성하고 필요한 환경 변수를 설정합니다.  
`.env.example`을 참고하여 값을 입력하세요.
  ```bash
  # .env.example
  NEXT_PUBLIC_API_BASE_URL=
  NEXT_PUBLIC_AMPLITUDE_API_KEY=
  ```
5. **브라우저에서 접속**
   ```bash
   http://localhost:3000
   ```
