import ClientRepresentation from "@keycloak/keycloak-admin-client/lib/defs/clientRepresentation";
import type { Environment } from "../environment";
import { joinPath } from "./joinPath";

export const convertClientToUrl = (
  { rootUrl, baseUrl }: ClientRepresentation,
  environment: Environment,
) => {
  // absolute base url configured, use base url is
  if (baseUrl?.startsWith("http")) {
    return baseUrl;
  }

  if (rootUrl === "${authAdminUrl}") {
    return rootUrl.replace(/\$\{(authAdminUrl)\}/, environment.adminBaseUrl);
  }

  if (rootUrl === "${authBaseUrl}") {
    return rootUrl.replace(/\$\{(authBaseUrl)\}/, environment.serverBaseUrl);
  }

  if (rootUrl?.startsWith("http")) {
    if (baseUrl) {
      return joinPath(rootUrl, baseUrl);
    }
    return rootUrl;
  }

  return baseUrl;
};
