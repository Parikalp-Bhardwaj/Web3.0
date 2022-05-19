from pydantic import BaseModel


class NFT(BaseModel):
    video: str
    name: str
    description: str
    price: str
