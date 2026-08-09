import { createFileRoute } from "@tanstack/react-router";
import { PageLayout, PageHeader, PageSection } from "@/components/layout/PageLayout";
import { CreateYourSongWizard } from "@/components/create-your-song/CreateYourSongWizard";
import { createYourSongPage } from "@/content/pages";
import { pageMeta, withBrand } from "@/lib/seo";

export const Route = createFileRoute("/create-your-song")({
  head: () => ({
    meta: pageMeta({
      title: withBrand("Create Your Song"),
      description: createYourSongPage.description,
    }),
  }),
  component: CreateYourSongPage,
});

function CreateYourSongPage() {
  return (
    <PageLayout>
      <PageHeader
        eyebrow={createYourSongPage.eyebrow}
        title={createYourSongPage.title}
        subtitle={createYourSongPage.description}
      />
      <PageSection>
        <CreateYourSongWizard />
      </PageSection>
    </PageLayout>
  );
}
