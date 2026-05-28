import { FaHeart, FaEye } from "react-icons/fa";

export default function TemplateCard({ template }) {
  return (
    <div
      className="
      bg-slate-900
      rounded-2xl
      overflow-hidden
      hover:scale-105
      transition
      duration-300
      border border-slate-800
    "
    >
      {/* Media */}
      {template.mediaType === "video" ? (
        <video
          src={template.mediaUrl}
          controls
          className="h-60 w-full object-cover"
        />
      ) : (
        <img
          src={template.mediaUrl || template.image}
          alt={template.movie}
          className="h-60 w-full object-cover"
        />
      )}

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-lg">
          {template.movie}
        </h3>

        <p className="text-slate-400 mt-2 line-clamp-2">
          {template.dialogue}
        </p>

        <div className="flex items-center justify-between mt-4 text-sm">
          <span className="text-slate-300">
            {template.actor}
          </span>

          <div className="flex items-center gap-4 text-slate-400">
            <div className="flex items-center gap-1">
              <FaHeart />
              <span>{template.likes || 0}</span>
            </div>

            <div className="flex items-center gap-1">
              <FaEye />
              <span>{template.views || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
