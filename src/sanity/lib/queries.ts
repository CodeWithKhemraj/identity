import { defineQuery } from 'next-sanity'
// import { defineQuery } from 'groq' // in other frameworks

const Post_Query = defineQuery(`*[_type == "posts"{_id, name, slug, date}|order(date desc)`)