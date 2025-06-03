import { groq } from "next-sanity";

export type POSTQUERYResult = {
  title: string;
  slug: string;
  author: string;
  authorImage: string;
  mainImage: string;
  categories: string[];
  publishedAt: string;
  body: any;
};

export const postQuery = groq`
*[_type == "post"] {
  title,
  "slug": slug.current,
  "author": author->name,
  "authorImage": author->image,
  "mainImage": mainImage.asset->url,
  "categories": categories[]->title,
  publishedAt,
  body,
}
`;
