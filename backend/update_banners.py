import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from pathlib import Path
from dotenv import load_dotenv

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

async def update_banners():
    print("Updating home page banners...")
    
    # Delete existing banners
    await db.banners.delete_many({})
    
    # Add new banners with uploaded images
    banners = [
        {
            "id": "banner-1",
            "image_url": "https://customer-assets.emergentagent.com/job_file-inspector-67/artifacts/pe87ymet_WhatsApp%20Image%202026-03-17%20at%2020.10.31.jpeg",
            "title": "VS Fashion Exhibition",
            "content": "Showcasing handcrafted elegance at local exhibitions",
            "order": 0,
            "is_active": True
        },
        {
            "id": "banner-2",
            "image_url": "https://customer-assets.emergentagent.com/job_file-inspector-67/artifacts/l51rqgke_WhatsApp%20Image%202026-03-18%20at%2023.28.59.jpeg",
            "title": "Handcrafted Kurtis",
            "content": "Traditional block prints meet modern design",
            "order": 1,
            "is_active": True
        },
        {
            "id": "banner-3",
            "image_url": "https://customer-assets.emergentagent.com/job_file-inspector-67/artifacts/a0e0yiq4_WhatsApp%20Image%202026-03-19%20at%2000.28.53.jpeg",
            "title": "Artisan Collection",
            "content": "100% hand block printed with natural dyes",
            "order": 2,
            "is_active": True
        }
    ]
    
    await db.banners.insert_many(banners)
    print("✓ Banners updated successfully!")
    print(f"✓ Added {len(banners)} new banners to the home page slider")

if __name__ == "__main__":
    asyncio.run(update_banners())
    client.close()
