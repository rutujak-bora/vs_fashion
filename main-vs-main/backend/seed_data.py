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

async def seed_data():
    print("Seeding initial data...")
    
    # Add banners
    existing_banners = await db.banners.count_documents({})
    if existing_banners == 0:
        banners = [
            {
                "id": "banner-1",
                "image_url": "https://images.unsplash.com/photo-1761932975421-48f2cc7483dd?crop=entropy&cs=srgb&fm=jpg&q=85",
                "title": "Luxury Fashion Collection",
                "content": "Discover timeless elegance with our premium collection",
                "order": 0,
                "is_active": True
            },
            {
                "id": "banner-2",
                "image_url": "https://images.unsplash.com/photo-1764998112464-f293be747d84?crop=entropy&cs=srgb&fm=jpg&q=85",
                "title": "New Arrivals",
                "content": "Explore the latest trends in fashion",
                "order": 1,
                "is_active": True
            },
            {
                "id": "banner-3",
                "image_url": "https://images.unsplash.com/photo-1764158302194-54b208aa7f2b?crop=entropy&cs=srgb&fm=jpg&q=85",
                "title": "Exclusive Designs",
                "content": "Handpicked styles just for you",
                "order": 2,
                "is_active": True
            }
        ]
        await db.banners.insert_many(banners)
        print("✓ Banners added")
    else:
        print("✓ Banners already exist")
    
    # Add sample collection
    existing_collections = await db.collections.count_documents({})
    if existing_collections == 0:
        from datetime import datetime, timezone
        collections = [
            {
                "id": "coll-sarees",
                "name": "Sarees",
                "description": "Traditional and designer sarees",
                "image_url": "",
                "is_active": True,
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": "coll-kurtis",
                "name": "Kurtis",
                "description": "Stylish kurtis for every occasion",
                "image_url": "",
                "is_active": True,
                "created_at": datetime.now(timezone.utc).isoformat()
            }
        ]
        await db.collections.insert_many(collections)
        print("✓ Sample collections added")
    else:
        print("✓ Collections already exist")
    
    print("\nSeeding completed!")
    print("\nYou can now:")
    print("1. Login as admin: vsfashiiiion@gmail.com / vs@54321")
    print("2. Add products from the admin panel")
    print("3. Register as a customer and start shopping")

if __name__ == "__main__":
    asyncio.run(seed_data())
    client.close()
