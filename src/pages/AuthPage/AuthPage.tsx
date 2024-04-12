import {
  Paper,
  Group,
  Divider,
  Stack,
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Button,
  Text,
  Title,
} from "@mantine/core";
import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import GoogleButton from "../../components/GoogleButton/GoogleButton";
import styles from "./AuthPage.module.css";
import { useAuth, useSignIn, useSignUp } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createUser } from "../../api/api";
import { Role, User } from "../../interfaces/user.interface";
import { useEffect } from "react";

const AuthPage = () => {
  const [type, toggle] = useToggle(["login", "register", "registerCode"]);
  const {
    signUp,
    isLoaded: signUpLoaded,
    setActive: setSignUpActive,
  } = useSignUp();
  const {
    isLoaded: signInLoaded,
    signIn,
    setActive: setSignInActive,
  } = useSignIn();
  const { signOut, getToken } = useAuth();
  const navigate = useNavigate();

  const form: any = useForm({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
      terms: true,
    },
    validate: {
      firstName: (val) => (val.length > 0 ? null : "First name is required"),
      lastName: (val) => (val.length > 0 ? null : "Last name is required"),
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
      confirmPassword: (val) =>
        val === form.values.password ? null : "Passwords do not match",
    },
  });

  const codeForm = useForm({
    initialValues: {
      code: "",
    },
    validate: {
      code: (val) => (val.length === 6 ? null : "Invalid code"),
    },
  });

  /**************** Hooks **************/
  const createUserMutation = useMutation<
    User & { userId: string },
    Error,
    User & { userId: string }
  >({
    mutationKey: ["users"],
    mutationFn: async (user: User & { userId: string }) =>
      createUser(user, await getToken()),
  });

  /**************** Form submit **************/
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    type === "register"
      ? onSubmitSignUp(form.values)
      : type === "registerCode"
        ? submitCode(codeForm.values)
        : onSubmitSignIn(form.values);
  };

  /**************** Sign in form submit **************/
  const onSubmitSignIn = async (inputData: {
    email: string;
    password: string;
  }) => {
    if (!signInLoaded) {
      return;
    }

    //  Clear the session to attempt to sign in
    await setSignInActive({ session: null });

    try {
      // Complete the sign in and get the session with Clerk
      const completeSignIn = await signIn.create({
        identifier: inputData.email,
        password: inputData.password,
      });

      // If the sign in was successful, set the active session and make the user request
      if (completeSignIn.status === "complete") {
        await setSignInActive({ session: completeSignIn.createdSessionId });

        // Get the user from the database
        console.log(completeSignIn.identifier);

        // Redirect to the dashboard
        navigate("/dashboard");
      }
    } catch (err) {
      // If the sign in was not successful, clear the session
      await setSignInActive({ session: null });

      // Handle errors
      console.error(JSON.stringify(err, null, 2));
    }
  };

  /**************** Sign up form submit (STEP 1) **************/
  const onSubmitSignUp = async (signUpData: {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
  }) => {
    if (!signUpLoaded) {
      return;
    }

    //  Clear the session to attempt to sign up
    await setSignUpActive({ session: null });

    try {
      // create the user
      await signUp.create({
        emailAddress: signUpData.email,
        firstName: signUpData.firstName,
        lastName: signUpData.lastName,
        password: signUpData.password,
      });

      // send the email verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to the email verification code input
      toggle("registerCode");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      // Handle errors
      console.error(JSON.stringify(err, null, 2));

      // if the error is that the email is already in use, show the error
      if (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        err.errors.some((error: any) => error.code === "form_identifier_exists")
      ) {
        form.setFieldError(
          "email",
          "That email address is taken. Please try another.",
        );
      }

      // if the error is that there is already a session, stop the session and retry
      if (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        err.errors.some((error: any) => error.code === "session_exists")
      ) {
        console.log("session already exists");
        await signOut();
        await onSubmitSignUp(signUpData);
      }
    }
  };

  /**************** Sign up form submit email code (STEP 2) **************/
  const submitCode = async (inputData: { code: string }) => {
    if (!signUpLoaded) {
      return;
    }

    try {
      // complete the sign up process with the email code
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: inputData.code,
      });

      // Handle success or failure for the email code verification
      if (completeSignUp.status !== "complete") {
        // handle the error
        console.log(JSON.stringify(completeSignUp, null, 2));
      } else {
        // create the user in the database
        createUserMutation.mutate(
          {
            email: signUp.emailAddress as string,
            role: Role.STUDENT,
            userId: completeSignUp.createdUserId as string,
          },
          {
            onSuccess: async () => {
              // set active
              await setSignUpActive({
                session: completeSignUp.createdSessionId,
              });
            },
          },
        );
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      // handle the error
      console.error(JSON.stringify(err, null, 2));
    }
  };

  useEffect(() => {
    const signOutUser = async () => {
      await signOut();
    };

    // sign out the user if they are already signed in when you go to the sign in page
    signOutUser();
  }, []);

  return (
    <div className={styles.pageContainer}>
      <Paper radius="md" p="xl" withBorder>
        {/**************** HEADER **************/}
        {(type === "register" || type === "login") && (
          <>
            <Text size="lg" fw={500}>
              Welcome to CleanVU, {type} with
            </Text>
          </>
        )}

        {/**************** FORM **************/}
        <form onSubmit={onSubmit}>
          <Stack>
            {/**************** FIRST AND LAST NAME **************/}
            {type === "register" && (
              <>
                <TextInput
                  label="First Name"
                  placeholder="Your first name"
                  value={form.values.firstName}
                  onChange={(event) =>
                    form.setFieldValue("firstName", event.currentTarget.value)
                  }
                  radius="md"
                />
                <TextInput
                  label="Last Name"
                  placeholder="Your last name"
                  value={form.values.lastName}
                  onChange={(event) =>
                    form.setFieldValue("lastName", event.currentTarget.value)
                  }
                  radius="md"
                />
              </>
            )}
            {/**************** EMAIL AND PASSWORD ***************/}
            {(type === "register" || type === "login") && (
              <>
                <TextInput
                  required
                  label="Email"
                  placeholder="hello@mantine.dev"
                  value={form.values.email}
                  onChange={(event) =>
                    form.setFieldValue("email", event.currentTarget.value)
                  }
                  error={form.errors.email && "Invalid email"}
                  radius="md"
                />

                <PasswordInput
                  required
                  label="Password"
                  placeholder="Your password"
                  value={form.values.password}
                  onChange={(event) =>
                    form.setFieldValue("password", event.currentTarget.value)
                  }
                  error={
                    form.errors.password &&
                    "Password should include at least 6 characters"
                  }
                  radius="md"
                />
              </>
            )}

            {/**************** CONFIRM PASSWORD **************/}
            {type === "register" && (
              <>
                <PasswordInput
                  required
                  label="Confirm password"
                  placeholder="Confirm your password"
                  value={form.values.confirmPassword}
                  onChange={(event) =>
                    form.setFieldValue(
                      "confirmPassword",
                      event.currentTarget.value,
                    )
                  }
                  error={
                    form.errors.confirmPassword && "Passwords do not match"
                  }
                  radius="md"
                />
                <Checkbox
                  label="I accept terms and conditions"
                  checked={form.values.terms}
                  onChange={(event) =>
                    form.setFieldValue("terms", event.currentTarget.checked)
                  }
                />
              </>
            )}
          </Stack>

          {/**************** FORGOT PASSWORD, TOGGLE, and SUBMIT **************/}
          {(type === "register" || type === "login") && (
            <Group justify="space-between" mt="xl">
              <Anchor
                component="button"
                type="button"
                c="dimmed"
                onClick={() => toggle()}
                size="xs"
              >
                {type === "register"
                  ? "Already have an account? Login"
                  : "Don't have an account? Register"}
              </Anchor>
              <Button type="submit" radius="xl">
                {upperFirst(type)}
              </Button>
            </Group>
          )}
        </form>

        {/**************** EMAIL CODE INPUT **************/}
        {type === "registerCode" && (
          <form onSubmit={onSubmit}>
            <Stack pr={20} pl={20} pb={20}>
              <Title order={3} mt={10} td={"underline"}>
                Let's make sure it's <i>really</i> you
              </Title>
              <Group gap={6}>
                <Text fw={300} size={"sm"}>{`Enter the code sent to`}</Text>
                <Text fw={600} size={"sm"}>{`${form.values.email}`}</Text>
              </Group>
              <Divider mt={10} mb={10} />
              <TextInput
                label="Code"
                placeholder="123456"
                value={codeForm.values.code}
                onChange={(event) =>
                  codeForm.setFieldValue("code", event.currentTarget.value)
                }
                radius="md"
              />
              <Button type="submit" radius="xl">
                {"Submit"}
              </Button>
            </Stack>
          </form>
        )}
      </Paper>
    </div>
  );
};

export default AuthPage;
