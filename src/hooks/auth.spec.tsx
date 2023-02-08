import { useAuth, AuthProvider } from '../hooks/auth';
import { renderHook, act } from '@testing-library/react-hooks';

const mockStartAsync = jest.fn();
jest.mock('expo-auth-session', () => {
  return {
    startAsync: () => mockStartAsync()
  }
})

jest.mock('expo-apple-authentication', () => ({}))

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: async () => {}
}))

describe('Auth hook', () => {
  it('should be able to sign in with Google Account existing', async () => {
    mockStartAsync.mockReturnValue({
      type: 'success',
      params: {
        access_token: 'google-token'
      },
      user: {
        id: 'any_id',
        email: 'gabriel@gmail.com',
        name: 'Gabriel',
        photo: 'picture.png'
      }
    })


    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({
        id: `userInfo.id`,
        email: `userInfo.email`,
        name: `useInfo.given_name`,
        photo: `userInfo.picture`,
        locale: `userInfo.locale`,
        verified_email: `userInfo.verified_email`
      })
    })) as jest.Mock;

    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider }); 

    await act(() => result.current.signInWithGoogle());
    expect(result.current.user).toBeTruthy()
  });

  it('should not connect  if cancel authcation with google', async () => {
    mockStartAsync.mockReturnValue({
      type: 'cancel',
    })

    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider }); 

    await act(() => result.current.signInWithGoogle());
    expect(result.current.user)
    .not.toHaveProperty('id');
  });

})