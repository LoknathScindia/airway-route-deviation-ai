from fastapi import APIRouter, HTTPException

from backend.api.schemas.user import (
    UserCreate,
    UserLogin,
    UserResponse,
    Token,
)

from backend.database.user_crud import (
    create_user,
    authenticate_user,
)

from backend.auth.jwt_handler import (
    create_access_token,
)

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


@router.post(
    "/register",
    response_model=UserResponse,
)
def register(user: UserCreate):

    db_user = create_user(user)

    if db_user is None:
        raise HTTPException(
            status_code=400,
            detail="Username already exists",
        )

    return db_user


@router.post(
    "/login",
    response_model=Token,
)
def login(user: UserLogin):

    db_user = authenticate_user(
        user.username,
        user.password,
    )

    if db_user is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid username or password",
        )

    token = create_access_token(
        {
            "sub": db_user.username,
            "role": db_user.role,
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer",
    }