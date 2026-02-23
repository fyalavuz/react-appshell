import { source } from '@/lib/source';
import { DocsPage, DocsBody } from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';
import type { FC } from 'react';
import type { MDXProps } from 'mdx/types';
import type { TableOfContents } from 'fumadocs-core/toc';

interface MDXPageData {
  title: string;
  description?: string;
  body: FC<MDXProps>;
  toc: TableOfContents;
}

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const data = page.data as unknown as MDXPageData;
  const MDXContent = data.body;

  return (
    <DocsPage toc={data.toc}>
      <DocsBody>
        <MDXContent />
      </DocsBody>
    </DocsPage>
  );
}

export function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const data = page.data as unknown as MDXPageData;

  return {
    title: data.title,
    description: data.description,
  };
}
