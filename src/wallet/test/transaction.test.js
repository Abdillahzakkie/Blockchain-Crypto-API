const Wallet = require('../index');
const Transaction = require('../transaction');

describe('Transaction', () => {
    let transaction, wallet, amount, recipient;

    beforeEach(() => {
        wallet = new Wallet();
        amount = 50;
        recipient = 'r3c1p13n7',
        transaction = Transaction.newTransaction(wallet, recipient, amount);
    });

    it(`outputs the 'amount' subtracted from the sender's wallet`, () => {
        expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount)
            .toEqual(wallet.balance - amount)
    });

    it(`outputs the 'amount' added to the recipient`, () => {
        expect(transaction.outputs.find(output => output.address === recipient).amount)
            .toEqual(amount)
    });

    it(`inputs the wallet's balance`, () => {
        expect(transaction.input.amount).toEqual(wallet.balance)
    });

    it(`validates a valid trasaction`, () => {
        expect(Transaction.verifyTransaction(transaction)).toBe(true)
    });

    it(`validates a valid trasaction`, () => {
        transaction.outputs[0].amount = 5000;
        expect(Transaction.verifyTransaction(transaction)).toBe(false)
    });

    describe(`transacting with an amount that exceeds the balance`, () => {
        beforeEach(() => {
            amount = 5000;
            transaction = Transaction.newTransaction(wallet, recipient, amount);
        });

        it(`doesn't create a transaction`, () => {
            expect(transaction)
                .toEqual(undefined)
        });
    });

});