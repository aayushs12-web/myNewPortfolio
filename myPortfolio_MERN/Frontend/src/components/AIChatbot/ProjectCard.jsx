import React from "react";
import { ExternalLink, Sparkles, FolderGit2 } from "lucide-react";
import { FaGithub } from "react-icons/fa6";

export default function ProjectCard({ project, onActionClick }) {
  if (!project || typeof project !== "object") return null;

  const title = project.title || "Project Details";
  const description = project.description || "";
  const tags = Array.isArray(project.tags) ? project.tags : [];
  const githubUrl = typeof project.githubUrl === "string" ? project.githubUrl : null;
  const liveUrl = typeof project.liveUrl === "string" ? project.liveUrl : null;

  return (
    <div className="my-2.5 rounded-xl border border-[#BE93FD]/30 bg-[#160E26]/85 backdrop-blur-md p-3.5 hover:border-[#D65DB1]/50 hover:shadow-[0_0_20px_rgba(214,93,177,0.2)] transition-all duration-300">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#BE93FD]/15 border border-[#BE93FD]/40 flex items-center justify-center text-[#BE93FD]">
            <FolderGit2 className="w-3.5 h-3.5 text-[#DCB0FF]" />
          </div>
          <div>
            <h4 className="font-heading font-semibold text-[13px] text-[#FDF7FF] leading-snug">
              {title}
            </h4>
            {project.featured && (
              <span className="inline-block text-[9px] uppercase tracking-wider font-bold text-[#FF6F91] bg-[#FF6F91]/15 px-1.5 py-0.5 rounded border border-[#FF6F91]/30">
                Featured
              </span>
            )}
          </div>
        </div>
      </div>

      {description && (
        <p className="text-[11px] text-[#CBB5E2] leading-relaxed mb-3">
          {description}
        </p>
      )}

      {/* Tech Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {tags.map((tag, idx) => (
            <span
              key={`tag-${idx}`}
              className="text-[10px] font-mono-tech px-2 py-0.5 rounded-full bg-[#845EC2]/20 border border-[#BE93FD]/30 text-[#DCB0FF]"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center gap-2 pt-2 border-t border-white/10">
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#221538] hover:bg-[#311D4E] text-[#FDF7FF] border border-[#BE93FD]/25 text-[11px] font-medium transition-colors"
          >
            <FaGithub className="w-3 h-3 text-[#DCB0FF]" />
            <span>GitHub</span>
          </a>
        )}

        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#845EC2]/30 hover:bg-[#845EC2]/50 text-[#FDF7FF] border border-[#BE93FD]/40 text-[11px] font-medium transition-colors"
          >
            <ExternalLink className="w-3 h-3 text-[#FF6F91]" />
            <span>Live Demo</span>
          </a>
        )}

        {onActionClick && (
          <button
            type="button"
            onClick={() => onActionClick(`Tell me more about the ${title} project and architecture.`)}
            className="ml-auto flex items-center gap-1 text-[10px] text-[#DCB0FF] hover:text-[#FF6F91] transition-colors cursor-pointer py-1 px-2 rounded hover:bg-white/5"
          >
            <Sparkles className="w-3 h-3 text-[#FF6F91]" />
            <span>Ask details</span>
          </button>
        )}
      </div>
    </div>
  );
}
