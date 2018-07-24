# employee-directory-react-native

A basic employee directory application using React Native and Apollo.

## Usage

### 1. Clone repository & install dependencies

```sh
git clone https://github.com/WajeehZantout/employee-directory-react-native
```

Then run:

```sh
cd employee-directory-react-native
yarn install
```

### 2. Install React Native dependencies

If you already have React Native installed, you can skip this step. Otherwise, follow the `Installing dependencies` instructions found in the `Building Projects with Native Code` section of this [Getting Started tutorial](https://facebook.github.io/react-native/docs/getting-started.html).

### 3. Run the app

Before running the app, make sure the [server](https://github.com/WajeehZantout/employee-directory-node) is running. After that, replace `<SERVER_URL>` in [App.js](https://github.com/WajeehZantout/employee-directory-react-native/blob/master/App.js) with the server's url.

To run the app on iOS:

```sh
react-native run-ios
```

or

Open `ios\EmployeeDirectory.xcodeproj` in Xcode and hit the `Run` button

To run the app on Android:

```sh
react-native run-android
```
