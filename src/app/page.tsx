import { Posts } from "@/app/components/Posts";
import { sanityFetch } from "@/sanity/lib/live";
import { postQuery } from "@/sanity/lib/queries";

export default async function Post() {
  const { data: posts } = await sanityFetch({
    query: postQuery
  });

  return <Posts posts={posts} />;
}