// import statusCodes along with GoogleSignin
import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  scopes: ['email', 'profile'], // what API you want to access on behalf of the user, default is email and profile
  webClientId: '996683014454-lk8hct425bdhau1ad39b798tmd04jgnr.apps.googleusercontent.com',
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
});
// Somewhere in your code
const signIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();

    const response = await GoogleSignin.signIn();
    if (isSuccessResponse(response)) {
      return response.data
    } else {
      // sign in was cancelled by user
      console.log('cancelled', response);
    }
  } catch (error) {
    if (isErrorWithCode(error)) {
      switch (error.code) {
        case statusCodes.IN_PROGRESS:
          // operation (eg. sign in) already in progress
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          // Android only, play services not available or outdated
          break;
        default:
          // some other error happened
          console.log(error, 'error on play services');
      }
    } else {
      // an error that's not related to google sign in occurred
    }
  }
};
export { signIn }