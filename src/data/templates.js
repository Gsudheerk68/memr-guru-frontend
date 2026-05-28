
const templates = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  movie: `Movie ${i + 1}`,
  actor: `Actor ${i + 1}`,
  dialogue: `Legendary meme dialogue ${i + 1}`,
  likes: Math.floor(Math.random() * 10000),
  views: Math.floor(Math.random() * 50000),
  image: `https://picsum.photos/500/700?random=${i}`,
}))

export default templates
