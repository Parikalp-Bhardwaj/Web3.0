
from fastapi import FastAPI, HTTPException
from typing import Optional
from database import NFT
from fastapi.middleware.cors import CORSMiddleware
from mongodb import (fetch_all_nfts, fetch_one_nfts, create_nft)
from pydantic import BaseModel


app = FastAPI()

origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def hello():
    return "Hello"


@app.get("/api/nfts")
async def get_nfts(nfts: NFT):
    data = await fetch_all_nfts()
    return data


@app.get("/api/nfts/{video}", response_model=NFT)
async def get_nft(video):
    data = await fetch_one_nfts(video)
    if data:
        return data

    raise HTTPException(404, f"there is no NFT with this {video}")


@app.post("/api/nfts", response_model=NFT)
async def post_nft(nfts: NFT):
    respone = await create_nft(nfts.dict())
    if respone:
        return respone

    raise HTTPException(400, "Something went wrong bad request")


