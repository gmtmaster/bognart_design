import { notFound } from "next/navigation";
import { getProject, getProjectParams } from "@/lib/projects";
import ProjectGalleryClient from "./ProjectGalleryClient";
import Link from "next/link";


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
    if (!project) {
        return (
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-2xl font-bold">DEBUG: project not found</h1>
                    <pre className="mt-4 rounded bg-stone-100 p-4 text-sm overflow-auto">
{JSON.stringify(
    {
        params,
        slug: params?.slug,
        allSlugs: projects.map(p => p.slug),
    },
    null,
    2
)}
        </pre>
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
