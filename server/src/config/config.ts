// containter for all environments

const environments = {
  development: {},
  production: {},
  testing: {}
};

// development environment (default)
environments.development = {
  httpPort: 3000,
  hostName: "http://127.0.0.1:4200",
  envName: "development",
  appName: "Video Chat App",
  secret: "thisisadevelopmentsecret",
  mongoUrl:
    "mongodb+srv://viru:viru@cluster0-guor3.mongodb.net/test?retryWrites=true&w=majority"
};

// production environment
environments.production = {
  httpPort: 3000,
  hostName: "http://127.0.0.1:3000",
  envName: "production",
  appName: "Video Chat App",
  secret: "thisisaproductionsecret",
  mongoUrl:
    "mongodb+srv://viru:viru@cluster0-guor3.mongodb.net/test?retryWrites=true&w=majority"
};

// testing environment
environments.testing = {
  httpPort: 1000,
  hostName: "http://127.0.0.1:1000",
  envName: "testing",
  appName: "Video Chat App",
  secret: "thisistestingsecret",
  mongoUrl:
    "mongodb+srv://viru:viru@cluster0-guor3.mongodb.net/test?retryWrites=true&w=majority"
};

// determine which environment was passed as a command-line argument
const currentEnvironment =
  typeof process.env.NODE_ENV == "string" && process.env.NODE_ENV.trim() !== ""
    ? process.env.NODE_ENV
    : "development";

//chech that the current environment is one of the environments above, if not, default to development
// export the module
export const config =
  typeof environments[currentEnvironment] == "object"
    ? environments[currentEnvironment]
    : environments.development;

export const applicationData = {
  accountActivation: {
    link: `${environments[currentEnvironment].hostName}/#/accountActivation/?token=`,
    linkDescription: "Click here to activate your account",
    subject: "Account Activation",
    text1: `Welcome to Video Chat App, You account is created.`,
    text2: "Click on the below link to activate your account.",
    text3: "",
    template: "general-mail.ejs",
    hostName: environments[currentEnvironment].hostName
  },
  forgotPassword: {
    link: `${environments[currentEnvironment].hostName}/#/resetPassword/?token=`,
    linkDescription: "Click here to reset your password",
    subject: "Reset Password",
    text1:
      "We have received the request to reset your password associated with this e-mail address and have created the reset password link.",
    text2:
      "If you have not requested for your password reset, you can safely ignore this email. Rest assured your customer account is safe.",
    text3: "",
    template: "general-mail.ejs",
    hostName: environments[currentEnvironment].hostName
  },
  responseMessages: {
    accountActivation:
      "your account is created, please check your mail to activate your account."
  }
};
