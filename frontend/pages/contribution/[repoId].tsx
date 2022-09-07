import { useRouter } from "next/router";

function ContributionPage() {
  const router = useRouter();
  router.query.repoId; //holds the value pf the url
  console.log(router.query.repoId);

  return <h2>AAAA</h2>;
}

export default ContributionPage;
