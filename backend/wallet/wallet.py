import uuid

from backend.config import STARTING_BALANCE
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives.asymmetric import ec

class Wallet: 
    """
    An individual wallet for a miner. 
    """
    def __init__(self):
        self.address = str(uuid.uuid4())[0:8]
        self.ballance = STARTING_BALANCE
        self.private_key = ec.generate_private_key(
            ec.SECP256K1(), 
            default_backend()
        )
        self.public_key = self.private_key.public_key()

def main():
    wallet = Wallet()
    print(f'wallet.__dict__: {wallet.__dict__}')
    
if __name__ == '__main__':
    main()


