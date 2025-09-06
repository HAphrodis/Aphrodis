/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from "fs";
import path from "path";
import { serialize } from "next-mdx-remote/serialize";

type Metadata = {
  title: string;
  date: string;
};

function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);
  const frontMatterBlock = match![1];
  const content = fileContent.replace(frontmatterRegex, "").trim();
  const frontMatterLines = frontMatterBlock.trim().split("\n");
  const metadata: Partial<Metadata> = {};

  frontMatterLines.forEach((line) => {
    const [key, ...valueArr] = line.split(": ");
    let value = valueArr.join(": ").trim();
    value = value.replace(/^['"](.*)['"]$/, "$1"); // Remove quotes
    metadata[key.trim() as keyof Metadata] = value as any;
  });

  return { metadata: metadata as Metadata, content };
}

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

async function readMDXFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, "utf-8");
  const { metadata, content } = parseFrontmatter(rawContent);
  const mdxSource = await serialize(content, { parseFrontmatter: false });
  return { metadata, mdxSource };
}

export async function getChangelogEntries() {
  const changelogDir = path.join(
    process.cwd(),
    "app",
    "admin",
    "dashboard",
    "changelog",
    "entries",
  );
  const mdxFiles = getMDXFiles(changelogDir);
  const entriesPromises = mdxFiles.map(async (file) => {
    const { metadata, mdxSource } = await readMDXFile(
      path.join(changelogDir, file),
    );
    const slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content: mdxSource,
    };
  });

  const entries = await Promise.all(entriesPromises);
  return entries.sort(
    (a, b) =>
      new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime(),
  );
}
