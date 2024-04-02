import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import GaleriaContainer from "../container/Photos/GaleriaContainer";
import CameraContainer from "../container/Photos/CameraContainer";

const Tab = createBottomTabNavigator();




const PhotoPage=({ navigation })=> {
  return (
    <Tab.Navigator
    screenOptions={{
        headerShown: false
    }}
    >
      <Tab.Screen name="Galeria" component={GaleriaContainer}/>
      <Tab.Screen name="Camera" component={CameraContainer}/>
      
  
    </Tab.Navigator>
  );
}

export default PhotoPage;