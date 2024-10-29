import { HTTPError } from "ky";
import type { AuthRepository } from "~/applications/Authentication/Domain/Repositories/ProfileRepository";
import { OpenFoodFactPricesApiClient } from "~/clients/OpenFoodFactPricesApiClient";

const OP_DEFAULT_PARAMS = {
  app_name: "pcomparator"
};

function buildURLParams(params = {}) {
  return new URLSearchParams({ ...OP_DEFAULT_PARAMS, ...params });
}

export class PcomparatorAuthRepository implements AuthRepository {
  async signin(username: string, password: string): Promise<{ accessToken: string }> {
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);

      const { access_token } = await OpenFoodFactPricesApiClient.post(`auth?${buildURLParams()}`, {
        body: formData
      }).json<{ access_token: string }>();

      return { accessToken: access_token };
    } catch (err) {
      console.log(err instanceof HTTPError);
      throw err;
    }
  }
}
