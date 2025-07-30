# 🏡 Village FE

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

## ✨ 코드 컨벤션
### 📁 폴더 및 파일명
- 파일 및 폴더 이름은 camelCase 사용(e.g., userProfile.tsx, useProfile)
- 페이지 폴더는 Next.js의 규칙에 맞게 snake-case 또는 [param] 사용

### ⚙️ 컴포넌트
- 컴포넌트 이름은 PascalCase 사용(e.g., ProfileCard)
- props 타입은 `interface`로 정의
```typescript
interface ProfileCardProps {
  name: string;
  nickname: string;
  ...
}
```

### 🎨 스타일
- 복잡한 조건부 class는 `clsx` 사용
```typescript
clsx(
  "flex items-center justify-center gap-4",
  isActive ? "bg-background-primary text-text-primary"
)
```

### 📡 API 통신
- 여러 페이지에서 공통으로 관리하는 데이터는 `React Query` 사용
- queryKey는 `["user", userId]` 등으로 명확히 표기

