# Metric Track - Test Project

## Стек:

Frontend: React, React Context, React Select, Recharts, CSS, Tailwind, Lucide React, Axios

Backend: Python, Fast API, Pandas, Unicorn

## Установка

Клонируем репозиторий и устанавливаем зависимости:

```bash
git clone https://github.com/ianaomalova/TestMetricTrack.git
cd frontend
npm install

cd backend
python3 -m venv venv
source venv/bin/activate (для MacOS/ Linix)
venv\Scripts\activate (для Windows)
pip install fastapi uvicorn pandas

```

```
Также необходимо добавить файлы interview.X.csv и interview.Y.csv в папку data в папке backend
```

## Запуск проекта для разработки

```bash
npm run dev (frontend)
uvicorn main:app --reload (backend)
```

## Экраны

### Главная страница с графиком и таблицей

![Главная страница с графиком и таблицей](frontend/public/screenshots/one.jpg)

### Селект по типу события

![Селект по типу события](frontend/public/screenshots/two.jpg)

### Селект для выбора группировки в таблице

![Селект для выбора группировки в таблице](frontend/public/screenshots/three.jpg)

### Тултипы на графике

![Тултипы на графике](frontend/public/screenshots/four.jpg)

### Темная тема

![Темная тема](frontend/public/screenshots/five.jpg)

### Адаптив

![Адаптив](frontend/public/screenshots/six.jpg)
