import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/pages/routes";
import AboutPage from "./src/pages/AboutPage";
import EventInsertPage from "./src/pages/EventInsertPage";
import EventsListPage from "./src/pages/EventsListPage";
import PhotoPage from "./src/pages/PhotoPage";
import HeaderButton from "./src/component/HeaderButton";

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerRight: () => <HeaderButton />,
        }}
      >
        <Drawer.Screen name={Routes.EventsListPage} component={EventsListPage} />
        <Drawer.Screen name={Routes.About} component={AboutPage} />
        <Drawer.Screen name={Routes.EventInsertPage} component={EventInsertPage} />
        <Drawer.Screen name={Routes.PhotoPage} component={PhotoPage} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
