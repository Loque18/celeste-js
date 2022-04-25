import CelesteJS from '../../../lib';

describe('Metamask', () => {
    context('Test commands', () => {
        // todo: clear the state of extension and test different combinations of setupMetamask with private key & custom network
        it(`setupMetamask should finish metamask setup using secret words`, () => {
            cy.setupMetamask(
                'shuffle stay hair student wagon senior problem drama parrot creek enact pluck',
                'kovan',
                'Tester@1234'
            ).then(setupFinished => {
                expect(setupFinished).to.be.true;
            });
        });

        it(`acceptMetamaskAccess should accept connection request to metamask`, () => {
            cy.visit('/celeste');
            cy.get('#metamaskbutton').click();
            cy.acceptMetamaskAccess().then(connected => {
                expect(connected).to.be.true;
            });
            // cy.get('#network').contains('42');
            // cy.get('#chainId').contains('0x2a');
            // cy.get('#accounts').contains(
            //     '0x352e559b06e9c6c72edbf5af2bf52c61f088db71'
            // );
        });

        it(`getNetwork should return network by default`, () => {
            const toyBasadoDiv = cy.contains('Toy basado');

            expect(toyBasadoDiv).to.exist;
        });
    });
});
