import { test, expect } from '../fixtures/qauto.fixture';

test('open garage as authorized user', async ({ garagePage }) => {


 await expect(
    garagePage.getByRole('button', { name: 'Add car' })
  ).toBeVisible();
  
});

