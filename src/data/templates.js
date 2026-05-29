
const templates = Array.from({ length: 1}, (_, i) => ({
  id: i + 1,
  movie: `Movie ${i + 1}`,
  actor: `Actor ${i + 1}`,
  dialogue: `Legendary meme dialogue ${i + 1}`,
  likes: 0,
  views: 0,
  image: `https://picsum.photos/500/700?random=${i}`,
}))

export default templates
