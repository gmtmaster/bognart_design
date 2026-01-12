import { getProject } from "@/lib/projects";

export default function Page({ params }) {
    const project = getProject(params.slug);

    return (
        <pre style={{ padding: 24 }}>
      {JSON.stringify({ slug: params.slug, found: !!project }, null, 2)}
    </pre>
    );
}
