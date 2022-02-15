import time 

from pubnub.pubnub import PubNub
from pubnub.pnconfiguration import PNConfiguration
from pubnub.callbacks import SubscribeCallback

from backend.blockchain.block import Block


pnconfig = PNConfiguration()
pnconfig.subscribe_key = 'sub-c-08d2b8a0-8dd7-11ec-9fb5-52f848c8da68'
pnconfig.publish_key = 'pub-c-f5a8811b-8028-4aa8-a311-b34ace14c135'
pnconfig.uuid = "my_custom_uuid"

CHANNELS ={
    'TEST': 'TEST',
    'BLOCK': 'BLOCK'
}

class Listener(SubscribeCallback):
    def __init__(self, blockchain):
        self.blockchain = blockchain  

    def message(self, pubnub, message_object):
        print(f'\n-- Channel: {message_object.channel} | Message: {message_object.message}')

        if message_object.channel == CHANNELS['BLOCK']: 
            block = Block.from_json(message_object.message) 
            potential_chain = self.blockchain.chain[:]
            potential_chain.append(block)
        try:
            self.blockchain.replace_chain(potential_chain)
            print('\n -- Successfully replaced the local chain')
        except Exception as e:
            print(f'\n-- Did not replace chain: {e}')

class PubSub():
    """ 
    Handles the publush subscribe layer of the application 
    """
    def __init__(self, blockchain):
        self.pubnub = PubNub(pnconfig)
        self.pubnub.subscribe().channels(CHANNELS.values()).execute()
        self.pubnub.add_listener(Listener(blockchain))

    def publish(self, channel, message):
        """ 
        Publish a message to a pubnub channel
        """
        self.pubnub.publish().channel(channel).message(message).sync()

    def broadcast_block(self, block):
        """
        Broadcast a message to all the connected clients
        """
        self.publish(CHANNELS['BLOCK'], block.to_json())

def main():
    pubsub = PubSub()

    time.sleep(1)

    pubsub.publish(CHANNELS['TEST'], { 'foo': 'bar'} )

if __name__ == '__main__':
    main()

