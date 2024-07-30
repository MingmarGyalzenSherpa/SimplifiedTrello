import { Routes } from "../constants/Routes";
import { navigateTo } from "../utils/Navigate";
import * as AuthService from "../services/authService";
import { ISignupCredential } from "../interfaces/ISignupCredential";
import { validate } from "../utils/validator";
import { createUserBodySchema } from "../schema/authSchema";
import { IError } from "../interfaces/IError";
export class Signup {
  state: {
    credential: ISignupCredential;
  };
  elements: {
    parentEl?: HTMLElement;
    firstNameInputEl?: HTMLInputElement;
    lastNameInputEl?: HTMLInputElement;
    userNameInputEl?: HTMLInputElement;
    emailInputEl?: HTMLInputElement;
    passwordInputEl?: HTMLInputElement;
    confirmPasswordInputEl?: HTMLInputElement;
    loginLink?: HTMLAnchorElement;
  };
  passwordMismatch: boolean;

  constructor(parentEL: HTMLElement) {
    this.state = {
      credential: {
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
    };

    this.passwordMismatch = false;

    this.elements = {};
    this.elements.parentEl = parentEL;

    this.render();

    //call initial setup
    setTimeout(this.initialSetup, 0);
  }

  initialSetup = () => {
    this.setupEventListener();
  };

  setupEventListener = () => {
    //input event listener
    this.elements.firstNameInputEl = document?.querySelector("#first-name")!;
    this.elements.lastNameInputEl = document?.querySelector("#last-name")!;
    this.elements.userNameInputEl = document?.querySelector("#username")!;
    this.elements.emailInputEl = document?.querySelector("#email")!;
    this.elements.passwordInputEl = document?.querySelector("#password")!;
    this.elements.confirmPasswordInputEl =
      document?.querySelector("#confirm-password")!;

    this.elements.firstNameInputEl.addEventListener(
      "input",
      this.handleFirstName
    );

    this.elements.lastNameInputEl.addEventListener(
      "input",
      this.handleLastName
    );

    this.elements.userNameInputEl.addEventListener(
      "input",
      this.handleUserName
    );

    this.elements.emailInputEl.addEventListener("input", this.handleEmail);

    this.elements.passwordInputEl.addEventListener(
      "input",
      this.handlePassword
    );

    this.elements.confirmPasswordInputEl.addEventListener(
      "input",
      this.handleConfirmPassword
    );

    //link event listener
    this.elements.loginLink = document?.querySelector("#login-link")!;

    this.elements.loginLink.addEventListener("click", this.handleLoginLink);

    //handle submit
    this.handleSubmit();
  };

  private handleLoginLink = (e: Event) => {
    e.preventDefault();
    // this.clean();

    navigateTo(Routes.LOGIN);
  };

  private handleFirstName = (e: Event) => {
    this.state.credential.firstName = (e.target as HTMLInputElement)?.value;
    this.showError({ error: "firstName", message: "" });
  };

  private handleLastName = (e: Event) => {
    this.state.credential.lastName = (e.target as HTMLInputElement)?.value;
    this.showError({ error: "lastName", message: "" });
  };

  private handleUserName = (e: Event) => {
    this.state.credential.username = (e.target as HTMLInputElement)?.value;
    this.showError({ error: "username", message: "" });
  };

  private handleEmail = (e: Event) => {
    this.state.credential.email = (e.target as HTMLInputElement)?.value;
    this.showError({ error: "email", message: "" });
  };

  /**
   * Handle password
   * @param e
   */
  private handlePassword = (e: Event) => {
    this.showError({ error: "password", message: "" });

    this.state.credential.password = (e.target as HTMLInputElement)?.value;
    if (
      this.state.credential.password != this.state.credential.confirmPassword
    ) {
      this.showError({
        error: "confirmPassword",
        message: "Password doesn't match",
      });
      this.passwordMismatch = true;
    } else {
      this.showError({ error: "confirmPassword", message: "" });
      this.passwordMismatch = false;
    }
  };

  /**
   * Handle confirm password
   * @param e
   */
  private handleConfirmPassword = (e: Event) => {
    this.showError({ error: "confirmPassword", message: "" });

    this.state.credential.confirmPassword = (
      e.target as HTMLInputElement
    )?.value;
    if (
      this.state.credential.password != this.state.credential.confirmPassword
    ) {
      this.showError({
        error: "confirmPassword",
        message: "Password doesn't match",
      });
      this.passwordMismatch = true;
    } else {
      this.passwordMismatch = false;
    }
  };

  /**
   * Handle form submit
   */
  private handleSubmit = () => {
    const submitBtn = document?.querySelector("#submit");
    submitBtn?.addEventListener("click", async (e) => {
      try {
        e.preventDefault();

        const { errors, success } = validate(
          createUserBodySchema,
          this.state.credential
        );
        if (errors) {
          errors.forEach((error) => this.showError(error));
        }
        if (this.passwordMismatch) return;

        await AuthService.signup(this.state.credential);

        //redirect to login
        navigateTo(Routes.LOGIN);
      } catch (error: any) {}
    });
  };

  /**
   * Show error message
   * @param errorMessage - error message
   */
  private showError(errorDetails: IError) {
    const errorEl = document?.querySelector(`.error-${errorDetails.error}`)!;
    errorEl.textContent = errorDetails.message;
  }

  /**
   * CLear all event listener
   */
  clean = () => {
    this.elements.firstNameInputEl?.removeEventListener(
      "input",
      this.handleFirstName
    );

    this.elements.lastNameInputEl?.removeEventListener(
      "input",
      this.handleLastName
    );

    this.elements.userNameInputEl?.removeEventListener(
      "input",
      this.handleUserName
    );

    this.elements.emailInputEl?.removeEventListener("input", this.handleEmail);

    this.elements.passwordInputEl?.removeEventListener(
      "input",
      this.handlePassword
    );

    this.elements.confirmPasswordInputEl?.removeEventListener(
      "input",
      this.handleConfirmPassword
    );

    this.elements.loginLink?.removeEventListener("click", this.handleLoginLink);
  };

  /**
   * Render html
   */
  render = () => {
    this.elements.parentEl!.innerHTML = `
     <div id="signup-container" class="mx-auto w-min h-min my-10 border px-5 py-10 shadow-lg relative flex flex-col text-gray-700 bg-transparent  rounded-xl bg-clip-border">
  
  <div class="flex gap-1 justify-center align-baseline mb-2">
   <img src="trello.png" class="w-9 h-9"> 
    <h4 class="block font-extrabold text-center  text-3xl antialiased  leading-snug tracking-normal text-blue-gray-900">
    Trello
  </h4>
  </div>

   
  <p class="text-center text-black">Create a new Account</p>
  <form class="max-w-screen-lg mt-8 mb-2 w-80 sm:w-96">
     <div  class="flex flex-row gap-2 mb-5 ">
        <div >
         <h6
        class="block mb-3  text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
         First Name
      </h6>
       <div class="relative h-11 w-full min-w-[100px]">
        <input placeholder="John" id="first-name"
          class="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3  text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
        <label
          class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
      <p class="error-firstName mb-3 text-red-400">  </p>

      </div>
        </div>
        <div >
         <h6
        class="block mb-3  text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
         Last Name
      </h6>
       <div class="relative h-11 w-full min-w-[100px]">
        <input placeholder="Doe" id="last-name"
          class="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3  text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
        <label
          class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
      <p class="error-lastName mb-3 text-red-400">  </p>

      </div>
        </div>

    </div>
     <div class="flex flex-col gap-6 mb-1">

      <h6
        class="block -mb-3  text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
         Username
      </h6>
      <div class="relative h-11 w-full min-w-[200px]">
        <input placeholder="pretty boi" id="username"
          class="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3  text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
        <label
          class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
      <p class="error-username text-red-400">  </p>

      </div>
    <div class="flex flex-col gap-6 mb-1">

      <h6
        class="block -mb-3  text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
         Email
      </h6>
      <div class="relative h-11 w-full min-w-[200px]">
        <input placeholder="name@mail.com" id="email"
          class="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3  text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
        <label
          class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
      <p class="error-email text-red-400">  </p>

      </div>
      <h6
        class="block -mb-3  text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
        Password
      </h6>
      <div class="relative h-11 w-full min-w-[200px]">
        <input type="password" placeholder="********" id="password"
          class="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3  text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
        <label
          class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
    <p class="error-password text-red-400">  </p>

      </div>
      <h6
        class="block -mb-3  text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
        Confirm Password
      </h6>
      <div class="relative h-11 w-full min-w-[200px]">
        <input type="password" placeholder="********" id="confirm-password"
          class="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3  text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
        <label
          class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
      </div>
    <p class="error-confirmPassword text-red-400">  </p>

    </div>
    
    <button id="submit"
      class="mt-0 block w-full select-none rounded-md bg-blue-700 py-3 px-6 text-center align-middle  text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      type="button">
      Log in
    </button>
    <p class="block mt-4  text-base antialiased font-normal leading-relaxed text-center text-gray-700">
      Already have an account?
      <a href="#" id="login-link" class="font-medium text-blue-700 ">
        Login
      </a>
    </p>
  </form>
</div>    
    `;
  };
}
