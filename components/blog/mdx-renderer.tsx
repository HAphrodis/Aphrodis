// This is a helper component to render admonitions from the triple colon syntax
export function MDXRenderer({ content }: { content: string }) {
  // Process the content to find admonitions
  const processedContent = processAdmonitions(content);

  return <div dangerouslySetInnerHTML={{ __html: processedContent }} />;
}

function processAdmonitions(content: string): string {
  // Regular expression to match admonitions
  const admonitionRegex =
    /:::(tip|info|warning|danger|note|question)(?:\s+(.+?))?\s+([\s\S]*?):::/g;

  return content.replace(admonitionRegex, (_, type, title, content) => {
    // Create the HTML for the admonition
    return `
        <div class="admonition admonition-${type}">
          <div class="admonition-title">
            <span class="admonition-icon"></span>
            ${title || type.charAt(0).toUpperCase() + type.slice(1)}
          </div>
          <div class="admonition-content">
            ${content.trim()}
          </div>
        </div>
      `;
  });
}
