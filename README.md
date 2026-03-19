# AI Prompt Kayıt

AI promptlarını kaydet, düzenle ve yönet.

**Frontend:** https://ai-prompt-recorder.vercel.app
**Backend API:** https://ai-prompt-recorder-production-b487.up.railway.app/docs

## Stack

- **Frontend:** Next.js 16 + React 19 + Tailwind CSS v4 — Vercel
- **Backend:** FastAPI (Python) — Railway
- **Database:** Supabase (PostgreSQL)

## API

| Method | Endpoint | Açıklama |
|--------|----------|----------|
| GET | `/prompts` | Tüm promptları listele |
| POST | `/prompts` | Yeni prompt oluştur |
| GET | `/prompts/{id}` | Tek prompt getir |
| PUT | `/prompts/{id}` | Prompt güncelle |
| DELETE | `/prompts/{id}` | Prompt sil |
| GET | `/prompts/meta/count` | Toplam prompt sayısı |

Canlı API dökümantasyonu: https://ai-prompt-recorder-production-b487.up.railway.app/docs

## Geliştirme

### Frontend

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000) adresinde çalışır.

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

`.env` dosyasına `SUPABASE_URL` ve `SUPABASE_KEY` değerlerini ekle.
