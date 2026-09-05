"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, X } from "lucide-react";
import { profile } from "@/data/profile";
import { Section } from "@/components/ui/Section";
import { ProjectVisual } from "@/components/ui/ProjectVisual";
import { TechChip } from "@/components/ui/TechChip";
import { ArchitectureStrip } from "@/components/ui/ArchitectureStrip";
import { ProjectHighlights, ProjectMetrics } from "@/components/ui/ProjectMetrics";
import type { ArchitectureNode, Project } from "@/types/profile";

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <Section id="projects" index="04" eyebrow="Projects" title="Selected work, explained.">
      <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {profile.projects.map((project, index) => (
          <motion.li
            key={project.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: index * 0.05 }}
          >
            <button
              type="button"
              data-cursor="view"
              onClick={() => setSelected(project)}
              className="glow-card group flex h-full w-full flex-col overflow-hidden rounded-[28px] border text-left transition-transform duration-300 hover:-translate-y-1.5"
              style={{
                borderColor: `color-mix(in oklab, ${project.visual.accent} 26%, var(--line))`,
                background: `color-mix(in oklab, ${project.visual.accent} var(--tint), var(--bg-elevated))`,
              }}
            >
              <ProjectVisual
                motif={project.visual.motif}
                accent={project.visual.accent}
                label={project.name}
                className="h-44 w-full transition-transform duration-500 group-hover:scale-[1.03] sm:h-48"
              />
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.16em]">
                  <span style={{ color: project.visual.accent }}>{project.category}</span>
                  <span className="text-[var(--fg-subtle)]">{project.year}</span>
                </div>
                <h3 className="display mt-3 text-2xl">{project.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--fg-muted)]">{project.shortDescription}</p>

                {project.metrics ? (
                  <div className="mt-5">
                    <ProjectMetrics metrics={project.metrics} accent={project.visual.accent} />
                  </div>
                ) : project.highlights ? (
                  <div className="mt-5">
                    <ProjectHighlights highlights={project.highlights} accent={project.visual.accent} />
                  </div>
                ) : null}

                <div className="mt-5">
                  <ArchitectureStrip
                    nodes={project.architecture}
                    accent={project.visual.accent}
                    max={4}
                  />
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <TechChip
                      key={tech}
                      label={tech}
                      accent={project.visual.accent}
                      className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] transition-transform duration-300 group-hover:-translate-y-0.5"
                    />
                  ))}
                </div>
                <span
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium"
                  style={{ color: project.visual.accent }}
                >
                  Case study
                  <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </button>
          </motion.li>
        ))}
      </ul>

      <AnimatePresence>
        {selected ? <ProjectModal project={selected} onClose={() => setSelected(null)} /> : null}
      </AnimatePresence>
    </Section>
  );
}

const ARCH_HUES = ["var(--c1)", "var(--c5)", "var(--c3)", "var(--c4)", "var(--c6)"];

function hueAt(index: number): string {
  return ARCH_HUES[index % ARCH_HUES.length] ?? "var(--c1)";
}

