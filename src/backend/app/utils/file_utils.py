import boto3
import uuid
from app.config import AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_REGION, AWS_BUCKET

def s3_client():
    return boto3.client(
        "s3",
        aws_access_key_id=AWS_ACCESS_KEY,
        aws_secret_access_key=AWS_SECRET_KEY,
        region_name=AWS_REGION
    )

def upload_file_to_s3(file_bytes: bytes, ext: str):
    """
    Uploads file bytes to S3 and returns the S3 URL.
    """
    file_id = f"{uuid.uuid4()}{ext}"
    s3 = s3_client()

    s3.put_object(
        Bucket=AWS_BUCKET,
        Key=file_id,
        Body=file_bytes,
        ContentType="video/mp4"
    )

    return f"https://{AWS_BUCKET}.s3.{AWS_REGION}.amazonaws.com/{file_id}"
