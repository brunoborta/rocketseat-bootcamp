import { NativeModules } from 'react-native';

export const host = NativeModules.SourceCode.scriptURL
  .split('://')[1]
  .split(':')[0];
