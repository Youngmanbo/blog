import re

def validate_password(password: str) -> str:
    # 비밀번호에 숫자, 영어, 특수기호가 모두 포함되어 있는지 확인
    if not re.search(r'\d', password) or \
       not re.search(r'[a-zA-Z]', password) or \
       not re.search(r'[!@#$%^&*(),.?":{}|<>]', password):
        return "비밀번호는 숫자, 영어, 특수기호를 모두 포함해야 합니다."

    # 최소 길이가 6자 이상인지 확인
    if len(password) < 6:
        return "비밀번호는 최소 6자 이상이어야 합니다."

    # 유효한 경우 "" 반환
    return ""

def validate_postdata(data:dict) -> dict:
    pass