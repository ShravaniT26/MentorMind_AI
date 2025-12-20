from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from backend.app.youtube_engine.core.security import create_access_token

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/login")
def authenticate_user(form: OAuth2PasswordRequestForm = Depends()):
    if form.username == "admin" and form.password == "admin123":
        user = {"username": "admin"}
    elif form.username == "demo" and form.password == "demo123":
        user = {"username": "demo"}
    else:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"sub": user["username"]})
    return {
        "access_token": token,
        "token_type": "bearer"
    }
