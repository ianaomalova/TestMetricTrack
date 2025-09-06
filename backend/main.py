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

X = pd.read_csv("data/interview.X.csv")
Y = pd.read_csv("data/interview.y.csv")

def calculate_metrics(df, event_type):
    impressions = df["uid"].nunique()

    click_count = df[df["tag"] == "click"]["uid"].nunique()
    event_count = df[df["tag"] == event_type]["uid"].count()

    CTR = 100 * (click_count / impressions)
    EvPM = 1000 * (event_count / impressions)

    return pd.Series({"impressions": impressions, "CTR": CTR, "EvPM": EvPM})


@app.get("/api/chart")
def get_chart(event_type: str = "click"):
    merged = X.merge(Y, on="uid")
    merged["date"] = pd.to_datetime(merged["reg_time"]).dt.date
    merged["tag"] = merged["tag"].str.replace(r"^[fv]", "", regex=True)
    uniq_tags = sorted(merged["tag"].unique())

    chart_df = merged.groupby("date").apply(lambda g: calculate_metrics(g, event_type)).reset_index()

    result = chart_df.to_dict(orient="records")

    return {
        "chart_data": result,
        "event_types": uniq_tags
    }


@app.get("/api/table")
def get_table(group_by: str = "mm_dma", event_type: str = "click"):
    data = [
        {"mm_dma": "DMA1", "impressions": 1000, "CTR": 0.1, "EvPM": 0.5},
        {"mm_dma": "DMA2", "impressions": 2000, "CTR": 0.12, "EvPM": 0.55},
    ]
    return data
