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
merged = X.merge(Y, on="uid", how="left")
merged["tag"] = merged["tag"].astype(str).str.strip().str.replace(r"^[fv]", "", regex=True)
merged["date"] = pd.to_datetime(merged["reg_time"]).dt.date
uniq_tags = sorted(merged["tag"].unique())

def calculate_metrics(df, event_type):
    impressions = df["uid"].nunique()
    click_count = df[df["tag"] == "click"]["uid"].nunique()
    event_count = df[df["tag"] == event_type]["uid"].count()

    CTR = 100 * (click_count / impressions)
    EvPM = 1000 * (event_count / impressions)

    return pd.Series({"impressions": impressions, "CTR": CTR, "EvPM": EvPM})


@app.get("/api/chart")
def get_chart(event_type: str = "click"):
    chart_df = merged.groupby("date", observed=True).apply(
        lambda g: calculate_metrics(g, event_type)
    ).reset_index()

    chart_data = chart_df.to_dict(orient="records")

    return {
        "chart_data": chart_data,
        "event_types": uniq_tags
    }


@app.get("/api/table")
def get_table(group_by: str = "mm_dma", event_type: str = "click"):
    if group_by not in ["mm_dma", "site_id"]:
        return {"error": "group_by должен быть 'mm_dma' или 'site_id'"}

    table_df = merged.groupby(group_by, observed=True).apply(
        lambda g: calculate_metrics(g, event_type)
    ).reset_index()

    return table_df.to_dict(orient="records")
