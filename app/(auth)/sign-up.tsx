import * as React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onGoogleSignUp = async () => {
    if (!isLoaded) return;
    try {
      await signUp.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "pocketchef://",
        redirectUrlComplete: "pocketchef://",
      });
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onAppleSignUp = async () => {
    if (!isLoaded) return;
    try {
      await signUp.authenticateWithRedirect({
        strategy: "oauth_apple",
        redirectUrl: "pocketchef://",
        redirectUrlComplete: "pocketchef://",
      });
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  if (pendingVerification) {
    return (
      <View>
        <Text>Verifica tu email</Text>
        <TextInput
          value={code}
          placeholder="Código de verificación"
          onChangeText={setCode}
        />
        <TouchableOpacity onPress={onVerifyPress}>
          <Text>Verificar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        padding: 20,
      }}
    >
      <>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
          Crear cuenta
        </Text>
        <View
          style={{
            width: "100%",
            marginBottom: 10,
            display: "flex",
            flexDirection: "row",
            gap: 10,
          }}
        >
          {/* Botón Google */}
          <TouchableOpacity
            onPress={onGoogleSignUp}
            style={{
              backgroundColor: "#ea4335",
              padding: 12,
              borderRadius: 5,
              marginBottom: 10,
              width: "50%",
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Registrarse con Google
            </Text>
          </TouchableOpacity>
          {/* Botón Apple */}
          <TouchableOpacity
            onPress={onAppleSignUp}
            style={{
              backgroundColor: "#000",
              padding: 12,
              borderRadius: 5,
              marginBottom: 10,
              width: "50%",
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Registrarse con Apple
            </Text>
          </TouchableOpacity>
        </View>
        <TextInput
          value={emailAddress}
          placeholder="Correo electrónico"
          onChangeText={setEmailAddress}
          style={{
            width: "100%",
            padding: 10,
            borderWidth: 1,
            borderColor: "gray",
            borderRadius: 5,
            marginBottom: 10,
          }}
        />
        <TextInput
          value={password}
          placeholder="Contraseña"
          style={{
            width: "100%",
            padding: 10,
            borderWidth: 1,
            borderColor: "gray",
            borderRadius: 5,
            marginBottom: 10,
          }}
          secureTextEntry={true}
        />
        <TouchableOpacity
          onPress={onSignUpPress}
          style={{
            backgroundColor: "#2563eb",
            padding: 12,
            borderRadius: 5,
            marginBottom: 10,
            width: "100%",
          }}
        >
          <Text
            style={{ color: "white", fontWeight: "bold", textAlign: "center" }}
          >
            Crear cuenta
          </Text>
        </TouchableOpacity>
        <View style={{ display: "flex", flexDirection: "row", gap: 3 }}>
          <Text>¿Ya tienes una cuenta?</Text>
          <Link href="/sign-in">
            <Text style={{ color: "blue", fontWeight: "bold" }}>
              Iniciar sesión
            </Text>
          </Link>
        </View>
      </>
    </View>
  );
}
