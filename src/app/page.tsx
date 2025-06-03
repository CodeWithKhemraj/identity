`use client`
import Link from "next/link";
import { PortableText, type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/lib/client";

// Sanity Query
const POSTS_QUERY = `*[
  _type == "post" && defined(slug.current)
]|order(publishedAt desc)[0...12]{
  _id, title, slug, publishedAt, body, mainImage
}`;

// ISR options
const options = { next: { revalidate: 30 } };

// Get Sanity config and build image URL helper
const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset ? imageUrlBuilder({ projectId, dataset }).image(source) : null;

export default async function Home() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

  return (
    <main className="container mx-auto min-h-screen max-w-7xl p-4 md:p-8">
      <h1 className="text-4xl font-bold mb-8 text-black">Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <article 
            key={post._id} 
            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            <Link href={`/${post.slug.current}`} className="block">
              {post.mainImage && (
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={urlFor(post.mainImage)?.width(800).height(450).url() ?? ""}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold text-black mb-2 line-clamp-2">{post.title}</h2>
                <time className="text-sm text-gray-600">
                  {new Date(post.publishedAt).toLocaleDateString()}
                </time>
                <div className="mt-4 text-gray-700 line-clamp-3">
                  {Array.isArray(post.body) && <PortableText value={post.body} />}
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
