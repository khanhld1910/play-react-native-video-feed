## Prerequisites

- make sure you have the development environment following [this post](https://reactnative.dev/docs/environment-setup)
- If your computer is an M1 apple macbook, take a look at [this post](https://medium.com/@alberto.schiabel/how-to-fix-pod-install-error-in-react-native-on-mac-m1-5d79dc52f7e8)

## Quick Start

First, install node modules and libraries

```bash
yarn install
```

Go to ios folder and ios native libraries

```bash
cd ios && pod install
```

For macbook M1 (make sure you are already install Rosseta)

```bash
cd ios && arch -x86_64 pod install
```

Open `ios/AwesomeProject.xcworkspace` by Xcode, try to build the app

Since there, each time you want to work with the app:

- start the local server

```bash
yarn start
```

- open the simulator and open the application icon
