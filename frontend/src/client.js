import createClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
    projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
    dataset: 'production',
    apiVersion: '2024-02-19',
    useCdn: true,
    token: process.env.REACT_APP_SANITY_TOKEN
});

export async function getPosts(type) {
    const posts = await client.fetch('*[_type == "' + type + '"]')
    return posts
  }
  
  export async function createPost(post) {
    const result = client.create(post)
    return result
  }
  
  export async function updateDocumentTitle(_id, title) {
    const result = client.patch(_id).set({title})
    return result
  }


const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);