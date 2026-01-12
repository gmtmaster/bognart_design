"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import ProjectGalleryClient from "./ProjectGalleryClient";
import { getProject, getProjectParams } from "@/lib/projects";

export default function ProjectPageClient() {
    const params = useParams();
    const slug = typeof params?.slug === "string" ? params.slug : "";

    const project = getProject(slug);

    if (!project) {
        return (
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-2xl font-bold">Projekt nem található</h1>
                    <pre className="mt-4 rounded bg-stone-100 p-4 text-sm overflow-auto">
            {JSON.stringify(
                {
                    slug,
                    allSlugs: getProjectParams().map((p) => p.slug),
                },
                null,
                2
            )}
          </pre>
                    <Link
                        href="/#referenciak"
                        className="mt-6 inline-block text-stone-600 hover:text-amber-700 underline underline-offset-4"
                    >
                        ← Vissza a referenciákhoz
                    </Link>
                </div>
            </section>
        );
    }

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

                    <Link
                        href="/#referenciak"
                        className="text-stone-600 hover:text-amber-700 underline underline-offset-4"
                    >
                        ← Vissza a referenciákhoz
                    </Link>
                </div>

                <ProjectGalleryClient images={project.images} title={project.title} />
            </div>
        </section>
    );
}
