import { Provider } from "react-redux";
import store from "./src/redux-store/store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import Container from "./src/screens/container.screen";
import { useFonts } from 'expo-font';
import { SafeAreaProvider } from 'react-native-safe-area-context';

let persistor = persistStore(store);

export default function App() {
  const [fontsLoaded] = useFonts({
    'Poppins-Black': require('./src/assets/fonts/Poppins-Black.otf'),
    'Poppins-Bold': require('./src/assets/fonts/Poppins-Bold.otf'),
    'Poppins-ExtraBold': require('./src/assets/fonts/Poppins-ExtraBold.otf'),
    'Poppins-ExtraLight': require('./src/assets/fonts/Poppins-ExtraLight.otf'),
    'Poppins-Light': require('./src/assets/fonts/Poppins-Light.otf'),
    'Poppins-Medium': require('./src/assets/fonts/Poppins-Medium.otf'),
    'Poppins-Regular': require('./src/assets/fonts/Poppins-Regular.otf'),
    'Poppins-SemiBold': require('./src/assets/fonts/Poppins-SemiBold.otf'),
    'Poppins-Thin': require('./src/assets/fonts/Poppins-Thin.otf'),
  });

  return (
  
    <Provider store={store}>
      
      <PersistGate loading={null} persistor={persistor}>
      <SafeAreaProvider>
        <Container />
        </SafeAreaProvider>
      </PersistGate>
  
    </Provider>
  

  );
}
