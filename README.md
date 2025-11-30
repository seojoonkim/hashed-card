# Hashed Card

Linktree 스타일의 프로필 카드 시스템 (어드민 포함)

## 기술 스택

- **프론트엔드**: React + Vite + Tailwind CSS
- **백엔드**: Supabase (Auth + Database)
- **호스팅**: GitHub Pages
- **배포**: GitHub Actions (자동)

## 로컬 개발

```bash
# 의존성 설치
npm install

# 환경변수 설정
cp .env.example .env
# .env 파일에 Supabase 정보 입력

# 개발 서버 실행
npm run dev
```

## Supabase 설정

1. [Supabase](https://supabase.com)에서 새 프로젝트 생성
2. SQL Editor에서 `supabase-schema.sql` 실행
3. Project Settings > API에서 URL과 anon key 복사
4. `.env` 파일에 입력

## GitHub Pages 배포

1. GitHub에 레포지토리 생성
2. Settings > Secrets에 환경변수 추가:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Settings > Pages에서 Source를 "GitHub Actions"로 설정
4. `main` 브랜치에 푸시하면 자동 배포

## 구조

```
/               → 홈 (관리자 링크)
/admin          → 관리자 대시보드
/admin/login    → 관리자 로그인
/:username      → 공개 프로필 카드
```

## 커스터마이징

- 색상: `tailwind.config.js`의 `primary` 컬러 수정
- 아이콘: `lucide-react` 사용 중
