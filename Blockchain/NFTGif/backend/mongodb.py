from database import NFT
import motor.motor_asyncio

client = motor.motor_asyncio.AsyncIOMotorClient("mongodb://localhost:27017")

databases = client.Nfts

collection = databases.videos


async def fetch_one_nfts(video):
    document = await collection.find_one({"video": video})
    return document


async def fetch_all_nfts():
    cursor = collection.find({})
    videos = []
    async for document in cursor:
        videos.append(NFT(**document))
    return videos


async def create_nft(nft):
    document = nft
    result = await collection.insert_one(document)
    return document
