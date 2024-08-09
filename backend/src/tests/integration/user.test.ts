import { vi, describe, it, expect, beforeAll, afterAll } from 'vitest';
import { mock, MockProxy } from 'vitest-mock-extended';
import request from 'supertest';
import app from '../../app';
import * as testService from '../../../src/services/user-service';

describe('User Route', () => {
  let service_mock: MockProxy<typeof testService>;

  beforeAll(() => {
    service_mock = mock<typeof testService>();
    vi.spyOn(testService, 'fetchUserData').mockImplementation(
      service_mock.fetchUserData
    );
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  it("should return 'User data' when service succeeds", async () => {
    service_mock.fetchUserData.mockReturnValue('User data');
    const response = await request(app).get('/user');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ data: 'User data' });
  });

  it('should return 500 when service throws an error', async () => {
    service_mock.fetchUserData.mockImplementation(() => {
      throw new Error('Failed to fetch data');
    });

    const response = await request(app).get('/user');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Failed to fetch data' });
  });
});
