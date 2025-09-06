// app\admin\dashboard\newsletters\_components\rich-text-editor.tsx
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Loader } from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
}

export default function RichTextEditor({
  value,
  onChange,
}: RichTextEditorProps) {
  const editorRef = useRef<any>(null);
  const [editorContent, setEditorContent] = useState(value || "");
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Update local state when prop value changes
  useEffect(() => {
    if (value !== editorContent && editorRef.current) {
      setEditorContent(value);
    }
  }, [value]);

  // Initialize editor with content
  useEffect(() => {
    setIsEditorReady(true);

    // Simulate loading delay for editor
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleEditorChange = (content: string) => {
    setEditorContent(content);
    onChange(content);
  };

  if (!isEditorReady || isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center rounded-md border p-4 bg-gray-50">
        <div className="flex flex-col items-center gap-2">
          <Loader className="h-6 w-6 animate-spin text-[#11922f]" />
          <p className="text-sm text-muted-foreground">Loading editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="border rounded-md overflow-hidden">
      <Editor
        apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
        onInit={(evt, editor) => {
          editorRef.current = editor;
          // Force a refresh of the editor content
          editor.setContent(editorContent);
        }}
        initialValue={editorContent}
        value={editorContent}
        onEditorChange={handleEditorChange}
        init={{
          height: 500,
          menubar: true,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
            "emoticons",
          ] as string[],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | link image media emoticons | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px; max-width: 100%; }",
          branding: false,
          promotion: false,
          skin: "oxide",
          resize: false,
          statusbar: true,
          images_upload_handler: (blobInfo: any) => {
            return new Promise<string>((resolve, reject) => {
              // In a real implementation, you would upload the image to your server
              // For now, we'll just create a data URL
              const reader = new FileReader();
              reader.onload = () => {
                resolve(reader.result as string);
              };
              reader.onerror = () => {
                reject("Image upload failed");
              };
              reader.readAsDataURL(blobInfo.blob());
            });
          },
          setup: (editor: any) => {
            editor.on("init", () => {
              editor.getContainer().style.transition =
                "border-color 0.15s ease-in-out";
            });
            editor.on("focus", () => {
              editor.getContainer().style.borderColor = "#11922f";
            });
            editor.on("blur", () => {
              editor.getContainer().style.borderColor = "";
            });
          },
        }}
      />
    </div>
  );
}
