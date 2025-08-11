import Image from "next/image";
import { notFound } from "next/navigation";
import { getProject, getProjectParams } from "@/lib/projects";
import ProjectGalleryClient from "./ProjectGalleryClient";

export function generateStaticParams() {
    return getProjectParams();
}

export function generateMetadata({ params }) {
    const project = getProject(params.slug);
    if (!project) return {};
    return {
        title: `${project.title} — BOGNART`,
        description: project.blurb,
        openGraph: {
            title: project.title,
            description: project.blurb,
            images: project.cover ? [{ url: project.cover }] : [],
        },
    };
}

export default function ProjectPage({ params }) {
    const project = getProject(params.slug);
    if (!project) return notFound();

    return (
        <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="mb-8 flex items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl md:text-5xl font-bold text-stone-900">
                            {project.title}
                        </h1>
                        {project.blurb && (
                            <p className="mt-3 text-stone-600 max-w-2xl">{project.blurb}</p>
                        )}
                    </div>
                    <a
                        href="/#projects"
                        className="text-stone-600 hover:text-amber-700 underline underline-offset-4"
                    >
                        ← Vissza a projektekhez
                    </a>
                </div>

                {/* Animated gallery lives in a client component */}
                <ProjectGalleryClient images={project.images} title={project.title} />
            </div>
        </section>
    );
}
