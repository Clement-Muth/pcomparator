import { Trans } from "@lingui/macro";
import { withLinguiPage } from "~/core/withLinguiLayout";

const HomePage = () => {
  return (
    <h1>
      <Trans>Hello</Trans>
    </h1>
  );
};

export default withLinguiPage(HomePage);
