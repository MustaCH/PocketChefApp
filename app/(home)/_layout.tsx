import React from "react";
import { Stack } from "expo-router";
import Isotype from "../../components/logos/Isotype";

export default function HomeLayout() {
  // const { isLoaded, isSignedIn } = useAuth();
  // const router = useRouter();

  // useEffect(() => {
  //   if (isLoaded && !isSignedIn) {
  //     router.replace("/(auth)/sign_in");
  //   }
  // }, [isLoaded, isSignedIn, router]);

  // if (!isLoaded) return null;
  // if (!isSignedIn) return null;

  return (
    <Stack
      screenOptions={{
        headerLeft: () => <Isotype />,
        headerTitle: "",
        headerStyle: {
          backgroundColor: "#1E2A38",
        },
      }}
    />
  );
}
