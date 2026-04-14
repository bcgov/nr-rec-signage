import Keycloak, {
  KeycloakInitOptions,
  KeycloakLoginOptions,
} from "keycloak-js";

interface CustomLoginOptions extends KeycloakLoginOptions {
  pres_req_conf_id?: string;
}

const _kc = new Keycloak({
  url: import.meta.env.VITE_SSO_AUTH_SERVER_URL,
  realm: import.meta.env.VITE_SSO_REALM,
  clientId: import.meta.env.VITE_SSO_CLIENT_ID,
});

const loginOptions: CustomLoginOptions = {
  redirectUri: window.location.origin+"/",
  idpHint: "",
  pres_req_conf_id: import.meta.env.VITE_PRES_REQ_CONF_ID,
};

export const initializeKeycloak = async () => {
  try {
    // Check if Keycloak is already initialized

    _kc.onTokenExpired = () => {
      _kc
        .updateToken(5)
        .then((refreshed: boolean) => {
        })
        .catch(() => {
          alert("Failed to refresh the token, or the session has expired");
        });
    };

    const initOptions: KeycloakInitOptions = {
      pkceMethod: "S256",
      checkLoginIframe: false,
      onLoad: "check-sso",
    };

    const auth = await _kc.init(initOptions);

    if (auth) {
      return _kc;
    } else {
      if (loginOptions.pres_req_conf_id) {
        const loginURL = await _kc.createLoginUrl(loginOptions);

        if (loginURL) {
          window.location.href =
            loginURL +
            "&pres_req_conf_id=" +
            loginOptions.pres_req_conf_id;
        }
      } else {
        console.warn(
          "DC needs a VITE_PRES_REQ_CONF_ID env variable defined to work properly"
        );
        _kc.login(loginOptions);
      }
    }
  } catch (err) {
    console.error(err);
  }
};
