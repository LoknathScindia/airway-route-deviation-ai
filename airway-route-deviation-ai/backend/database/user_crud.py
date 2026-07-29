from backend.database.session import SessionLocal
from backend.database.models.user import User
from backend.auth.hashing import hash_password, verify_password


def create_user(user):
    db = SessionLocal()

    existing = (
        db.query(User)
        .filter(User.username == user.username)
        .first()
    )

    if existing:
        db.close()
        return None

    db_user = User(
        username=user.username,
        email=user.email,
        hashed_password=hash_password(user.password),
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    db.close()

    return db_user


def authenticate_user(username: str, password: str):
    db = SessionLocal()

    user = (
        db.query(User)
        .filter(User.username == username)
        .first()
    )

    if not user:
        db.close()
        return None

    if not verify_password(
        password,
        user.hashed_password,
    ):
        db.close()
        return None

    db.close()

    return user


def get_user(username: str):
    db = SessionLocal()

    user = (
        db.query(User)
        .filter(User.username == username)
        .first()
    )

    db.close()

    return user