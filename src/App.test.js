import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("Sign up page", () => {
  let firstNameInput,
    lastNameInput,
    emailInput,
    passwordInput,
    termsAndConditionsChk,
    signUpButton,
    signInLink;

  beforeEach(() => {
    render(<App />);

    firstNameInput = screen.getByText("First Name");
    lastNameInput = screen.getByText("Last Name");
    emailInput = screen.getByText("Email Address");
    passwordInput = screen.getByText("Password");
    termsAndConditionsChk = screen.getByText(
      "I accept the terms and conditions"
    );
    signUpButton = screen.getAllByText(/sign up/i)[1];
    signInLink = screen.getByText("Already have an account? Sign in");
  });

  test("Fill out sign up form and see confirmation", () => {
    userEvent.type(firstNameInput, "Stefan");
    userEvent.type(lastNameInput, "Hyltoft");
    userEvent.type(emailInput, "stefanhyltoft@gmail.com");
    userEvent.type(passwordInput, "MyPassw0rt");
    userEvent.click(termsAndConditionsChk);
    userEvent.click(signUpButton);

    const checkForActivationLink = screen.getByText(
      "Thank you for signing up! Please check your email for activation link."
    );
  });

  test("Missing fields", () => {
    userEvent.click(signUpButton);

    const checkForActivationLink = screen.queryByText(
      "Thank you for signing up! Please check your email for activation link."
    );
    expect(checkForActivationLink).toBeNull();
  });
});
