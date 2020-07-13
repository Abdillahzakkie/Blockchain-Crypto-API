const Block = require('../block');

describe('Block', () => {
    let data, lastBlock, block;

    beforeEach(() => {
        data = 'bar';
        lastBlock = Block.genesis();
        block = Block.mineBlock(lastBlock, data);
    });

    it('sets the `data` to match the input data', ()=> {
        expect(block.data).toEqual(data)
    });

    it('sets the `lashHash` to match the lastblock hash', () => {
        expect(block.lastHash).toEqual(lastBlock.hash)
    });

    it('generates a hash value that matches the difficulty level', () => {
        expect(block.hash.substring(0, block.difficulty)).toEqual('0'.repeat(block.difficulty))
    });

    it('lowers the difficulty for slowly mined block', () => {
        expect(Block.adjustDifficulty(block, block.timestamp+360000)).toEqual
        (block.difficulty - 1 )
    });

    it('raises the difficulty for slowly mined block', () => {
        expect(Block.adjustDifficulty(block, block.timestamp+1)).toEqual
        (block.difficulty + 1 )
    })
    
});