import random
import string

def generate_random_token():
    characters = string.ascii_letters + string.digits
    return ''.join([ random.choice(characters) for i in range(64)])
