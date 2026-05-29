import { test, expect } from '@playwright/test';
import { defaultCar } from '../test-data/cars.data';

test.describe('QAuto API - Cars', () => {
  test('should create a new car', async ({ request }) => {
    const response = await request.post('/api/cars', {
      data: defaultCar,
    });

    expect(response.status()).toBe(201);

    const body = await response.json();

    console.log(body);

    expect(body.status).toBe('ok');
    expect(body.data).toHaveProperty('id');
    expect(body.data.mileage).toBe(defaultCar.mileage);
    expect(body.data.carBrandId).toBe(defaultCar.carBrandId);
    expect(body.data.carModelId).toBe(defaultCar.carModelId);
  });
});