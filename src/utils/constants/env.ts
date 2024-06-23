// interface EnvConstantSet {
//   baseURL: string;
// }

// declare global {
//   interface Window {
//     __ENV_STATE__: string;
//   }
// }

export const API_BASE_URL = "https://api.xn--oi2b31he2e32g.xn--3e0b707e/";

// const environmentVariables: { [key: string]: EnvConstantSet } = {
//   development: {
//     baseURL: API_BASE_URL,
//   },
// };

// export function getEnvConstant<T extends keyof EnvConstantSet>(key: T) {
//   if (window && window.__ENV_STATE__) {
//     try {
//       const envObj = JSON.parse(decodeURIComponent(window.__ENV_STATE__));
//       return envObj[key];
//     } catch (e) {
//       // console.table(e);
//     }
//   }

//   const distEnv = process.env.DIST_ENV;

//   if (distEnv === undefined) {
//     throw new Error("DIST_ENV 가 정의되지 않았습니다.");
//   }
//   const constantSet = environmentVariables[distEnv];

//   if (constantSet === undefined) {
//     throw new Error(`허용하지 않는 DIST_ENV 입니다: ${distEnv}`);
//   }

//   return constantSet[key];
// }
