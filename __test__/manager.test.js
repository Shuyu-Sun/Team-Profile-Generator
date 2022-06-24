const Manager = require('../lib/manager');

// creating manager object  
test('creates an Manager object', () => {
    const manager = new Manager('Stella', 13, 'stellasunmail@gmail', 888);
    
    expect(manager.officeNumber).toEqual(expect.any(Number));
});

// gets role from getRole()
test('gets role of employee', () => {
    const manager = new Manager('Stella', 13, 'stellasunmail@gmail', 888);

    expect(manager.getRole()).toEqual("Manager");
}); 