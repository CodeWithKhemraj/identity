// src app/components/Posts.tsx

import { POSTQUERYResult } from '@/sanity/lib/queries';
import { PortableText } from '@portabletext/react';

export function Posts({ posts }: { posts: POSTQUERYResult[] }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.slug}>
          <h2>{post.title}</h2>
          <p>Published by {post.author} on {post.publishedAt}</p>
          <img src={post.mainImage} alt={post.title} />
          <PortableText value={post.body} />
        </li>
      ))}
    </ul>
  );
}