function ArchNodeCard({ node, hue, delay }: { node: ArchitectureNode; hue: string; delay: number }) {
  return (
    <motion.div
      className="h-full rounded-2xl border p-4"
      style={{
        borderColor: `color-mix(in oklab, ${hue} 28%, var(--line))`,
        background: `color-mix(in oklab, ${hue} var(--tint), var(--bg-elevated))`,
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <p className="section-kicker" style={{ color: hue }}>
        {node.label}
      </p>
      <p className="mt-2 text-sm text-[var(--fg-muted)]">{node.detail}</p>
    </motion.div>
  );
}

function Connector({ from, to }: { from: string; to: string }) {
  return (
    <div
      className="mx-auto h-6 w-px"
      aria-hidden
      style={{ backgroundImage: `linear-gradient(180deg, ${from}, ${to})` }}
    />
  );
}

/**
 * Branching case-study diagram. Each row holds one or two node ids; a two-node
 * row renders side by side to show stages that run in parallel, then the flow
 * merges back to a single column. Reads top-to-bottom without animation.
 */
function ArchitectureFlow({ nodes, rows }: { nodes: ArchitectureNode[]; rows: string[][] }) {
  const byId = new Map(nodes.map((node) => [node.id, node]));

  // Resolve node ids up front and give each node a stable color slot, so hue
  // assignment stays a pure function of position (no running mutation).
  const resolvedRows = rows.map((row) => ({
    items: row
      .map((id) => byId.get(id))
      .filter((node): node is ArchitectureNode => Boolean(node)),
  }));
  const startColorFor = (rowIndex: number): number =>
    resolvedRows.slice(0, rowIndex).reduce((sum, { items }) => sum + items.length, 0);

  return (
    <ol className="mt-5 space-y-0">
      {resolvedRows.map(({ items }, rowIndex) => {
        const startColor = startColorFor(rowIndex);
        if (items.length === 0) return null;

        const parallel = items.length > 1;
        const hasNext = rowIndex < resolvedRows.length - 1;

        return (
          <li key={items.map((node) => node.id).join("-")} className="relative pl-1">
            {parallel ? (
              <p className="mb-2 text-center text-[10px] uppercase tracking-[0.16em] text-[var(--fg-subtle)]">
                In parallel
              </p>
            ) : null}
            <div className={parallel ? "grid gap-3 sm:grid-cols-2" : ""}>
              {items.map((node, i) => (
                <ArchNodeCard
                  key={node.id}
                  node={node}
                  hue={hueAt(startColor + i)}
                  delay={rowIndex * 0.08}
                />
              ))}
            </div>
            {hasNext ? (
              <Connector
                from={hueAt(startColor + items.length - 1)}
                to={hueAt(startColorFor(rowIndex + 1))}
              />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

function getFocusable(root: HTMLElement): HTMLElement[] {
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (el) => el.getClientRects().length > 0,
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const accent = project.visual.accent;
  const dialogRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previouslyFocused =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const dialog = dialogRef.current;
      if (!dialog) return;

      const focusable = getFocusable(dialog);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) {
        event.preventDefault();
        return;
      }

      const active = document.activeElement;
      if (event.shiftKey) {
        if (active === first || !dialog.contains(active)) {
          event.preventDefault();
          last.focus();
        }
      } else if (active === last || !dialog.contains(active)) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      previouslyFocused?.focus();
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[75] flex items-end justify-center p-0 sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button
        type="button"
        tabIndex={-1}
        className="absolute inset-0 bg-black/55"
        aria-label="Close case study"
        onClick={onClose}
      />
      <motion.article
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-title"
        className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-[28px] border border-[var(--line)] bg-[var(--bg)] sm:rounded-[28px]"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 24, opacity: 0 }}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[var(--line)] bg-[var(--bg)]/90 px-5 py-3 backdrop-blur">
          <p className="section-kicker flex items-center gap-2.5">
            <span className="kicker-dot" aria-hidden />
            Case study
          </p>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="rounded-full p-2"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>
        <div className="space-y-10 p-5 sm:p-8">
          <header>
            <p className="text-xs uppercase tracking-[0.16em]">
              <span style={{ color: accent }}>{project.category}</span>
              <span className="text-[var(--fg-subtle)]"> · {project.year}</span>
            </p>
            <h3 id="case-title" className="display text-gradient mt-2 text-4xl">
              {project.name}
            </h3>
            <p className="mt-4 text-[var(--fg-muted)]">{project.overview}</p>
            <div className="mt-6">
              <ArchitectureStrip nodes={project.architecture} accent={accent} size="md" />
            </div>
            {project.metrics ? (
              <div className="mt-6 border-t border-[var(--line)] pt-6">
                <ProjectMetrics metrics={project.metrics} accent={accent} />
              </div>
            ) : project.highlights ? (
              <div className="mt-6 border-t border-[var(--line)] pt-6">
                <ProjectHighlights highlights={project.highlights} accent={accent} />
              </div>
            ) : null}
          </header>

          <StudyBlock title="Problem" body={project.problem} hue="var(--c2)" />
          <StudyBlock title="Solution" body={project.solution} hue="var(--c3)" />

          <div>
            <SubHeading title="Architecture" hue="var(--c6)" />
            {project.architectureFlow ? (
              <ArchitectureFlow nodes={project.architecture} rows={project.architectureFlow} />
            ) : (
              <ol className="mt-5 space-y-0">
                {project.architecture.map((node, index) => (
                  <li key={node.id} className="relative pl-1">
                    <ArchNodeCard node={node} hue={hueAt(index)} delay={index * 0.08} />
                    {index < project.architecture.length - 1 ? (
                      <Connector from={hueAt(index)} to={hueAt(index + 1)} />
                    ) : null}
                  </li>
                ))}
              </ol>
            )}
          </div>

          <div>
            <SubHeading title="Technologies" hue="var(--c1)" />
            <div className="mt-4 flex flex-wrap gap-2">
              {project.technologies.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <TechChip
                    label={tech}
                    accent={accent}
                    className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm"
                  />
                </motion.span>
              ))}
            </div>
          </div>

          <ListBlock title="Challenges" items={project.challenges} hue="var(--c4)" />
          <ListBlock title="Results" items={project.results} hue="var(--c5)" />

          {project.liveDemo ? (
            <div className="flex flex-wrap gap-3">
              <a
                href={project.liveDemo}
                className="btn-gradient rounded-full px-4 py-2 text-sm font-medium"
                target="_blank"
                rel="noreferrer"
              >
                Live demo
              </a>
            </div>
          ) : null}
        </div>
      </motion.article>
    </motion.div>
  );
}

function SubHeading({ title, hue }: { title: string; hue: string }) {
  return (
    <h4 className="display flex items-center gap-3 text-2xl">
      <span aria-hidden className="h-4 w-1 rounded-full" style={{ background: hue }} />
      {title}
    </h4>
  );
}

function StudyBlock({ title, body, hue }: { title: string; body: string; hue: string }) {
  return (
    <div>
      <SubHeading title={title} hue={hue} />
      <p className="mt-3 leading-relaxed text-[var(--fg-muted)]">{body}</p>
    </div>
  );
}

function ListBlock({ title, items, hue }: { title: string; items: string[]; hue: string }) {
  return (
    <div>
      <SubHeading title={title} hue={hue} />
      <ul className="mt-3 space-y-2">
        {items.map((item, i) => (
          <li
            key={`${title}-${i}`}
            className="rounded-xl border px-3 py-2 text-[var(--fg-muted)]"
            style={{
              borderColor: `color-mix(in oklab, ${hue} 22%, transparent)`,
              background: `color-mix(in oklab, ${hue} 7%, transparent)`,
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
