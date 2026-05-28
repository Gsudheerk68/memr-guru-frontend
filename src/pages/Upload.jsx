export default function Upload() {
  return (
    <div className="max-w-4xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">
        Upload Meme Template
      </h1>

      <form className="space-y-5">

        <input
          type="text"
          placeholder="Movie Name"
          className="w-full p-4 bg-slate-900 rounded-xl"
        />

        <input
          type="text"
          placeholder="Actor Name"
          className="w-full p-4 bg-slate-900 rounded-xl"
        />

        <input
          type="file"
          className="w-full p-4 bg-slate-900 rounded-xl"
        />

        <button
          className="
          bg-purple-600
          px-8
          py-4
          rounded-xl">
          Upload
        </button>
}
