import boto3
import os
from dotenv import load_dotenv
from pathlib import Path

current_dir = Path(__file__).parent
load_dotenv(current_dir / '.env')

s3_bucket = os.environ.get("AWS_S3_BUCKET_NAME")
aws_access_key = os.environ.get("AWS_ACCESS_KEY_ID")
aws_secret_key = os.environ.get("AWS_SECRET_ACCESS_KEY")
aws_region = os.environ.get("AWS_REGION", "ap-south-1")

def fix_s3():
    try:
        s3 = boto3.client(
            's3',
            aws_access_key_id=aws_access_key,
            aws_secret_access_key=aws_secret_key,
            region_name=aws_region
        )
        
        print(f"Applying CORS to bucket: {s3_bucket}")
        s3.put_bucket_cors(
            Bucket=s3_bucket,
            CORSConfiguration={
                'CORSRules': [
                    {
                        'AllowedHeaders': ['*'],
                        'AllowedMethods': ['GET', 'HEAD', 'PUT', 'POST', 'DELETE'],
                        'AllowedOrigins': ['*'], # Using * for testing, ideally restrict later
                        'MaxAgeSeconds': 3000
                    }
                ]
            }
        )
        print("CORS applied successfully.")

        # Try to make existing objects public (optional but helpful)
        response = s3.list_objects_v2(Bucket=s3_bucket, Prefix='images/')
        if 'Contents' in response:
            print(f"Making {len(response['Contents'])} objects public...")
            for obj in response['Contents']:
                try:
                    s3.put_object_acl(Bucket=s3_bucket, Key=obj['Key'], ACL='public-read')
                except Exception as e:
                    print(f"Could not make {obj['Key']} public: {e}")
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    fix_s3()
