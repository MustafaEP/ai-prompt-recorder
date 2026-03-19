<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project: AI Prompt Kayıt

Full-stack uygulama. Frontend Next.js, backend FastAPI, veritabanı Supabase.

## Stack

- **Frontend:** Next.js 16 + React 19 + Tailwind CSS v4 + TypeScript
- **Backend:** FastAPI (Python) — `backend/`
- **Database:** Supabase (PostgreSQL) — tablolar Supabase arayüzünden SQL ile oluşturuldu
- **Deploy:** Frontend → Vercel, Backend → Railway

## Dosya Yapısı

```
app/             # Next.js sayfaları ve layout
components/      # React bileşenleri (PromptForm, PromptCard, PromptList, SkeletonCard)
hooks/           # Custom hook'lar (usePrompts)
lib/             # API fonksiyonları (api.ts), Supabase client (supabase.ts)
types/           # Paylaşılan TypeScript tipleri
backend/
  main.py        # FastAPI app
  config.py      # Env ayarları
  database.py    # Supabase client
  schemas.py     # Pydantic modeller
  routers/
    prompts.py   # Prompt endpoint'leri
```

## Kurallar

- Yeni bileşenler `components/` altına ekle
- API çağrıları `lib/api.ts` üzerinden yapılır, doğrudan `fetch` kullanma
- State ve API mantığını `hooks/` altındaki hook'lara taşı
- Tailwind v4 kullanılıyor — `tailwind.config.js` yoktur, konfigürasyon `globals.css` içindeki `@theme` bloğundadır
- Dark tema zorunlu; `dark:` prefix yerine direkt zinc/slate renk sınıfları kullan
- Backend endpoint eklerken `routers/prompts.py`'yi düzenle, `main.py`'ye dokunma
- `GET /prompts/meta/count` endpoint'i `GET /prompts/{id}`'den önce tanımlanmalı (FastAPI route sırası)
