from fastapi import FastAPI
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "FastAPI работает!"}

@app.get("/api/chart")
def get_chart(event_type: str = "click"):
    data = [
        {"date": "2025-09-01", "CTR": 0.1, "EvPM": 0.5},
        {"date": "2025-09-02", "CTR": 0.15, "EvPM": 0.55},
        {"date": "2025-09-03", "CTR": 0.12, "EvPM": 0.52},
    ]
    return data

@app.get("/api/table")
def get_table(group_by: str = "mm_dma", event_type: str = "click"):
    data = [
        {"mm_dma": "DMA1", "impressions": 1000, "CTR": 0.1, "EvPM": 0.5},
        {"mm_dma": "DMA2", "impressions": 2000, "CTR": 0.12, "EvPM": 0.55},
    ]
    return data
