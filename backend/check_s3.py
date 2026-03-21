import boto3
import os
from dotenv import load_dotenv
from pathlib import Path

# __file__ is c:\Users\Admin\Downloads\web-main\web-main\backend\check_s3.py
# .env is in c:\Users\Admin\Downloads\web-main\web-main\backend\.env
current_dir = Path(__file__).parent
load_dotenv(current_dir / '.env')

s3_bucket = os.environ.get("AWS_S3_BUCKET_NAME")
aws_access_key = os.environ.get("AWS_ACCESS_KEY_ID")
aws_secret_key = os.environ.get("AWS_SECRET_ACCESS_KEY")
aws_region = os.environ.get("AWS_REGION", "ap-south-1")

print(f"DEBUG: Found credentials for {s3_bucket} in region {aws_region}")

def check_s3():
    try:
        if not s3_bucket:
            print("Error: AWS_S3_BUCKET_NAME not set.")
            return

        s3 = boto3.client(
            's3',
            aws_access_key_id=aws_access_key,
            aws_secret_access_key=aws_secret_key,
            region_name=aws_region
        )
        
        print(f"Checking bucket: {s3_bucket}")
        
        # Check CORS
        try:
            cors = s3.get_bucket_cors(Bucket=s3_bucket)
            print("Current CORS configuration:")
            print(cors.get('CORSRules'))
        except Exception as e:
            print(f"No CORS configuration found or error: {e}")
            
        # Check an object and its ACL
        response = s3.list_objects_v2(Bucket=s3_bucket, MaxKeys=5)
        if 'Contents' in response:
            print("Found objects:")
            for obj in response['Contents']:
                print(f" - {obj['Key']}")
                try:
                    acl = s3.get_object_acl(Bucket=s3_bucket, Key=obj['Key'])
                    print(f"   ACL: {acl.get('Grants')}")
                except Exception as e:
                    print(f"   Error getting ACL: {e}")
        else:
            print("No objects found.")
            
    except Exception as e:
        print(f"Error connecting to S3: {e}")

if __name__ == "__main__":
    check_s3()
