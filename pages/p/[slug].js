import Navbar from "@/components/shared/navbar";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";
import { pageFilePaths, PAGES_PATH } from "@/utils/mdx-remote";
import fs from "fs";
import matter from "gray-matter";
import Footer from "@/components/shared/footer";
import { useRouter } from "next/router";
import StaticPageHeader from "@/components/shared/static-page-header";
import Head from "next/head";

const components = {};

export default function Post({ source, frontMatter }) {
    const router = useRouter();
    const { slug } = router.query;
    const { template } = frontMatter;

    // if (template === "fullwidth-1") {
        return (
            <>
                <Head>
                    <title>{frontMatter.title} | CrowdFund NFT</title>
                    <meta
                        name="description"
                        content={frontMatter.subtitle}
                    />
                </Head>
                
                <Navbar />
                <StaticPageHeader
                    title={frontMatter.title}
                    description={frontMatter.subtitle}
                />
                <div className="w-full relative bg-white">
                    <div className="w-full max-w-5xl mx-auto flex flex-col lg:flex-row space-x-2">
                        <article
                            className="prose mx-auto relative w-full flex flex-col p-4 space-y-4 leading-loose text-gray-700"
                        >
                            <MDXRemote {...source} components={components} />
                        </article>
                    </div>
                </div>
                <Footer />
            </>
        )
    // }
}

export const getStaticProps = async ({ params }) => {
    const pageFilePaths = path.join(PAGES_PATH, `${params.slug}.mdx`);
    const source = fs.readFileSync(pageFilePaths);

    const { content, data } = matter(source);

    const mdxSource = await serialize(content, {
        // Optionally pass remark/rehype plugins
        mdxOptions: {
            remarkPlugins: [],
            rehypePlugins: [],
        },
        scope: data,
    });

    return {
        props: {
            source: mdxSource,
            frontMatter: data
        }
    };
}

export const getStaticPaths = async () => {
    const paths = pageFilePaths.map(path => path.replace(/\.mdx?$/, "")).map(slug => ({ params: { slug } }));

    return {
        paths,
        fallback: false
    };
}