describe('Login', () => {
  beforeEach(() => cy.visit('/signin'));

  it('should show an error for wrong login details', () => {
    // Check initial state
    cy.get('button[type=submit]').should('be.disabled');
    cy.get('[data-cy=error-msg]').should('not.exist');
    // Fill form and submit
    cy.get('input[name=email]').type('admin@gym.fit');
    cy.get('input[name=password]').type('wrong');
    cy.get('button[type=submit]').click();
    // Check error message is shown
    cy.get('[data-cy=error-msg]').should('exist');
  });

  it('should go to the dashboard on successful login', () => {
    // Check initial state
    cy.get('button[type=submit]').should('be.disabled');
    cy.get('[data-cy=error-msg]').should('not.exist');
    // Fill form and submit
    cy.get('input[name=email]').type('admin@gym.fit');
    cy.get('input[name=password]').type('test');
    cy.get('button[type=submit]').click();
    // Check location changed
    cy.location('pathname').should('eq', '/dashboard');
  });
});
